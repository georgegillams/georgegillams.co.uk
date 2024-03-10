import { dbLoad } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';

export default async function loadAll(req) {
  let user = await authentication(req);
  let books = await dbLoad({
    redisKey: 'books',
    includeDeleted: user && user.admin,
  });

  const finishedBooks = books.filter(b => b.status === 'using');
  const currentlyReading = books.filter(b => b.status === 'currentlyReading');
  const notRead = books.filter(b => !b?.status || b.status === 'toRead');

  const sortedBooks = [...finishedBooks, ...currentlyReading, ...notRead];

  return { books: sortedBooks };
}
