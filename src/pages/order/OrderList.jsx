import {
  Col,
  Row,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Select,
  Table,
  DatePicker,
  Alert,
  Space
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrderList,deleteOrder } from "./orderSlice";
import { showHideLoading } from "../../utils/HandleLoading";
import moment from "moment";

const OrderList = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) =>
    state.orders ? state.orders : []
  );
  const { permissions } = useSelector((state) =>
    state.users ? state.users : []
  );
  const userRole = localStorage.getItem("userRole");
  const isAdmin = (userRole === "admin");

  const urlParams = new URLSearchParams(window.location.search);
  const orderStatus = (urlParams.get("orderStatus")) ? urlParams.get("orderStatus") : 'placed'


  showHideLoading(loading);
  let query = "sysco_id="+localStorage.getItem("userSyscoID")
  +"&order_status="+orderStatus
  + "&page=0"
  + "&size=1000";

  const fetchData = async () => {
    await dispatch(fetchOrderList(query));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const status = ["placed", "completed", "cancelled"];
  const columns = [
    {
      title: "Order Id",
      dataIndex: "id",
      key: "id",
      onFilter: (value, order) => order.id.indexOf(value) === 0,
      sorter: (a, b) => a.id.length - b.id.length,
    },
    {
      title: "Delevery Date",
      dataIndex: "deliveryDate",
      key: "productSyscoID",
      onFilter: (value, order) => order.deliveryDate.indexOf(value) === 0,
      sorter: (a, b) => a.deliveryDate.length - b.deliveryDate.length,
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      filterMultiple: false,
      onFilter: (value, record) => record.orderStatus.indexOf(value) === 0,
      sorter: (a, b) => a.orderStatus.length - b.orderStatus.length,
    },
    {
      title: "Total Products",
      dataIndex: "totalProducts",
      filterMultiple: false,
      onFilter: (value, record) => record.totalProducts.indexOf(value) === 0,
      sorter: (a, b) => a.totalProducts.length - b.totalProducts.length,
    }
    // {
    //   title: "Actions",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       {permissions &&
    //       permissions["products"]["edit"].indexOf(userRole) !== -1 ? (
    //         <a href={"/product/" + record.productID + "/edit"}>Edit</a>
    //       ) : (
    //         ""
    //       )}
    //       {
    //         permissions &&
    //         permissions["products"]["delete"].indexOf(userRole) !== -1 &&
    //         (record.productApproval !== "approved") ? ( // Adding the condition to check if the product is not approved
    //           <a href="#" onClick={() => _deleteArea(record.productID)}>
    //             Delete
    //           </a>
    //         ) : (
    //           ""
    //         )
    //       }
    //     </Space>
    //   ),
    // },
  ];

  const onFinish = async (values) => {
    query = "sysco_id="+localStorage.getItem("userSyscoID")
    +"&order_status="+(values.orderStatus ?? "placed")
    + "&page=0"
    + "&size=1000";
    dispatch(fetchOrderList(query));
  };

  const onFinishFailed = async (values) => {
    
  };

  const onChange = (pagination, filters, sorter) => {
    console.log("params", pagination, filters, sorter);
  };

  const _deleteArea = async (_id, e) => {
    await dispatch(deleteOrder(_id, orders));
  };

  return (
    <>
    <div className="row">
        <div className="col-md-12 col-sm-12 col-12">
        <Card bordered={false}>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        initialValues={{
          fromDate:  moment().subtract(1, 'months'),
          toDate:  moment(),
        }}
      >
        <Row gutter={16} align="middle">
          <Col span={6}>
            <Form.Item
              name="orderStatus"
            >
              <Select
                placeholder="Order Status"
                allowClear
                style={{ width: '100%' }}
                options={status.map((sta) => ({
                  value: sta,
                  label: sta,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={6} style={{ display: 'flex', justifyContent: 'left' }}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
          </Col>

        </Row>
      </Form>
    </Card>
        </div>
      </div>
      <div className="layout-content">
        <Table
          pagination={{ pageSize: 5 }}
          rowKey="id"
          columns={columns}
          dataSource={orders}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default OrderList;
