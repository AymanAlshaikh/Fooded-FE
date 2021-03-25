import instance from "./instance";
import decode from "jwt-decode";
import * as types from "./types";

const setUser = (token) => {
  localStorage.setItem("myToken", token);
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  return {
    type: types.SET_USER,
    payload: decode(token),
  };
};
// if changing backend for redundency, change newUser prop
export const signup = (newUser, history) => {
  return async (dispatch) => {
    try {
      const res = await instance.post("/signup", newUser);
      dispatch(setUser(res.data.token));
      history.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
};

export const signin = (userData, history) => {
  return async (dispatch) => {
    try {
      const res = await instance.post("/signin", userData);
      dispatch(setUser(res.data.token));
      history.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
};

export const signout = () => {
  localStorage.removeItem("myToken");
  delete instance.defaults.headers.common.Authorization;
  return {
    type: types.SET_USER,
    payload: null,
  };
};

export const checkForToken = () => (dispatch) => {
  const token = localStorage.getItem("myToken");
  if (token) {
    const user = decode(token);
    const currentTime = Date.now();
    if (currentTime < user.exp) {
      dispatch(setUser(token));
    } else {
      dispatch(signout());
    }
  }
};

export const fetchProfile = () => async (dispatch) => {
  try {
    const res = await instance.get("/userView");
    dispatch({
      type: types.SET_USER,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = (updatedProfile) => async (dispatch) => {
  try {
    const res = await instance.put("/userUpdate", updatedProfile);
    dispatch(setUser(res.data[1]), {
      type: types.SET_USER,
      payload: res.data[0],
    });
  } catch (err) {
    console.error(err);
  }
};
