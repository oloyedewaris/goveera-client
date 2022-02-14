import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getUser } from "../redux/actions/authActions";
import Spinner from "../components/Spinner/Spinner";

function Auth(Component) {
  const AuthCheck = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const token = localStorage.getItem('token')

    useEffect(() => {
      if (!isAuthenticated) {
        dispatch(getUser());
      }
    }, [dispatch, isAuthenticated]);

    if (isAuthenticated && user.company) {
      return <Component />;
    } else if (isAuthenticated && !user.company) {
      return <>{history.push("/register/company")}</>;
    } else if (!token) {
      return <>{history.push("/")}</>;
    } else {
      return <Spinner />;
    }
  };
  return AuthCheck;
}

export default Auth;
