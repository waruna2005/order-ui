import React, { useEffect } from "react";
import { fetchProductList } from "../product/productSlice";
import { showHideLoading } from "../../utils/HandleLoading";
import {
  Button,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import productImage from "../../assets/images/dummy.jpeg";

const Home = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) =>
    state.products ? state.products : []
  );

    showHideLoading(loading);

    const userRole = localStorage.getItem("userRole");
    const isAdmin = (userRole === "admin");
    const isCustomer = (userRole === "customer");


    let query = "product_status=all"
    +((isCustomer) ? "&approval_status=approved" : "&approval_status=")
    +((isAdmin || isCustomer) ? "&supplier_sysco_id=" : "&supplier_sysco_id="+localStorage.getItem("userSyscoID"))
    + "&page=0"
    + "&size=100";

    const fetchData = async () => {
      await dispatch(fetchProductList(query));
    };

    useEffect(() => {
      fetchData();
    }, []);

  const approvedProductsCount = products.filter(product => product.productApproval === 'approved').length;
  const pendingProductsCount = products.filter(product => product.productApproval === 'pending').length;
  const notApprovedProductsCount = products.filter(product => product.productApproval === 'not').length;
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

        {
            (userRole === 'customer') && (
                <div className="row">
                    {products.map((product) => (
                        <div className="col-md-3 col-sm-6 col-12" key={product.id}>
                            <a href='#'><div className="info-box">
                                <div className="info-box-content">
                                <span ><img src={productImage} alt={product.productName} />
                                </span>
                                    <span className="info-box-text">{product.productName}</span>
                                    <span className="info-box-price">${product.productPrice}</span>
                                    <Button
                                    style={{ width: "100%", fontSize:'16px'}}
                                    type="primary"
                                    htmlType="submit"
                                  >
                                    Add To Cart
                                  </Button>
                                </div>
                            </div>
                            </a>
                        </div>
                    ))}
                </div>
            )
        }
</>
  );
};

export default Home;
