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
import { fetchProduct, updateProduct, fetchProductList, deleteProduct } from "../product/productSlice";
import { fetchCart,updateCart, deleteCart, createOrder } from "../order/orderSlice";
import moment from "moment";

const { Content } = Layout;
const { TextArea } = Input;
const Order = () => {
  const { pathname } = useLocation();
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";
  const [quantities, setQuantities] = useState({});
  const { products } = useSelector((state) => (state.products ? state.products : {}));

  const { selectedOrder, selectedCart } = useSelector((state) => (state.orders ? state.orders : {}));

  
  
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
      title: "Quantity",
      key: "quantity",
      render: (_, record) => (
        <Input 
          type="number" 
          value={quantities[record.productSyscoID] || record.quantity} 
          onChange={(e) => handleQuantityChange(record.productSyscoID, e.target.value)} 
        />
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space size="middle">
          {userRole == "customer" &&
            (record.productApproval !== "approved") ? (
            <a href="#" onClick={() => _editProduct(record)}>
              Edit
            </a>
          ) : (
            ""
          )}
          {
            userRole == "customer" &&
            (record.productApproval !== "approved") ? ( // Adding the condition to check if the product is not approved
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

  const { aprovals } = useSelector((state) => (state.products ? state.products : {}));

  /**
   * Get member ide from url
   */
  let pathArr = pathname.split("/");
  let orderId = pathArr.length >= 4 ? pathArr[2] : "";
  const isAdmin = (localStorage.getItem("userRole") === "admin");


  const dispatch = useDispatch();
  let productQuery = "product_status=all"
  +"&approval_status=approved"
  +"&supplier_sysco_id="
  + "&page=0"
  + "&size=1000";

  const sessionId = localStorage.getItem("cart-id");
  useEffect(() => {
    const getCartById = () => {
      dispatch(fetchCart(sessionId));
    };
    if (sessionId && !form.getFieldValue().customerName) {
      getCartById();
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
      
      //await dispatch(createOrder(values));
    } else {

      let orderItem = [];

      if (selectedCart.cartDTOList) {
          for(let i = 0; i < selectedCart.cartDTOList.length; i++) {
            orderItem.push({
              price : selectedCart.cartDTOList[i].price,
              productName : selectedCart.cartDTOList[i].productName,
              productSyscoID : selectedCart.cartDTOList[i].productSyscoID,
              quantity : selectedCart.cartDTOList[i].quantity,
              supplierName : "test",
              supplierSyscoID : "test",
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
                    <TextArea placeholder="Delivery Address" style={{ width: "70%" , height: "139px"}} />
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
                      style={{ width: "20%", minWidth: "200px" }}
                      format={dateFormat}
                    />
                  </Form.Item>
                  <Form.Item>
                    <div className="layout-content">
                      <Table
                        rowKey="productSyscoID"
                        columns={columns}
                        dataSource={(selectedCart) ? selectedCart.cartDTOList : []}
                      />
                    </div>
                  </Form.Item>
                  <Form.Item className="right">
                      <h3>Total Price : $ { (selectedCart && selectedCart.totalPrice) ? selectedCart.totalPrice : "" }</h3>
                  </Form.Item>
                  <Form.Item className="right">
                    <Button
                      style={{ width: "20%" }}
                      type="primary"
                      htmlType="submit"
                    >
                      Submit Order
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

export default Order;
