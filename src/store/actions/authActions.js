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

export const signup = (newUser, history) => {
  return async (dispatch) => {
    try {
      const res = await instance.post("/signup", newUser);
      localStorage.setItem("myToken", res.data.token);
      // dispatch(setUser(res.data.token));
      dispatch({
        type: types.SET_USER,
        payload: decode(res.data.token),
      });
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
      localStorage.setItem("myToken", res.data.token);
      // dispatch(setUser(res.data.token));
      dispatch({
        type: types.SET_USER,
        payload: decode(res.data.token),
      });
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
    console.log("current time", currentTime);
    console.log("user exp", user.exp);
    if (user.exp >= currentTime) {
      console.log("not expired");
      dispatch(setUser(token));
    } else {
      console.log("expired");
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

export const updateUser = (updatedProfile, history) => async (dispatch) => {
  try {
    const res = await instance.put("/userUpdate", updatedProfile);
    dispatch(setUser(res.data[1]), {
      type: types.SET_USER,
      payload: res.data[0],
    });
    history.replace("/");
  } catch (err) {
    console.error(err);
  }
};
