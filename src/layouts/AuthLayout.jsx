import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AuthLayout = () => {
  return (
    <div className="min-h-screen">
      {/* Minimal auth header */}
      <Header purpose="auth" />

      {/* Auth background */}
      <main className="flex max-h-screen items-center justify-center bg-gradient-to-r from-sky-50 via-emerald-50 to-amber-50 px-4 py-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
