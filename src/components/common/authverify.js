import React, { useEffect } from "react";
import { withRouter } from "./with-router";
import history from './history';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  
  let location = props.router.location;
  useEffect(() => {
    const token = localStorage.getItem("token");

    /*if (token) {
      const decodedJwt = parseJwt(token);

      if (decodedJwt.exp * 1000 < Date.now()) {
          localStorage.clear();
          history.push('/login');
      }
    } else {
          history.push('/login');
    }*/
  }, [location]);

  return <div></div>;
};

export default withRouter(AuthVerify);