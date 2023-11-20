import {
  Col,
  Row,
  Button,
  Card,
  Form,
  Input,
  Layout,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, fetchUser, fetchUserRoles } from "../user/userSlice";

const { Content } = Layout;
const Profile = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  let userId = localStorage.getItem("userSyscoID");
  const isPasswordRequired = userId ? false : true;

  const { user } = useSelector((state) => state.users);
  const { roles } = useSelector((state) => (state.users ? state.users : {}));

  const { selectedUser } = useSelector((state) =>
    userId && state.users ? state.users : {}
  );

  useEffect(() => {
    const getUserById = (userId) => {
      dispatch(fetchUser(userId));
    };
    dispatch(fetchUserRoles());
    if (userId && !form.getFieldValue().userEmail) {
      getUserById(userId);
    }


    if (
      selectedUser &&
      roles.length
    ) {
      form.resetFields();

      form.setFieldsValue({
        userSyscoID: selectedUser.userSyscoID,
        userFirstName: selectedUser.userFirstName,
        userLastName: selectedUser.userLastName,
        userContactNumber: selectedUser.userContactNumber,
        userEmail: selectedUser.userEmail,
        userRole: selectedUser.userRole,
        userStatus: selectedUser.userStatus,
      });
    }
  }, [dispatch, selectedUser, user]);

  const onFinish = async (values) => {
    values.userEmail = localStorage.getItem("email");
    values.userRole = selectedUser.userRole;
    values.userStatus = selectedUser.userStatus;
    await dispatch(updateUser(values.userSyscoID,values));
    // form.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} md={12} sm={24} lg={12} xl={24} className="mb-24">
            <Content className="p-0">
              <Card bordered="false">
                <Form
                  name="basic"
                  className="row-col"
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
              <Form.Item
                name="userSyscoID"
                style={{ width: "50%" }}
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input readOnly={true} placeholder="user Sysco ID" />
              </Form.Item>
              <Form.Item
                name="userEmail"
                style={{ width: "50%" }}
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="userContactNumber"
                style={{ width: "50%" }}
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input placeholder="User Contact Number" />
              </Form.Item>
              <Form.Item
                name="userFirstName"
                style={{ width: "50%" }}
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="userLastName"
                style={{ width: "50%" }}
                // rules={[
                //   { required: true, message: "Please input your last name!" },
                // ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
                  <Form.Item
                    name="userPassword"
                    rules={[
                      {
                        required: isPasswordRequired,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Password"
                      style={{ width: "50%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="confpassword"
                    rules={[
                      {
                        required: isPasswordRequired,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Confirm Password"
                      style={{ width: "50%" }}
                    />
                  </Form.Item>
                  <Form.Item className="right">
                    <Button
                      style={{ width: "25%" }}
                      type="primary"
                      htmlType="submit"
                    >
                      Update
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      style={{ width: "25%" }}
                      type="secondry"
                      htmlType="reset"
                    >
                      Cancel
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Content>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Profile;
