import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '../lib/session';

export function withAuth(handler) {
  return withIronSessionSsr(async (context) => {
    const { req, res } = context;
    const user = req.session.user;

    if (!user || !user.isLoggedIn) {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    }

    return handler(context);
  }, ironOptions);
}
