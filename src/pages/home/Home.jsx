import React, { useEffect } from "react";
import { fetchProductList } from "../product/productSlice";
import { fetchUserList } from "../user/userSlice";
import { showHideLoading } from "../../utils/HandleLoading";
import {
  Button,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, createCart, fetchSupplierOrderList } from "../order/orderSlice";
import productImage from "../../assets/images/dummy.jpeg";
import { v4 as uuidv4 } from 'uuid';
import { baseUrl } from "../../config/config";

const Home = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) =>
        state.products ? state.products : []
    );
    const { orders, loadingOrder } = useSelector((state) =>
      state.orders ? state.orders : []
    );

    const { users, userListLoading } = useSelector((state) =>
      state.users ? state.users : []
    );

    showHideLoading(loading);

    const userRole = localStorage.getItem("userRole");
    const isAdmin = (userRole === "admin");
    const isCustomer = (userRole === "customer");


    let query = "product_status=all"
    +((isCustomer) ? "&approval_status=approved" : "&approval_status=all")
    +((isAdmin || isCustomer) ? "&supplier_sysco_id=" : "&supplier_sysco_id="+localStorage.getItem("userSyscoID"))
    + "&page=0"
    + "&size=100";

    let userquery = "userRole=all&userStatus=all&page=0&size=10000"

    let supQuery  = "sysco_id="+localStorage.getItem("userSyscoID")
    +"&supply_status=0"
    + "&page=0"
    + "&size=10000";

    const fetchData = async () => {
      await dispatch(fetchProductList(query));
      await dispatch(fetchUserList(userquery));
      if (userRole == "supplier") {
        await dispatch(fetchSupplierOrderList(supQuery));
      }
      
    };

    useEffect(() => {
      fetchData();
    }, []);

  const approvedProductsCount = (products != null) ? products.filter(product => product.productApproval === 'approved').length : 0;
  const pendingProductsCount = (products != null) ? products.filter(product => product.productApproval === 'pending').length : 0;
  const notApprovedProductsCount = (products != null) ? products.filter(product => product.productApproval === 'not').length : 0;

  const supplyOrdersCount = (orders != null) ? orders.filter(order => order.supplyStatus === true).length : 0;
  const pendingOrdersCount = (orders != null) ? orders.filter(order => order.supplyStatus === false).length : 0;

  const activeUserCount = (users != null) ? users.filter(user => user.userStatus === 'active').length : 0;
  const pendingUserCount = (users != null) ? users.filter(user => user.userStatus === 'inactive').length : 0;

  const totalUserCount = users.length;

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
        price : productPrice
      };
      localStorage.setItem(productId+"-supplierName",supplierName);
      localStorage.setItem(productId+"-supplierSyscoID",supplierSyscoID);

      console.log(`Product with ID ${productId} added to cart`);
      console.log(`Product with sessionId ${sessionId} added to cart`);

      dispatch(createCart(data));
      window.location.href = "/order/create"
    }
  };

    return (
        <>
        {(userRole === 'admin' || userRole === 'supplier') && (
          <div className="row">
              <div className="col-md-4 col-sm-6 col-12">
                  <div className="info-box bg-success">
                    <span className="info-box-icon">
                      <i className="far fa-thumbs-up"></i>
                    </span>

                    <div className="info-box-content">
                      <span className="info-box-text">Approved Product</span>
                      <span className="info-box-number">{approvedProductsCount}</span>

                      <div className="progress">
                        <div className="progress-bar"></div>
                      </div>
                      <span className="progress-description">Approved From Admin</span>
                      <span className="progress-description"><a  href="/product/list?product_status=approved"> More detail</a></span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <div className="info-box bg-warning">
                    <span className="info-box-icon">
                      <i className="far fa-star" aria-hidden="true"></i>
                    </span>

                    <div className="info-box-content">
                      <span className="info-box-text">Pending Product</span>
                      <span className="info-box-number">{pendingProductsCount}</span>

                      <div className="progress">
                        <div className="progress-bar"></div>
                      </div>
                      <span className="progress-description">
                      Awaiting administrative approval
                      </span>
                      <span className="progress-description"><a  href="/product/list?product_status=pending"> More detail</a></span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <div className="info-box bg-danger">
                    <span className="info-box-icon">
                      <i className="far fa-thumbs-down"></i>
                    </span>

                    <div className="info-box-content">
                      <span className="info-box-text">Rejected Product</span>
                      <span className="info-box-number">{notApprovedProductsCount}</span>

                      <div className="progress">
                        <div className="progress-bar"></div>
                      </div>
                      <span className="progress-description">
                      Rejected From admin
                      </span>
                      <span className="progress-description"><a  href="/product/list?product_status=not"> More detail</a></span>
                    </div>
                  </div>
                </div>
                </div>
                
        )}

        {(userRole === 'supplier') && (
          <div className="row">
            <div className="col-md-6 col-sm-6 col-12">
              <div className="info-box bg-warning">
                <span className="info-box-icon">
                  <i className="far fa-star" aria-hidden="true"></i>
                </span>

                <div className="info-box-content">
                  <span className="info-box-text">Pending Orders</span>
                  <span className="info-box-number">{pendingOrdersCount}</span>

                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <span className="progress-description">
                  Waiting to be sent from the supplier
                  </span>
                  <span className="progress-description"><a  href="/order/list?supply_status=0"> More detail</a></span>
                </div>
              </div>
            </div>
          <div className="col-md-6 col-sm-6 col-12">
              <div className="info-box bg-success">
                <span className="info-box-icon">
                  <i className="far fa-thumbs-up"></i>
                </span>

                <div className="info-box-content">
                  <span className="info-box-text">Supply Orders</span>
                  <span className="info-box-number">{supplyOrdersCount}</span>

                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <span className="progress-description">Already dispatched from the supplier</span>
                  <span className="progress-description"><a  href="/order/list?supply_status=1"> More detail</a></span>
                </div>
              </div>
            </div>
            </div>
        )}

        {(userRole === 'admin') && (
          <div className="row">
              <div className="col-md-4 col-sm-6 col-12">
                  <div className="info-box bg-secondary">
                    <span className="info-box-icon">
                      <i className="far fa-thumbs-up"></i>
                    </span>

                    <div className="info-box-content">
                      <span className="info-box-text">Active Users</span>
                      <span className="info-box-number">{activeUserCount}</span>

                      <div className="progress">
                        <div className="progress-bar"></div>
                      </div>
                      <span className="progress-description">Active Users</span>
                      <span className="progress-description"><a  href="/users/list?userStatus=active"> More detail</a></span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <div className="info-box bg-danger">
                    <span className="info-box-icon">
                      <i className="far fa-star" aria-hidden="true"></i>
                    </span>

                    <div className="info-box-content">
                      <span className="info-box-text">Inactive Users</span>
                      <span className="info-box-number">{pendingUserCount}</span>

                      <div className="progress">
                        <div className="progress-bar"></div>
                      </div>
                      <span className="progress-description">
                      Awaiting administrative approval
                      </span>
                      <span className="progress-description"><a  href="/users/list?userStatus=inactive"> More detail</a></span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <div className="info-box bg-info">
                    <span className="info-box-icon">
                      <i className="far fa-thumbs-down"></i>
                    </span>

                    <div className="info-box-content">
                      <span className="info-box-text">Total Users</span>
                      <span className="info-box-number">{totalUserCount}</span>

                      <div className="progress">
                        <div className="progress-bar"></div>
                      </div>
                      <span className="progress-description">
                      Total Users in the system
                      </span>
                      <span className="progress-description"><a  href="/users/list"> More detail</a></span>
                    </div>
                  </div>
                </div>
                </div>
                
        )}
        {
            userRole === 'customer' && (
                <div className="row">
                    {products.map((product) => {
                        // Corrected the logic for removing items from localStorage
                        // const supplierName = localStorage.removeItem(product.productSyscoID + "-supplierName");
                        // const supplierSyscoID = localStorage.removeItem(product.productSyscoID + "-supplierSyscoID");
                        if (product.productStatus == "available") {
                          return (
                            <div className="col-md-3 col-sm-6 col-12" key={product.productID}>
                                <a href='#'>
                                    <div className="info-box">
                                        <div className="info-box-content">
                                            <span><img src={(product.productImage == "no image" ? productImage : (baseUrl+"/uploads/"+product.productImage))} alt={product.productName} /></span>
                                            <span className="info-box-text">{product.productName}</span>
                                            <span className="info-box-price">${product.productPrice}</span>
                                            <Button
                                                style={{ width: "100%", fontSize: '16px' }}
                                                type="primary"
                                                htmlType="button"
                                                onClick={() => handleAddToCart(product.productSyscoID, product.productName, product.productPrice, product.supplierSyscoID, product.supplierName)}
                                            >
                                                Add To Cart
                                            </Button>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        );
                        }

                    })}
                </div>
            )
        }

</>
  );
};

export default Home;