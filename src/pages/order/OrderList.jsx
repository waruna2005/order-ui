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
  Space,
  Checkbox,
  Modal
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrderList, fetchSupplierOrderList, deleteOrder,updateOrderBySupplier } from "./orderSlice";
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

  const orderStatusList = ["placed","cancelled", "partial_supply"];
  const urlParams = new URLSearchParams(window.location.search);
  const orderStatus = (urlParams.get("orderStatus")) ? urlParams.get("orderStatus") : 'placed'
  const supplyStatus = (urlParams.get("supply_status")) ? urlParams.get("supply_status") : 0



  showHideLoading(loading);
  let query = "sysco_id="+localStorage.getItem("userSyscoID")
  +"&order_status="+orderStatus
  + "&page=0"
  + "&size=1000";

  const fetchData = async () => {
    if (userRole == "supplier") {
      query = "sysco_id="+localStorage.getItem("userSyscoID")
      +"&supply_status="+supplyStatus
      + "&page=0"
      + "&size=10000";
      await dispatch(fetchSupplierOrderList(query));
    } else {
      await dispatch(fetchOrderList(query));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const status = ["placed", "completed", "cancelled", "partial_supply"];
  const supplierStatus = ["no","yes"];
  
  let columns = [];
  if (userRole == "supplier") {
    columns = [
      {
        title: "Order Id",
        dataIndex: "orderDetailsID",
        key: "orderDetailsID",
        width: '8%',
        onFilter: (value, order) => order.orderDetailsID.indexOf(value) === 0,
        sorter: (a, b) => a.orderDetailsID.length - b.orderDetailsID.length,
      },
      {
        title: "Customer Name",
        dataIndex: "customerName",
        key: "customerName",
        width: '10%',
        onFilter: (value, order) => order.customerName.indexOf(value) === 0,
        sorter: (a, b) => a.customerName.length - b.customerName.length,
      },
      {
        title: "Delivery Date",
        dataIndex: "deliveryDate",
        filterMultiple: false,
        width: '10%',
        onFilter: (value, record) => record.deliveryDate.indexOf(value) === 0,
        sorter: (a, b) => a.deliveryDate.length - b.deliveryDate.length,
      },
      {
        title: "Delivery Address",
        dataIndex: "deliveryAddress",
        width: '10%',
        filterMultiple: false,
        onFilter: (value, record) => record.deliveryAddress.indexOf(value) === 0,
        sorter: (a, b) => a.deliveryAddress.length - b.deliveryAddress.length,
      },
      {
        title: "Product Name",
        dataIndex: "productName",
        width: '10%',
        filterMultiple: false,
        onFilter: (value, record) => record.productName.indexOf(value) === 0,
        sorter: (a, b) => a.productName.length - b.productName.length,
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        width: '10%',
        filterMultiple: false,
        onFilter: (value, record) => record.quantity.indexOf(value) === 0,
        sorter: (a, b) => a.quantity.length - b.quantity.length,
      },
      {
        title: "Supply Status",
        width: '10%',
        render: (_, record) => (
          <Space size="middle">
            {permissions &&
              permissions["orders"]["view"].indexOf(userRole) !== -1 ? (
                <Select
                  defaultValue={record.supplyStatus}
                  onChange={(value) => handleDropdownChange(record.orderDetailsID, value)}
                  style={{width:'100px'}}
                >
                  <Select.Option value="true">true</Select.Option>
                  <Select.Option value="false">false</Select.Option>
                </Select>
              ) : (
                ""
              )}
          </Space>
        ),
      }
    ];
  } else {
    
    columns = [
      {
        title: "Order Id",
        dataIndex: "id",
        key: "id",
        width: '10%',
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
        render: (_, record) => (
          <Space size="middle">{(record.orderStatus) ? (record.orderStatus).replace("_","") : ""}
          </Space>
        ),
      },
      {
        title: "Total Products",
        dataIndex: "totalProducts",
        filterMultiple: false,
        onFilter: (value, record) => record.totalProducts.indexOf(value) === 0,
        sorter: (a, b) => a.totalProducts.length - b.totalProducts.length,
      },
      {
        title: "Actions",
        render: (_, record) => (
          <Space size="middle">
            {permissions &&
            permissions["orders"]["view"].indexOf(userRole) !== -1 ? (
              <a href={"/order/" + record.id+"/view"}>Go To Order</a>
            ) : (
              ""
            )}
          </Space>
        ),
      },
    ];
  }


  const onFinish = async (values) => {

    if (userRole == "supplier") {
      query = "sysco_id="+localStorage.getItem("userSyscoID")
      +"&supply_status="+(values.supplierStatus == "yes" ? 1 : 0)
      + "&page=0"
      + "&size=10000";
      dispatch(fetchSupplierOrderList(query));
    } else {
      query = "sysco_id="+localStorage.getItem("userSyscoID")
      +"&order_status="+(values.orderStatus ?? "placed")
      + "&page=0"
      + "&size=1000";
      dispatch(fetchOrderList(query));
    }
  };

  const onFinishFailed = async (values) => {
    
  };

  const handleDropdownChange = (id, isChecked) => {
    alert(isChecked);
      Modal.confirm({
          title: 'Confirm',
          content: 'Are you sure you want to update the suppler status?',
          onOk: async () => {
              // Dispatch the update action if the user clicks 'OK'
              await dispatch(updateOrderBySupplier(id, { supplyStatus:isChecked  }));
          },
          onCancel: () => {
              // Handle cancel if needed
          },
      });
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
          <Col span={9}>
          {((userRole == "supplier")) ? (
                      <Form.Item
                      name="supplierStatus"
                      rules={[
                        {
                          required: true,
                          message: "Please select supplier status",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Supplier Status"
                        allowClear
                        style={{ width: '40%' }}
                        options={supplierStatus.map((sta) => ({
                          value: sta,
                          label: sta,
                        }))}
                      />
                    </Form.Item>
                  ) : (
                    <Form.Item
                    name="orderStatus"
                    rules={[
                      {
                        required: true,
                        message: "Please select order status",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Order Status"
                      allowClear
                      style={{ width: '20%' }}
                      options={orderStatusList.map((sta) => ({
                        value: sta,
                        label: sta,
                      }))}
                    />
                  </Form.Item>
                  )}
                  <Form.Item className="right">
                      <Button
                        style={{ width: "20%" }}
                        type="primary"
                        htmlType="submit"
                      >
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
          rowKey={(userRole == "supplier") ? "orderDetailsID" : "id"}
          columns={columns}
          dataSource={orders}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default OrderList;
