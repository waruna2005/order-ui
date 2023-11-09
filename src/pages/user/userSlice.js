import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getUserById,
  getUserRoles,
  getUsers,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from "../../api/user";
import { getGenders } from "../../api/gender";
import validator from "validator";

let initialState = {
  user: null,
  selectedUser: null,
  users: [],
  userPermission: [],
  genders: [],
  roles: [],
  loading: false,
  error: "",
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserStart(state) {
      state.loading = true;
    },
    fetchUserSuccess(state, action) {
      const { data } = action.payload;
      state.selectedUser = data;
      state.loading = false;
    },
    fetchUserFail(state, action) {
      state.loading = false;
    },
    fetchUsersStart(state) {
      state.loading = true;
    },
    fetchUsersSuccess(state, action) {
      const { list } = action.payload;
      state.users = list;
      state.loading = false;
    },
    fetchUsersFail(state, action) {
      state.loading = false;
    },
    fetchGendersStart(state) {
      state.loading = true;
    },
    fetchGendersSuccess(state, action) {
      const { genders } = action.payload;
      state.genders = genders;
      state.loading = false;
    },
    fetchGendersFail(state, action) {
      state.loading = false;
    },
    fetchUserRolesStart(state) {
      state.loading = true;
    },
    fetchUserRolesSuccess(state, action) {
      const { roles } = action.payload;
      state.roles = roles;
      state.loading = false;
    },
    fetchUserRolesFail(state, action) {
      state.loading = false;
    },
    fetchUserPermissionsStart(state) {
      state.loading = true;
    },
    fetchUserPermissionsSuccess(state, action) {
      const { data } = action.payload;
      state.permissions = data.permissions;
      state.loading = false;
    },
    fetchUserPermissionsFail(state, action) {
      state.loading = false;
    },
  },
});

export const {
  fetchUserPermissionsStart,
  fetchUserPermissionsSuccess,
  fetchUserPermissionsFail,
  fetchUserRolesStart,
  fetchUserRolesSuccess,
  fetchUserRolesFail,
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFail,
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFail,
  fetchGendersStart,
  fetchGendersSuccess,
  fetchGendersFail,
} = userSlice.actions;

export default userSlice.reducer;

export const fetchUserList = (query = "") => async (dispatch) => {
  dispatch(fetchUsersStart());
  try {
    const response = await getUsers(query);
    const users = response.data.list ? response.data.list : null;
    if (users !== null) {
      dispatch(fetchUsersSuccess(response.data));
    } else {
      dispatch(fetchUsersFail());
      toast.error(response.message);
    }
  } catch (error) {
    let msg = error || "Something went wrong";
    toast.error(msg);
    dispatch(fetchUsersFail());
  }
};

export const fetchUserRoles = () => async (dispatch) => {
  dispatch(fetchUserRolesStart());
  try {
    const response = await getUserRoles();
    if (response !== null) {
      dispatch(fetchUserRolesSuccess({ roles: response }));
    } else {
      dispatch(fetchUserRolesFail());
      toast.error(response.errors.join(", "));
    }
  } catch (error) {
    let msg = error || "Something went wrong";
    toast.error(msg);
    dispatch(fetchUserRolesFail());
  }
};

export const fetchUser = (id) => async (dispatch) => {
  dispatch(fetchUserStart());
  try {
    const response = await getUserById(id);
    const user = response.data ? response.data : null;
    if (user !== null) {
      dispatch(fetchUserSuccess(response));
    } else {
      dispatch(fetchUserFail());
      toast.error(response.message);
    }
  } catch (error) {
    let msg = error || "Something went wrong";
    toast.error(msg);

    dispatch(fetchUserFail());
  }
};

export const createUser = (data) => async (dispatch) => {
  dispatch(fetchUserStart());
  try {
    const response = await createUserApi(data);
    const user = response.data ? response.data : null;
    if (user !== null && response.code === 201) {
      toast.success("Sucessfuly Saved!");
    } else {
      dispatch(fetchUserFail());
      toast.error(response.message);
    }
  } catch (error) {
    let msg = error || "Something went wrong";
    toast.error(msg);

    dispatch(fetchUserFail());
  }
};

export const updateUser = (_id, data) => async (dispatch) => {
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
    if (data.userPassword !== data.confpassword) {
      toast.error("Passwords don't match!");
      return;
    }

    const response = await updateUserApi(_id, data);
    const user = response.data ? response.data : null;
    if (user !== null) {
      toast.success("Sucessfuly Updated!");
    } else {
      dispatch(fetchUserFail());
      toast.error(response.message);
    }
  } catch (error) {
    let msg = error || "Something went wrong";
    toast.error(msg);

    dispatch(fetchUserFail());
  }
};

export const deleteUser = (_id) => async (dispatch) => {
  dispatch(fetchUsersStart());
  try {
    const response = await deleteUserApi(_id);
    const users = response.data.users ? response.data.users : null;
    if (users !== null) {
      toast.success("Sucessfuly Deleted!");
    } else {
      dispatch(fetchUsersFail());
      toast.error(response.errors.join(", "));
    }
  } catch (error) {
    let msg = error || "Something went wrong";
    toast.error(msg);

    dispatch(fetchUsersFail());
  }
};

export const fetchGenders = () => async (dispatch) => {
  dispatch(fetchGendersStart());
  try {
    const response = await getGenders();
    const genders = response;
    if (genders !== null) {
      dispatch(fetchGendersSuccess({ genders: genders }));
    } else {
      dispatch(fetchGendersFail());
      toast.error(response.errors.join(", "));
    }
  } catch (error) {
    let msg = error || "Something went wrong";
    toast.error(msg);

    dispatch(fetchGendersFail());
  }
};

export const fetchUserPermissions = () => async (dispatch) => {
  dispatch(fetchUserPermissionsStart());
  try {
    const response = {
      "status": "success",
      "code": 200,
      "errors": [],
      "data": {
          "permissions": {
              "dashboard": [
                  "admin",
                  "supplier",
                  "customer",
              ],
              "users": {
                  "create": [
                      "admin"
                  ],
                  "edit": [
                      "admin"
                  ],
                  "delete": [
                      "admin"
                  ],
                  "list": [
                      "admin"
                  ]
              },
              "products": {
                "create": [
                    "supplier"
                ],
                "edit": [
                    "admin",
                    "supplier"
                ],
                "delete": [
                    "admin"
                ],
                "list": [
                    "admin",
                    "supplier"
                ]
            },

            "orders": {
              "create": [
                  "customer"
              ],
              "edit": [
                  "customer"
              ],
              "delete": [
                  "customer"
              ],
              "list": [
                  "customer",
                  "supplier"
              ]
          }
          }
      }
  };
  let permissions =  response.data ? response.data
      : null;
    if (permissions !== null) {
      dispatch(fetchUserPermissionsSuccess(response));
    } else {
      dispatch(fetchUserPermissionsFail());
      toast.error(response.join(", "));
    }
  } catch (error) {
    console.log("error", error);
    toast.error("Something went wrong");

    dispatch(fetchUserPermissionsFail());
  }
};
