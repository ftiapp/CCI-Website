import LoginPage from '../../components/admin/auth/LoginPage';
import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '../../lib/session';

export default function Login() {
  return <LoginPage />;
}

// If user is already logged in, redirect to admin dashboard
export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;

  if (user && user.isLoggedIn) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}, ironOptions);
