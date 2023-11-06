import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserApi, createUserApi, changePasswordApi } from "../../api/user";
import validator from "validator";

let initialState = {
  user: null,
  loading: false,
  isPrepared: false,
  isLoggedIn: false,
  error: "",
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchUserStart(state) {
      state.loading = true;
    },
    fetchUserSuccess(state, action) {
      const { data } = action.payload;
      state.user = data;
      state.isLoggedIn = true;
      state.loading = false;
      state.isPrepared = true;
    },
    fetchUserFail(state, action) {
      state.isLoggedIn = false;
      state.loading = false;
      state.isPrepared = true;
    },
    logoutUser(state) {
      state.user = null;
      state.loading = false;
      state.isPrepared = false;
      state.isLoggedIn = false;
    },
    fetchChangePassword(state, action) {
      const { data } = action.payload;
      state.user = data;
    },
  },
});

export const {
  fetchChangePassword,
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFail,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;

export const fetchUser = (data) => async (dispatch) => {
  dispatch(fetchUserStart());
  try {
    const response = await getUserApi(data);
    const user = response.data ? response.data : null;
    if (user != null && response.code == 200) {
      localStorage.setItem("email", user.userEmail ? user.userEmail : "");
      localStorage.setItem("firstName", user.userFirstName ? user.userFirstName : "");
      localStorage.setItem("lastName", user.userLastName ? user.userLastName : "");
      localStorage.setItem("userSyscoID", user.userSyscoID ? user.userSyscoID : "");
      localStorage.setItem("userRole", user.userRole ? user.userRole : "");
      dispatch(fetchUserSuccess(response));
    } else {
      dispatch(fetchUserFail());
      toast.error(response.message);
    }
  } catch (error) {
    console.log("error", error);
    toast.error("Something went wrong");

    dispatch(fetchUserFail());
  }
};

export const logout = () => async (dispatch) => {
  dispatch(fetchUserStart());
  try {
    localStorage.removeItem("username");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("districtId");
    localStorage.removeItem("electoralSeatId");
    localStorage.removeItem("electoralDivisionId");
    localStorage.removeItem("token");

    dispatch(logoutUser());
  } catch (error) {
    console.log("error", error);
  }
};

export const createUser = (data) => async (dispatch) => {
  dispatch(fetchUserStart());
  try {
    if (
      !validator.isStrongPassword(data.userPassword, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      toast.error("Is Not Strong Password");
      return;
    }
    if (data.userPassword != data.confpassword) {
      toast.error("Passwords don't match!");
      return;
    }
    const response = await createUserApi(data);
    const user = response.data ? response.data : null;
    if (user != null && response.code == 201) {
      toast.success(response.message);
      setTimeout(function() {
        window.location.href = '/login';
      }, 1000);
    } else {
      dispatch(fetchUserFail());
      toast.error(response.message);
    }
  } catch (error) {
    console.log("error", error);
    toast.error("Something went wrong");

    dispatch(fetchUserFail());
  }
};

export const updateProfile = (data) => async (dispatch) => {
  dispatch(fetchUserStart());
  try {
    if (
      !validator.isStrongPassword(data.userPassword, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      toast.error("Is Not Strong Password");
      return;
    }
    if (data.userPassword != data.confpassword) {
      toast.error("Passwords don't match!");
      return;
    }
    const response = await changePasswordApi(data);
    const user = response.data.user ? response.data.user : null;
    if (user != null) {
      toast.success("Password sucessfuly changed!");
    } else {
      dispatch(fetchUserFail());
      toast.error(response.errors.join(", "));
    }
  } catch (error) {
    console.log("error", error);
    toast.error("Something went wrong");

    dispatch(fetchUserFail());
  }
};
