import React from "react";
import {
  Layout,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
  Select
} from "antd";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { createUser } from "./authSlice";

const { Title } = Typography;
const { Content } = Layout;

const SignUp = () => {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    await dispatch(createUser(values));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const userRoles = ["supplier", "customer"];
  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title>Sign Up</Title>
              <p className="text-lg"></p>
            </div>
          </div>

          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h5>Register With</h5>}
            bordered="false"
          >
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="row-col"
            >
            <Form.Item
              name="userRole"
              rules={[
                { required: true, message: "Please select user role" },
              ]}
            >
              <Select
                placeholder="User Role"
                allowClear
                style={{ width: '100%' }}
                options={userRoles.map((role) => ({
                  value: role,
                  label: role,
                }))}
              />
            </Form.Item>
              <Form.Item
                name="userEmail"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="userContactNumber"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input placeholder="User Contact Number" />
              </Form.Item>
              <Form.Item
                name="userFirstName"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="userLastName"
                // rules={[
                //   { required: true, message: "Please input your last name!" },
                // ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
              <Form.Item
                name="userPassword"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="confpassword"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>
                  I agree the{" "}
                  <a href="#pablo" className="font-bold text-dark">
                    Terms and Conditions
                  </a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  SIGN UP
                </Button>
              </Form.Item>
            </Form>
            <p className="font-semibold text-muted text-center">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-dark">
                Sign In
              </Link>
            </p>
          </Card>
        </Content>
      </div>
    </>
  );
};

export default SignUp;
