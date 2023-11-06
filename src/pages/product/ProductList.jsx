import { Table, Space } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckOutlined } from "@ant-design/icons";

import { fetchProductList, deleteProduct } from "./productSlice";
import { showHideLoading } from "../../utils/HandleLoading";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) =>
    state.products ? state.products : []
  );
  const { permissions } = useSelector((state) =>
    state.users ? state.users : []
  );
  const userRole = localStorage.getItem("userRole");
  showHideLoading(loading);
  let query = "product_status=all"
  +"&approval_status=all"
  +"&supplier_sysco_id="
  + "&page=0"
  + "&size=1000";

  const fetchData = async () => {
    await dispatch(fetchProductList(query));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Product Id",
      dataIndex: "productID",
      key: "productID",
      onFilter: (value, product) => product.productID.indexOf(value) === 0,
      sorter: (a, b) => a.productID.length - b.productID.length,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      filterMultiple: false,
      onFilter: (value, record) => record.productName.indexOf(value) === 0,
      sorter: (a, b) => a.productName.length - b.productName.length,
    },
    {
      title: "Product Description",
      dataIndex: "productDescription",
      filterMultiple: false,
      onFilter: (value, record) => record.productDescription.indexOf(value) === 0,
      sorter: (a, b) => a.productDescription.length - b.productDescription.length,
    },
    {
      title: "Product Aproval",
      dataIndex: "productApproval",
      filterMultiple: false,
      onFilter: (value, record) => record.productApproval.indexOf(value) === 0,
      sorter: (a, b) => a.productApproval.length - b.productApproval.length,
    },
    {
      title: "Product Status",
      dataIndex: "productStatus",
      filterMultiple: false,
      onFilter: (value, record) => record.productStatus.indexOf(value) === 0,
      sorter: (a, b) => a.productStatus.length - b.productStatus.length,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space size="middle">
          {permissions &&
          permissions["products"]["edit"].indexOf(userRole) != -1 ? (
            <a href={"/product/" + record.productID + "/edit"}>Edit</a>
          ) : (
            ""
          )}
          {
            permissions &&
            permissions["products"]["delete"].indexOf(userRole) != -1 &&
            (record.productApproval != "approved") ? ( // Adding the condition to check if the product is not approved
              <a href="#" onClick={() => _deleteArea(record.productID)}>
                Delete
              </a>
            ) : (
              ""
            )
          }
        </Space>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter) => {
    console.log("params", pagination, filters, sorter);
  };

  const _deleteArea = async (_id, e) => {
    await dispatch(deleteProduct(_id, products));
  };

  return (
    <>
      <div className="layout-content">
        <Table
          pagination={{ pageSize: 5 }}
          rowKey="_id"
          columns={columns}
          dataSource={products}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default ProductList;