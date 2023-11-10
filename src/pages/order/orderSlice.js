import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getOrder,
  getOrdersForCustomer,
  updateOrderApiByCustomer,
  getOrderSupplier,
  getOrdersForSupplier,
  createOrderApi,
  deleteOrderApi,
  createCartApi,
  getCartById,
  updateCartApi,
  deleteCartApi,
  updateOrderApiBySupplier
} from "../../api/order";

let initialState = {
  order: null,
  selectedOrder: null,
  ordres: [],
  selectedCart: null,
  loading: false,
  error: "",
  message: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchCartStart(state) {
      state.loading = true;
    },
    fetchCartSuccess(state, action) {
      const { data } = action.payload;
      state.selectedCart = data;
      state.loading = false;
    },
    fetchCartFail(state, action) {
      state.loading = false;
    },
    fetchOrderStart(state) {
      state.loading = true;
    },
    fetchOrderSuccess(state, action) {
      const { data } = action.payload;
      state.selectedOrder = data;
      state.loading = false;
    },
    fetchOrderFail(state, action) {
      state.loading = false;
    },
    fetchOrdersStart(state) {
      state.loading = true;
    },
    fetchOrdersSuccess(state, action) {
      const { data } = action.payload;
      state.orders = data.list ?? [];
      state.loading = false;
    },
    fetchOrdersFail(state, action) {
      state.loading = false;
      state.orders = [];
    },
  },
});

export const {
  fetchCartStart,
  fetchCartSuccess,
  fetchCartFail,
  fetchOrderStart,
  fetchOrderSuccess,
  fetchOrderFail,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFail
} = orderSlice.actions;

export default orderSlice.reducer;

export const fetchCart = (id) => async (dispatch) => {
  dispatch(fetchCartStart());
  try {
    const response = await getCartById(id);
    const cart = response.data ? response.data : null;
    if (cart != null && response.code == 200) {
      dispatch(fetchCartSuccess(response));
    } else {
      dispatch(fetchCartFail());
      toast.error(response.message);
    }
  } catch (error) {
    let msg = "Something went wrong";
    toast.error(msg);

    dispatch(fetchCartFail());
  }
};

export const createCart = (data) => async (dispatch) => {
  dispatch(fetchCartStart());
  try {
    const response = await createCartApi(data);
    const product = response.data ? response.data : null;
    if (product != null) {
      toast.success("Sucessfuly Saved!");
    } else {
      dispatch(fetchCartFail());
      toast.error(response.message);
    }
  } catch (error) {
    let msg = error || "Something went wrong";
    toast.error(msg);

    dispatch(fetchCartFail());
  }
};

export const updateCart = (_id, data) => async (dispatch) => {
  dispatch(fetchCartStart());
  try {
    const response = await updateCartApi(_id, data);
    const product = response.data ? response.data : null;
    if (product != null) {
      toast.success("Sucessfuly Updated!");
    } else {
      dispatch(fetchCartFail());
      toast.error(response.message);
    }
  } catch (error) {
    let msg = error || "Something went wrong";
    toast.error(msg);

    dispatch(fetchCartFail());
  }
};

export const deleteCart = (_id, sessionID) => async (dispatch) => {
  dispatch(fetchCartStart());
  try {
    const response = await deleteCartApi(_id, sessionID);
    const product = response.data ? response.data : null;
    if (product != null) {
      toast.success("Sucessfuly Deleted!");
    } else {
      dispatch(fetchCartFail());
      toast.error(response.message);
    }
  } catch (error) {
    let msg = error || "Something went wrong";
    toast.error(msg);

    dispatch(fetchCartFail());
  }
};

export const fetchOrderList = (id) => async (dispatch) => {
  dispatch(fetchOrderStart());
  try {
    const response = await getOrdersForCustomer(id);
    const orders = response.data ? response.data : null;
    if (orders != null && response.code == 200) {
      dispatch(fetchOrdersSuccess(response));
    } else {
      dispatch(fetchOrdersFail());
      toast.error(response.message);
    }
  } catch (error) {
    let msg = "Something went wrong";
    toast.error(msg);

    dispatch(fetchOrdersFail());
  }
};

export const fetchSupplierOrderList = (query) => async (dispatch) => {
  dispatch(fetchOrderStart());
  try {
    const response = await getOrdersForSupplier(query);
    const orders = response.data ? response.data : null;
    if (orders != null && response.code == 200) {
      dispatch(fetchOrdersSuccess(response));
    } else {
      dispatch(fetchOrdersFail());
      toast.error(response.message);
    }
  } catch (error) {
    let msg = "Something went wrong";
    toast.error(msg);

    dispatch(fetchOrdersFail());
  }
};

export const fetchOrder = (id) => async (dispatch) => {
  dispatch(fetchOrderStart());
  try {
    const response = await getOrder(id);
    const order = response.data ? response.data : null;
    if (order != null && response.code == 200) {
      dispatch(fetchOrderSuccess(response));
    } else {
      dispatch(fetchOrderFail());
      toast.error(response.message);
    }
  } catch (error) {
    let msg = "Something went wrong";
    toast.error(msg);

    dispatch(fetchOrderFail());
  }
};

export const createOrder = (sessionID, data) => async (dispatch) => {
  dispatch(fetchOrderStart());
  try {
    const response = await createOrderApi(sessionID, data);
    const order = response.data ? response.data : null;
    if (order != null) {
      toast.success("Sucessfuly Saved!");
    } else {
      dispatch(fetchOrderFail());
      toast.error(response.message);
    }
  } catch (error) {
    let msg = error || "Something went wrong";
    toast.error(msg);

    dispatch(fetchOrderFail());
  }
};

export const updateOrder = (_id, data) => async (dispatch) => {
  dispatch(fetchOrderStart());
  try {
    const response = await updateOrderApiByCustomer(_id, data);
    const order = response.data ? response.data : null;
    if (order != null) {
      toast.success("Sucessfuly Updated!");
    } else {
      dispatch(fetchOrderFail());
      toast.error(response.message);
    }
  } catch (error) {
    let msg = error || "Something went wrong";
    toast.error(msg);

    dispatch(fetchOrderFail());
  }
};

export const updateOrderBySupplier = (_id, data) => async (dispatch) => {
  dispatch(fetchOrderStart());
  try {
    const response = await updateOrderApiBySupplier(_id, data);
    const order = response.data ? response.data : null;
    if (order != null) {
      toast.success("Sucessfuly Updated!");
    } else {
      dispatch(fetchOrderFail());
      toast.error(response.message);
    }
  } catch (error) {
    let msg = error || "Something went wrong";
    toast.error(msg);

    dispatch(fetchOrderFail());
  }
};


export const deleteOrder = (id) => async (dispatch) => {
  dispatch(fetchOrderStart());
  try {
    const response = await getOrder(id);
    const order = response.data ? response.data : null;
    if (order != null && response.code == 200) {
      dispatch(fetchOrderSuccess(response));
    } else {
      dispatch(fetchOrderFail());
      toast.error(response.message);
    }
  } catch (error) {
    let msg = "Something went wrong";
    toast.error(msg);

    dispatch(fetchOrderFail());
  }
};