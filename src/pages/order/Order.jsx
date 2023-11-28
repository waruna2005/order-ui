import {
  Col,
  Row,
  Button,
  Card,
  Form,
  Input,
  Select,
  Layout,
  DatePicker,
  Table, 
  Space
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchCart,updateCart, deleteCart, createOrder, fetchOrder, updateOrder } from "../order/orderSlice";
import moment from "moment";

const { Content } = Layout;
const { TextArea } = Input;
const Order = () => {
  const { pathname } = useLocation();
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";
  const [quantities, setQuantities] = useState({});
  let pathArr = pathname.split("/");
  let orderId = pathArr.length >= 4 ? pathArr[2] : "";
  const isCustomer = (localStorage.getItem("userRole") === "customer");

  const { selectedOrder, selectedCart } = useSelector((state) => (state.orders ? state.orders : {}));
  const isEditable = (orderId == "");

  
  const orderStatus = ["placed","cancelled"];
  const { permissions } = useSelector((state) =>
    state.users ? state.users : []
  );
  const userRole = localStorage.getItem("userRole");

  const handleQuantityChange = (productId, value) => {
    setQuantities({ ...quantities, [productId]: value });
  };

  const columns = [
    {
      title: "Product Sysco ID",
      dataIndex: "productSyscoID",
      key: "productSyscoID",
      onFilter: (value, product) => product.productSyscoID.indexOf(value) === 0,
      sorter: (a, b) => a.productSyscoID.length - b.productSyscoID.length,
    },
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
      filterMultiple: false,
      onFilter: (value, record) => record.supplierName.indexOf(value) === 0,
      sorter: (a, b) => a.supplierName.length - b.supplierName.length,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      filterMultiple: false,
      onFilter: (value, record) => record.productName.indexOf(value) === 0,
      sorter: (a, b) => a.productName.length - b.productName.length,
    },
    {
      title: "Product Price",
      dataIndex: "price",
      filterMultiple: false,
      onFilter: (value, record) => record.price.indexOf(value) === 0,
      sorter: (a, b) => a.price.length - b.price.length,
    },
    {
      title: "Is Supply",
      dataIndex: "supplyStatus",
      render: (_, record) => (
        <>
          <span>{(record.supplyStatus) ? "yes" : "no" }</span>
        </>
      ),
    },
    {
      title: "Quantity",
      key: "quantity",
      render: (_, record) => (
        <>
        {(isEditable) ? (
          <Input 
            type="number"
            value={quantities[record.productSyscoID] || record.quantity} 
            onChange={(e) => handleQuantityChange(record.productSyscoID, e.target.value)} 
          />
        ) : (
          record.quantity
        )}
        </>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space size="middle">
          {(isEditable) ? (
            <a href="#" onClick={() => _editProduct(record)}>
              Edit
            </a>
          ) : (
            ""
          )}
          {
            (isEditable) ? ( // Adding the condition to check if the product is not approved
              <a href="#" onClick={() => _removeCartItem(record.cartID)}>
                remove
              </a>
            ) : (
              ""
            )
          }
        </Space>
      ),
    },
  ];



  const dispatch = useDispatch();

  const sessionId = localStorage.getItem("cart-id");
  useEffect(() => {
    const getCartById = () => {
      dispatch(fetchCart(sessionId));
    };

    const getOrderById = (orderId) => {
      dispatch(fetchOrder(orderId));
    };

    if (orderId && !form.getFieldValue().customerName) {
      getOrderById(orderId);
    } else {
      if (sessionId && !form.getFieldValue().customerName) {
        getCartById();
      }
    }


    if (
      selectedCart
    ) {
      form.resetFields();
      form.setFieldsValue({
        customerName: (!selectedCart.customerName) ? localStorage.getItem("firstName") : "",
      });
    }

    if (
      selectedOrder
    ) {
      form.resetFields();
      form.setFieldsValue({
        customerName: (!selectedOrder.customerName) ? localStorage.getItem("firstName") : "",
        deliveryAddress: selectedOrder.deliveryAddress,
        deliveryDate:  moment(
          new Date(selectedOrder.deliveryDate),
          dateFormat
        ),
      });
    }

  }, [dispatch, selectedCart, selectedOrder]);

  const onFinish = async (values) => {
    if (orderId !== "") {
      let updateData = {
        deliveryAddress : values.deliveryAddress,
        deliveryDate : values.deliveryDate,
        orderStatus : values.orderStatus
      };
      await dispatch(updateOrder(orderId, updateData));
    } else {

      let orderItem = [];
      let supplierName = "";
      let supplierSyscoID = "";
      if (selectedCart.cartDTOList) {
          for(let i = 0; i < selectedCart.cartDTOList.length; i++) {
            supplierName = localStorage.getItem(selectedCart.cartDTOList[i].productSyscoID+"-supplierName");
            supplierSyscoID = localStorage.getItem(selectedCart.cartDTOList[i].productSyscoID+"-supplierSyscoID");

            orderItem.push({
              price : selectedCart.cartDTOList[i].price,
              productName : selectedCart.cartDTOList[i].productName,
              productSyscoID : selectedCart.cartDTOList[i].productSyscoID,
              quantity : selectedCart.cartDTOList[i].quantity,
              supplierName : supplierName,
              supplierSyscoID : supplierSyscoID,
            });
          }
      }
      let orderData = {
        customerName : values.customerName,
        deliveryAddress : values.deliveryAddress,
        deliveryDate : values.deliveryDate,
        customerSyscoID : localStorage.getItem("userSyscoID"),
        orderStatus : "placed",
        totalPrice : selectedCart.totalPrice,
        orderDetailsSet : orderItem
      }

      await dispatch(createOrder(sessionId,orderData));
    }
  };

  const _removeCartItem = (id) => {
    dispatch(deleteCart(id, sessionId));
    window.location.reload();
  }

  const _editProduct = (data) => {
    let updateData = {
      productSyscoID: data.productSyscoID,
      productName: data.productName,
      quantity: quantities[data.productSyscoID] ?? data.quantity,
      price: data.price,
    };
    dispatch(updateCart(sessionId, updateData));
    window.location.reload();
  }
  
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
                  <Form.Item
                    name="customerName"
                  >
                    <Input readOnly={true}  placeholder="Customer Name" style={{ width: "40%" }} />
                  </Form.Item>
                  <Form.Item
                    name="deliveryAddress"
                    rules={[
                      {
                        required: true,
                        message: "Please input delivery address",
                      },
                    ]}
                  >
                    <TextArea readOnly={!(isEditable || (selectedOrder != null && selectedOrder.orderStaus == "placed"))} placeholder="Delivery Address" style={{ width: "70%" , height: "139px"}} />
                  </Form.Item>
                  <Form.Item
                    name="deliveryDate"
                    rules={[
                      {
                        required: true,
                        message: "Please input unit",
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="Delivery Date"
                      disabled={!(isEditable || (selectedOrder != null && selectedOrder.orderStaus == "placed"))}
                      style={{ width: "20%", minWidth: "200px" }}
                      format={dateFormat}
                    />
                  </Form.Item>
                  <Form.Item>
                    <div className="layout-content">
                      <Table
                        rowKey="productSyscoID"
                        columns={columns}
                        dataSource={(!orderId) ? ((selectedCart) ? selectedCart.cartDTOList : []) : ((selectedOrder) ? selectedOrder.orderDetailsDTOList : []) }
                      />
                    </div>
                  </Form.Item>
                  {((isCustomer && selectedOrder != null && selectedOrder.orderStatus == "placed")) ? (
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
                        options={orderStatus.map((sta) => ({
                          value: sta,
                          label: sta,
                        }))}
                      />
                    </Form.Item>
                  ) : (
                    <Form.Item className="right">
                     <label>Order Status : </label><b>{(selectedOrder != null && selectedOrder.orderStatus ? selectedOrder.orderStatus : "")}</b>
                    </Form.Item>
                  )}

                  <Form.Item className="right">
                      <h3>Total Price : $ { (orderId) ? ((selectedOrder && selectedOrder.totalPrice) ? selectedOrder.totalPrice : "") : (selectedCart && selectedCart.totalPrice) ? selectedCart.totalPrice : "" }</h3>
                  </Form.Item>

                  {((selectedOrder != null && selectedOrder.orderStatus == "placed") || isEditable) && (
                    <Form.Item className="right">
                      <Button
                        style={{ width: "20%" }}
                        type="primary"
                        htmlType="submit"
                      >
                        Submit Order
                      </Button>
                    </Form.Item>
                  )}
                </Form>
              </Card>
            </Content>
          </Col>
        </Row>
        
      </div>
    </>
  );
};

export default Order;
