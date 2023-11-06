import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUser } from "./authSlice";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import signinbg from "../../assets/images/feedback.jpg";

function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, isPrepared } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && isPrepared) {
      history.push("/");
    }
  },[isLoggedIn, isPrepared, history]);

  const onFinish = async (values) => {
    await dispatch(fetchUser(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Sign In</Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="User Email"
                  name="userEmail"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name="userPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%"}}
                  >
                    SIGN IN
                  </Button>
              </Form.Item>
                <p className="font-semibold text-muted">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-dark font-bold">
                    Sign Up
                  </Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
  /*return (
    <>
      <Layout className="layout-signin">
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <div style={{ width: "40%", height: "100vh", padding: "100px" }}>
              <Layout className="layout-signin" style={{ marginTop: "25%" }}>
                <Title className="mb-15">Login</Title>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item
                    className="username"
                    label="Username"
                    name="userName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Username" />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  <Form.Item
                    name="remember"
                    className="aligin-center"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked onChange={onChange} />
                    Remember me
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      SIGN IN
                    </Button>
                  </Form.Item>
                  <p className="font-semibold text-muted">
                    Don't have an account?{" "}
                    <Link to="/sign-up" className="text-dark font-bold">
                      Sign Up
                    </Link>
                  </p>
                </Form>
              </Layout>
            </div>
            <div
              className="sign-img"
              style={{
                backgroundColor: "#9f005d",
                display: "flex",
                justifyContent: "right",
                width: "60%",
              }}
            >
              <img src={signinbg} />
            </div>
          </Row>
        </Content>
      </Layout>
    </>
  );*/
};

export default Login;
