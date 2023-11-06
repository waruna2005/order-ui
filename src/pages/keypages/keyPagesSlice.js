import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getKeyPage,
  getKeyPages
} from "../../api/keypages";

let initialState = {
  dis: null,
  keypages: [],
  loading: false,
  error: "",
  message: "",
};

const keypageSlice = createSlice({
  name: "keypages",
  initialState,
  reducers: {
    fetchKeyPagesStart(state) {
      state.loading = true;
    },
    fetchKeyPagesSuccess(state, action) {
      const { keypages } = action.payload;
      state.keypages = keypages;
      state.loading = false;
    },
    fetchKeyPagesFail(state, action) {
      state.loading = false;
    },
    fetchKeyPageStart(state) {
      state.loading = true;
    },
    fetchKeyPageSuccess(state, action) {
      const { keypage } = action.payload;
      state.selectedKeypage = keypage;
      state.loading = false;
    },
    fetchKeyPageFail(state, action) {
      state.loading = false;
    },
  },
});

export const {
  fetchKeyPagesStart,
  fetchKeyPagesSuccess,
  fetchKeyPagesFail,
  fetchKeyPageStart,
  fetchKeyPageSuccess,
  fetchKeyPageFail
} = keypageSlice.actions;

export default keypageSlice.reducer;

export const fetchKeyPageList =
  (query = "") =>
  async (dispatch) => {
    dispatch(fetchKeyPagesStart());
    try {
      const response = await getKeyPages(query);
      const keypages = response.data.keypages
        ? response.data.keypages
        : null;
      if (keypages != null) {
        dispatch(fetchKeyPagesSuccess(response.data));
      } else {
        dispatch(fetchKeyPagesFail());
        toast.error(response.errors.join(", "));
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong");

      dispatch(fetchKeyPagesFail());
    }
  };

export const fetchKeyPage = (id) => async (dispatch) => {
  dispatch(fetchKeyPageStart());
  try {
    const response = await getKeyPage(id);
    const keypage = response.data.keypage ? response.data.keypage : null;
    if (keypage != null) {
      dispatch(fetchKeyPageSuccess(response.data));
    } else {
      dispatch(fetchKeyPageFail());
      toast.error(response.errors.join(", "));
    }
  } catch (error) {
    console.log("error", error);
    toast.error("Something went wrong");

    dispatch(fetchKeyPageFail());
  }
};