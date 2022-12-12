import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
const Exercise = () => {
  const pathname = useLocation();
  const navigateTo = useNavigate();
  useEffect(() => {
    console.log(pathname.pathname);
    if (pathname.pathname === "/exerise") {
      //   console.log(123);
      navigateTo("bank");
    } else {
      navigateTo(pathname.pathname);
    }
  }, [pathname.pathname]);
  return (
    <div>
      <Outlet />
    </div>
  );
};
export default Exercise;
