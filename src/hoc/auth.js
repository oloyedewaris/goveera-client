import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { setUser } from "../redux/actions/authActions";
import Spinner from "../components/Spinner/Spinner";
import axiosInstance from "../util/axiosInstance";

function Auth(Component) {
  const AuthCheck = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const token = localStorage.getItem('token')

    useEffect(() => {
      if (!isAuthenticated && token) {
        setLoading(true)
        axiosInstance.get("/api/auth/authenticate")
          .then(res => {
            if (res.data) {
              setLoading(val => {
                if (res.data) dispatch(setUser(res.data))
                return false
              })
            }
          }).catch(err => {
            localStorage.removeItem('token')
            setLoading(false)
          })
      } else setLoading(false)
    }, [dispatch, isAuthenticated, token])

    return (
      <>
        {loading ?
          <Spinner />
          : <>{isAuthenticated ?
            <>
              {isAuthenticated && !user.company ?
                <>
                  <Redirect to='/register/company' />
                </>
                : <Component />}
            </>
            : <Redirect to='/login' />}
          </>}
      </>
    )
  }
  return AuthCheck
};

export default Auth;
