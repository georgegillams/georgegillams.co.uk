#!/usr/bin/env node
/**
 * Seeds the medals Redis store via the API (admin only).
 *
 * Usage:
 *   ADMIN_SESSION_COOKIE='<session cookie value>' node scripts/seed-medals.js
 *
 * The cookie value should match your logged-in admin session (see SESSION_COOKIE_KEY).
 */

const { MEDALS_SEED } = require('./medals-seed-data');

// const apiEndpoint = 'https://www.georgegillams.co.uk/api';
const apiEndpoint = 'http://localhost:3000/api';

async function main() {
  const cookieVal = process.env.ADMIN_SESSION_COOKIE;
  if (!cookieVal) {
    // eslint-disable-next-line no-console
    console.error('Set ADMIN_SESSION_COOKIE to your admin session cookie value.');
    process.exit(1);
  }

  const url = `${apiEndpoint}/medals/create`;
  const cookieHeader = `session_v3=${cookieVal}`;

  // eslint-disable-next-line no-restricted-syntax
  for (const medal of MEDALS_SEED) {
    // eslint-disable-next-line no-await-in-loop
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
      body: JSON.stringify(medal),
    });
    const text = await res.text();
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error('Failed', res.status, text);
      process.exit(1);
    }
  }

  // eslint-disable-next-line no-console
  console.log(`Seeded ${MEDALS_SEED.length} medals.`);
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
