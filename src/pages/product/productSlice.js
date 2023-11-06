import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getProduct,
  getProducts,
  createProductApi,
  updateProductApi,
  deleteProductApi,
  getProductStatus,
  getProductAproval
} from "../../api/product";

let initialState = {
  product: null,
  selectedProdct: null,
  products: [],
  loading: false,
  error: "",
  message: "",
};

const productSlice = createSlice({
  name: "area",
  initialState,
  reducers: {
    fetchProductStart(state) {
      state.loading = true;
    },
    fetchProductSuccess(state, action) {
      const { data } = action.payload;
      state.selectedProduct = data;
      state.loading = false;
    },
    fetchProductFail(state, action) {
      state.loading = false;
    },
    fetchProductsStart(state) {
      state.loading = true;
    },
    fetchProductsSuccess(state, action) {
      const { list } = action.payload;
      state.products = list;
      state.loading = false;
    },
    fetchProductsFail(state, action) {
      state.loading = false;
    },
    removeRecordSuccess(state, action) {
      const { _id, products } = action.payload;
      state.products = products.filter((item) => item.productID !== _id);
      state.loading = false;
    },
    fetchProductStatusStart(state) {
      state.loading = true;
    },
    fetchProductStatusSuccess(state, action) {
      const { status } = action.payload;
      state.status = status;
      state.loading = false;
    },
    fetchProductStatusFail(state, action) {
      state.loading = false;
    },
    fetchProductAprovalStart(state) {
      state.loading = true;
    },
    fetchProductAprovalSuccess(state, action) {
      const { aprovals } = action.payload;
      state.aprovals = aprovals;
      state.loading = false;
    },
    fetchProductAprovalFail(state, action) {
      state.loading = false;
    },
  },
});

export const {
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFail,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFail,
  removeRecordSuccess,
  fetchProductStatusStart,
  fetchProductStatusSuccess,
  fetchProductStatusFail,
  fetchProductAprovalStart,
  fetchProductAprovalSuccess,
  fetchProductAprovalFail
} = productSlice.actions;

export default productSlice.reducer;

export const fetchProductList =
  (query = "") =>
  async (dispatch) => {
    dispatch(fetchProductsStart());
    try {
      const response = await getProducts(query);
      const products = response.data ? response.data : null;
      if (products != null) {
        dispatch(fetchProductsSuccess(response.data));
      } else {
        dispatch(fetchProductsFail());
        toast.error(response.errors.join(", "));
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong");
      dispatch(fetchProductsFail());
    }
  };

export const fetchProduct = (id) => async (dispatch) => {
  dispatch(fetchProductStart());
  try {
    const response = await getProduct(id);
    const products = response.data ? response.data : null;
    if (products != null) {
      dispatch(fetchProductSuccess(response));
    } else {
      dispatch(fetchProductFail());
      toast.error(response.message);
    }
  } catch (error) {
    console.log("error", error);
    toast.error("Something went wrong");

    dispatch(fetchProductFail());
  }
};

export const createProduct = (data) => async (dispatch) => {
  dispatch(fetchProductStart());
  try {
    const response = await createProductApi(data);
    const product = response.data ? response.data : null;
    if (product != null) {
      toast.success("Sucessfuly Saved!");
    } else {
      dispatch(fetchProductFail());
      toast.error(response.message);
    }
  } catch (error) {
    console.log("error", error);
    toast.error("Something went wrong");

    dispatch(fetchProductFail());
  }
};

export const updateProduct = (_id, data) => async (dispatch) => {
  dispatch(fetchProductStart());
  try {
    const response = await updateProductApi(_id, data);
    const product = response.data ? response.data : null;
    if (product != null) {
      toast.success("Sucessfuly Updated!");
    } else {
      dispatch(fetchProductFail());
      toast.error(response.message);
    }
  } catch (error) {
    console.log("error", error);
    toast.error("Something went wrong");

    dispatch(fetchProductFail());
  }
};

export const deleteProduct = (_id, products) => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await deleteProductApi(_id);
    const product = response.data ? response.data : null;
    if (product != null) {
      dispatch(removeRecordSuccess({ _id: _id, products: products }));
      toast.success("Sucessfuly Deleted!");
    } else {
      dispatch(fetchProductsFail());
      toast.error(response.message);
    }
  } catch (error) {
    console.log("error", error);
    toast.error("Something went wrong");

    dispatch(fetchProductsFail());
  }
};

export const fetchProductStatus = () => async (dispatch) => {
  dispatch(fetchProductStatusStart());
  try {
    const response = await getProductStatus();
    const status = response;
    if (status != null) {
      dispatch(fetchProductStatusSuccess({ status: status }));
    } else {
      dispatch(fetchProductStatusFail());
      toast.error(response.message);
    }
  } catch (error) {
    console.log("error", error);
    toast.error("Something went wrong");

    dispatch(fetchProductStatusFail());
  }
};

export const fetchProductAproval = () => async (dispatch) => {
  dispatch(fetchProductAprovalStart());
  try {
    const response = await getProductAproval();
    const aprovals = response;
    if (aprovals != null) {
      dispatch(fetchProductAprovalSuccess({ aprovals: aprovals }));
    } else {
      dispatch(fetchProductAprovalFail());
      toast.error(response.message);
    }
  } catch (error) {
    console.log("error", error);
    toast.error("Something went wrong");

    dispatch(fetchProductAprovalFail());
  }
};

