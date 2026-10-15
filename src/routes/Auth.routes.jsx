import Login from "../components/auth/login";
import Verify from "../components/auth/Verify";
import Password from "../components/auth/Password";
import Email from "../components/auth/Email";

const authRoutes = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Login />,
  },
  {
    path: "verify",
    element: <Verify />,
  },

  {
    path: "forgot-password",
    element: <Email />,
  },
  {
    path: "change-password",
    element: <Password />,
  },
  {
    path: "cred",
    element: <Email />,
  },
];

export default authRoutes;
