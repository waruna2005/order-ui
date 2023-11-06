import { Table, Space } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserList } from "./userSlice";
import { showHideLoading } from "../../utils/HandleLoading";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) =>
    state.users ? state.users : []
  );

  const { permissions } = useSelector((state) =>
    state.users ? state.users : []
  );
  const userRole = localStorage.getItem("userRole");
  showHideLoading(loading);
  const fetchData = async () => {
    let query = {};
    await dispatch(fetchUserList(query));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "User Sysco Id",
      dataIndex: "userSyscoID",
      filterMultiple: false,
      onFilter: (value, record) => record.userName.indexOf(value) === 0,
      sorter: (a, b) => a.userName.localeCompare(b.userName),
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      filterMultiple: false,
      onFilter: (value, record) => record.email.indexOf(value) === 0,
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "First Name",
      dataIndex: "userFirstName",
      filterMultiple: false,
      onFilter: (value, record) => record.firstName.indexOf(value) === 0,
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Last Name",
      dataIndex: "userLastName",
      filterMultiple: false,
      onFilter: (value, record) => record.lastName.indexOf(value) === 0,
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "User Contact Number",
      dataIndex: "userContactNumber",
      filterMultiple: false,
    },
    {
      title: "User Role",
      dataIndex: "userRole",
      filterMultiple: false,
    },
    {
      title: "User Status",
      dataIndex: "userStatus",
      filterMultiple: false,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space size="middle">
          {permissions &&
          permissions["users"]["edit"].indexOf(userRole) !== -1 ? (
            <a href={"/users/" + record.userSyscoID + "/edit"}>Edit</a>
          ) : (
            ""
          )}
        </Space>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter) => {
    console.log("params", pagination, filters, sorter);
  };

  return (
    <>
      <div className="layout-content">
        <Table
          pagination={{ pageSize: 10 }}
          rowKey="_id"
          columns={columns}
          dataSource={users}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default UserList;

// function onChange(pagination, filters, sorter) {
//   console.log('params', pagination, filters, sorter);
// }

// ReactDOM.render(<Table columns={columns} dataSource={data} onChange={onChange} />, mountNode);

// export default UserList;
