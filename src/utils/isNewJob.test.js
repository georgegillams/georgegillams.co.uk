import { isNewJob } from './isNewJob';

const augustFirst2026 = Date.UTC(2026, 7, 1);
const julyThirtyFirst2026 = Date.UTC(2026, 6, 31, 23, 59, 59);

describe('isNewJob', () => {
  it('returns true when the new-job query param is true', () => {
    expect(isNewJob({ 'new-job': 'true' }, julyThirtyFirst2026)).toBe(true);
  });

  it('returns false when the new-job query param is not true', () => {
    expect(isNewJob({ 'new-job': 'false' }, julyThirtyFirst2026)).toBe(false);
    expect(isNewJob({}, julyThirtyFirst2026)).toBe(false);
  });

  it('returns true on or after 1 August 2026', () => {
    expect(isNewJob({}, augustFirst2026)).toBe(true);
    expect(isNewJob({}, augustFirst2026 + 1)).toBe(true);
  });

  it('returns false before 1 August 2026', () => {
    expect(isNewJob({}, julyThirtyFirst2026)).toBe(false);
  });
});
