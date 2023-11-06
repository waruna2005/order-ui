import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import Main from "../components/layout/Main";

function PrivateRoute({ children, ...rest }) {
  const { isLoggedIn, isPrepared } = useSelector((state) => state.auth);

  const email = localStorage.getItem("email");

  if (isPrepared && !isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        email ? (
          <>
            <Layout>
              <Content className="page-content">
                <Main>
                  <div className="site-layout-background">
                    {React.cloneElement(children, props)}
                  </div>
                </Main>
              </Content>
            </Layout>
          </>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
