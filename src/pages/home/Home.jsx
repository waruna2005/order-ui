import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/plots";
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
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { fetchProductList, deleteProduct } from "../product/productSlice";
import { showHideLoading } from "../../utils/HandleLoading";

import { useDispatch, useSelector } from "react-redux";

const Home = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) =>
    state.products ? state.products : []
  );

    showHideLoading(loading);
    let query = "product_status=all"
    +"&approval_status=all"
    +"&supplier_sysco_id="
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
  let userRole = localStorage.getItem("userRole")
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
                    </div>
                  </div>
                </div>
                </div>
        )}
</>
  );
};

export default Home;
