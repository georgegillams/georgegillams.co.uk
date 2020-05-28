import authentication from 'utils/authentication';

export default function loadAuth(req) {
  return new Promise(resolve => {
    authentication(req).then(user => {
      if (user) {
        resolve({
          user: {
            id: user.id,
            name: user.name,
            uname: user.uname,
            email: user.email,
            emailVerified: user.emailVerified,
            admin: user.admin,
          },
        });
      } else {
        resolve();
      }
    });
  });
}
