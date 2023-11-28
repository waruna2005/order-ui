import {
  Col,
  Row,
  Card,
  Layout,
  Button
} from "antd";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchProduct} from "./productSlice";
import { baseUrl } from "../../config/config";
import { v4 as uuidv4 } from 'uuid';
import { createCart } from "../order/orderSlice";

const { Content } = Layout;
const ProductView = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  /**
   * Get member ide from url
   */
  let pathArr = pathname.split("/");
  let productId = pathArr.length >= 4 ? pathArr[2] : "";
  const isAdmin = (localStorage.getItem("userRole") === "admin");

  const fetchData = async () => {
    if (productId) {
      dispatch(fetchProduct(productId));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { selectedProduct } = useSelector((state) =>
  productId && state.products ? state.products : {}
  );

  let productName = selectedProduct ?  selectedProduct.productName : "";
  let productSyscoID = selectedProduct ?  selectedProduct.productSyscoID : "";
  let supplierSyscoID = selectedProduct ?  selectedProduct.supplierSyscoID : "";
  let productDescription = selectedProduct ?  selectedProduct.productDescription : "";
  let productMeasuringUnit = selectedProduct ?  selectedProduct.productMeasuringUnit : "";
  let productPrice = selectedProduct ?  selectedProduct.productPrice : "";
  let productStatus = selectedProduct ?  selectedProduct.productStatus : "";
  let supplierName = selectedProduct ?  selectedProduct.supplierName : "";
  let productImage = selectedProduct ?  selectedProduct.productImage : "";

  const handleAddToCart = (productId, productName, productPrice, supplierSyscoID, supplierName) => {
    let sessionId = localStorage.getItem("cart-id");
    if (!sessionId) {
      const uniqueId = uuidv4();
      localStorage.setItem("cart-id",uniqueId);
      sessionId = localStorage.getItem("cart-id");
    } 

    if (sessionId) {
      let data = {
        sessionID : sessionId,
        productSyscoID: productId,
        productName: productName,
        quantity : 1,
        price : productPrice,
        supplierName : supplierName
      };
      localStorage.setItem(productId+"-supplierName",supplierName);
      localStorage.setItem(productId+"-supplierSyscoID",supplierSyscoID);

      console.log(`Product with ID ${productId} added to cart`);
      console.log(`Product with sessionId ${sessionId} added to cart`);

      dispatch(createCart(data));
      window.location.href = "/order/create"
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
        <Card bordered={false}>
          <div className="row-col">
            <label htmlFor="productName">Product Name:&nbsp;&nbsp;</label>
            <span id="productName">{productName}</span><br/><br/>

            <label htmlFor="productDescription">Product Description:&nbsp;&nbsp; </label>
            <span id="productDescription">{productDescription}</span><br/><br/>

            <label htmlFor="productMeasuringUnit">Measuring Unit:&nbsp;&nbsp;</label>
            <span id="productMeasuringUnit">{productMeasuringUnit}</span><br/><br/>

            <label htmlFor="productPrice">Product Price:&nbsp;&nbsp;</label>
            <span id="productPrice">{productPrice}</span><br/><br/>

            <label htmlFor="productPrice">Supplier Name:&nbsp;&nbsp;</label>
            <span id="productPrice">{supplierName}</span><br/><br/>

            <label htmlFor="productStatus">Product Status:&nbsp;&nbsp;</label>
            <span id="productStatus">{productStatus}</span><br/><br/>

            <span><img style={{ width: '500px', height: '500px' }} src={(productImage === "no image" ? productImage : (baseUrl+"/uploads/"+productImage))} alt={productName} /></span><br/><br/>
            <Button
              style={{ width: "20%", fontSize: '16px' }}
              type="primary"
              htmlType="button"
              onClick={() => handleAddToCart(productSyscoID, productName, productPrice, supplierSyscoID, supplierName)}
          >
              Add To Cart
          </Button>
          </div>
        </Card>
      </Content>
    </Col>
  </Row>
</div>
    </>
  );
};

export default ProductView;
