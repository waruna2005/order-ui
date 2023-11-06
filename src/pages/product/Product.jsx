import {
  Col,
  Row,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Select,
  Layout,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createProduct, updateProduct, fetchProduct, fetchProductStatus, fetchProductAproval } from "./productSlice";

const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;
const Product = () => {
  const { Title, Text } = Typography;
  const { pathname } = useLocation();
  const [form] = Form.useForm();
  const { status } = useSelector((state) => (state.products ? state.products : {}));
  const { aprovals } = useSelector((state) => (state.products ? state.products : {}));

  /**
   * Get member ide from url
   */
  let pathArr = pathname.split("/");
  let productId = pathArr.length >= 4 ? pathArr[2] : "";
  const isAdmin = (localStorage.getItem("userRole") == "admin");

  const { selectedProduct } = useSelector((state) =>
  productId && state.products ? state.products : {}
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const getProdctById = (productId) => {
      dispatch(fetchProduct(productId));
    };
    dispatch(fetchProductStatus());
    dispatch(fetchProductAproval());

    if (productId && !form.getFieldValue().productName) {
      getProdctById(productId);
    }

    if (
      selectedProduct
    ) {
      form.resetFields();
      form.setFieldsValue({
        productName: selectedProduct.productName,
        productDescription: selectedProduct.productDescription,
        productPrice: selectedProduct.productPrice,
        productMeasuringUnit: selectedProduct.productMeasuringUnit,
        productStatus: selectedProduct.productStatus,
        productSyscoID: selectedProduct.productSyscoID,
        productApproval: selectedProduct.productApproval,
      });
    }
  }, [dispatch, selectedProduct]);

  const onFinish = async (values) => {
    values.supplierSyscoID = localStorage.getItem("userSyscoID");
    values.productImage = "no image";
    values.supplierName = localStorage.getItem("firstName");

    if (productId != "") {
      values.productApproval = (values.productApproval) ? values.productApproval : selectedProduct.productApproval;
      await dispatch(updateProduct(productId, values));
    } else {
      await dispatch(createProduct(values));
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
                  <Form.Item
                    name="productName"
                    rules={[
                      {
                        required: true,
                        message: "Please input product name",
                      },
                    ]}
                  >
                    <Input readOnly={productId}  placeholder="Product Name" style={{ width: "40%" }} />
                  </Form.Item>
                  <Form.Item
                    name="productDescription"
                    rules={[
                      {
                        required: true,
                        message: "Please input description",
                      },
                    ]}
                  >
                    <TextArea placeholder="Product Description" style={{ width: "70%" , height: "139px"}} />
                  </Form.Item>
                  <Form.Item
                    name="productMeasuringUnit"
                    rules={[
                      {
                        required: true,
                        message: "Please input unit",
                      },
                    ]}
                  >
                    <Input readOnly={isAdmin} placeholder="Measuring Unit" style={{ width: "10%" }} />
                  </Form.Item>
                  <Form.Item
                    name="productPrice"
                    rules={[
                      {
                        required: true,
                        message: "Please input price",
                      },
                      {
                        pattern: new RegExp(/^\d+(\.\d{1,2})?$/),
                        message: "Please enter a valid price (numbers with up to two decimal places)",
                      },
                    ]}
                  >
                    <Input readOnly={isAdmin} placeholder="Product Price" style={{ width: "20%"}} />
                  </Form.Item>
                  <Form.Item
                    name="productStatus"
                    rules={[
                      {
                        required: true,
                        message: "Please select status",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Product Status"
                      allowClear
                      style={{ width: "20%", minWidth: "200px" }}
                      options={status}
                      disabled={isAdmin}
                    ></Select>
                  </Form.Item>
                  {isAdmin && (
                    <Form.Item
                      name="productSyscoID"
                      rules={[
                        {
                          required: true,
                          message: "Please input Sysco Id",
                        },
                      ]}
                    >
                      <Input 
                        placeholder="Product Sysco ID" 
                        style={{ width: "20%" }} 
                      />
                    </Form.Item>
                  )}
                  {isAdmin && (
                        <Form.Item
                          name="productApproval"
                          rules={[
                            {
                              required: true,
                              message: "Please select approval",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Product Approval"
                            allowClear
                            style={{ width: "20%", minWidth: "200px" }}
                            options={aprovals}
                          ></Select>
                        </Form.Item>
                  )}
                  <Form.Item className="right">
                    <Button
                      style={{ width: "20%" }}
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      style={{ width: "20%" }}
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

export default Product;
