import authentication from 'server-utils/common/authentication';
import { dbLoad } from 'server-utils/common/database';
import { SECTION_ORDER } from 'helpers/medalsSections';

const SECTION_ORDER_MAP = SECTION_ORDER.reduce((acc, key, index) => ({ ...acc, [key]: index }), {});

const sortableTimestampForMedal = medal => {
  if (medal?.eventDate && typeof medal.eventDate === 'string') {
    const t = Date.parse(medal.eventDate);
    if (!Number.isNaN(t)) return t;
  }
  if (medal?.year && typeof medal.year === 'string') {
    const yearNum = Number(medal.year);
    if (!Number.isNaN(yearNum)) return Date.UTC(yearNum, 11, 31, 23, 59, 59);
  }
  if (typeof medal?.timestamp === 'number') return medal.timestamp;
  return 0;
};

export default async function loadAll(req) {
  const user = await authentication(req);
  const medals = await dbLoad({
    redisKey: 'medals',
    includeDeleted: user && user.admin,
  });

  const sorted = [...medals].sort((a, b) => {
    const aSection = SECTION_ORDER_MAP[a?.section] ?? Number.MAX_SAFE_INTEGER;
    const bSection = SECTION_ORDER_MAP[b?.section] ?? Number.MAX_SAFE_INTEGER;
    if (aSection !== bSection) return aSection - bSection;

    const aTime = sortableTimestampForMedal(a);
    const bTime = sortableTimestampForMedal(b);
    if (aTime !== bTime) return bTime - aTime; // newest first

    const aId = String(a?.id ?? '');
    const bId = String(b?.id ?? '');
    return aId.localeCompare(bId);
  });

  return { medals: sorted };
}

