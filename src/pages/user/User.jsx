import {
  Col,
  Row,
  Button,
  Card,
  Form,
  Input,
  Select,
  Layout,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createUser, updateUser, fetchUser, fetchUserRoles } from "./userSlice";

const { Content } = Layout;
const User = () => {
  const { pathname } = useLocation();
  const [form] = Form.useForm();
  const { roles } = useSelector((state) => (state.users ? state.users : {}));
  const status = [
    { value: "active", key: "active" },
    { value: "inactive", key: "inactive" },
  ];
  /**
   * Get user ide from url
   */
  let pathArr = pathname.split("/");
  let userId = pathArr.length >= 4 ? pathArr[2] : "";
  const isPasswordRequired = userId ? false : true;

  const { selectedUser } = useSelector((state) =>
    userId && state.users ? state.users : {}
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const getUserById = (userId) => {
      if(!selectedUser) dispatch(fetchUser(userId));
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
      let _roles = roles.filter((role) => {
        return role.value === selectedUser.userRole ? role.value : "";
      });
      let _status = status.filter((sts) => {
        return sts.value === selectedUser.userStatus ? sts.value : "";
      });

      form.setFieldsValue({
        userSyscoID: selectedUser.userSyscoID,
        userFirstName: selectedUser.userFirstName,
        userLastName: selectedUser.userLastName,
        userContactNumber: selectedUser.userContactNumber,
        userEmail: selectedUser.userEmail,
        userRole: _roles[0]['value'] ? _roles[0]['value'] : '',
        userStatus: _status[0]['value'] ? _status[0]['value'] : '',
      });
    }
  }, [dispatch, selectedUser]);

  const onFinish = async (values) => {

    let roleObject = roles.filter((role) => {
      return role.value === values.userRole ? role.key : "";
    });
    values.userRole = roleObject.length > 0 ? roleObject[0].key : "";

    let statusObject = status.filter((status) => {
      return status.value === values.userStatus ? status.value : "";
    });

    values.userStatus = statusObject.length > 0 ? statusObject[0].key : "";

    if (userId !== "") {
      await dispatch(updateUser(userId, values));
    } else {
      await dispatch(createUser(values));
    }
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
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed(this)}
                  className="row-col"
                  form={form}
                >
                  {userId && (
                    <Form.Item
                      name="userSyscoID"
                      readOnly
                    >
                      <Input readOnly  placeholder="Sysco ID" style={{ width: "50%" }} />
                    </Form.Item>
                  )}
                  <Form.Item
                    name="userFirstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input First Name!",
                      },
                    ]}
                  >
                    <Input placeholder="First Name" style={{ width: "50%" }} />
                  </Form.Item>
                  <Form.Item
                    name="userLastName"
                    rules={[
                      {
                        message: "Please input Last Name!",
                      },
                    ]}
                  >
                    <Input placeholder="Last Name" style={{ width: "50%" }} />
                  </Form.Item>
                  <Form.Item
                    name="userContactNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input Contact Number!",
                      },
                    ]}
                  >
                    <Input placeholder="Contact Number" style={{ width: "50%" }} />
                  </Form.Item>
                  <Form.Item
                    name="userEmail"
                    rules={[
                      {
                        required: true,
                        message: "Please input Email!",
                      },
                    ]}
                  >
                    <Input placeholder="Email" style={{ width: "50%" }} />
                  </Form.Item>
                  <Form.Item
                    name="userRole"
                    rules={[
                      {
                        required: true,
                        message: "Please input role",
                      },
                    ]}
                  >
                    <Select
                      placeholder="User Role"
                      allowClear
                      style={{ width: "50%", minWidth: "200px" }}
                      options={roles}
                    ></Select>
                  </Form.Item>
                  <Form.Item
                    name="userPassword"
                    rules={[
                      {
                        required: isPasswordRequired,
                        message: "Please input Password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Password"
                      style={{ width: "50%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    rules={[
                      {
                        required: isPasswordRequired,
                        message: "Please input Cofirm Password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Comfirm Password"
                      style={{ width: "50%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="userStatus"
                    rules={[
                      {
                        required: true,
                        message: "Please input status",
                      },
                    ]}
                  >
                    <Select
                      placeholder="User Status"
                      allowClear
                      style={{ width: "50%", minWidth: "200px" }}
                      options={status}
                    ></Select>
                  </Form.Item>
                  <Form.Item className="right">
                    <Button
                      style={{ width: "25%" }}
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
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

export default User;
