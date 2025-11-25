import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isauthenticated, user, children }) {
  const location = useLocation();
// console.log('CheckAuth - isauthenticated:', isauthenticated);
// console.log('CheckAuth - user:', user);
console.log('CheckAuth - current path:', location.pathname);
console.log('CheckAuth - user :', user);
console.log('checkauth -isAuthenticated',isauthenticated);
  if (
    !isauthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (isauthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    isauthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="*" />;
  }
  if (
    isauthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
