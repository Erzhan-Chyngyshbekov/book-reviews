import axios from "axios";
import React, { useReducer } from "react";
import { useHistory } from "react-router";
import axiosInstance from "../ApiAuth";

const INIT_STATE = {
  users: [],
  user: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const authContext = React.createContext();
const { REACT_APP_API_URL: URL } = process.env;

export default function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const history = useHistory();

  const fetchUsers = async () => {
    const response = await axios.get(`${URL}/api/v1/accounts/list/`);
    const users = response.data;

    dispatch({
      type: "SET_USERS",
      payload: users,
    });
  };

  // const fetchUser = async () => {
  //   dispatch({
  //     type: "SET_USER",
  //     payload: localStorage.getItem("user"),
  //   });
  // };

  const login = async (email, password) => {
    const response = await axiosInstance.post(`accounts/login/`, {
      email,
      password,
    });
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    localStorage.setItem("user", response.data.email);
    axiosInstance.defaults.headers["Authorization"] =
      "JWT " + localStorage.getItem("access_token");

    const user = response.data;

    dispatch({
      type: "SET_USER",
      payload: user,
    });
  };

  const logout = async () => {
    dispatch({
      type: "SET_USER",
      payload: {},
    });
  };

  const checkAuth = async () => {
    const response = await axios.get(`${URL}/api/v1/accounts/list/`);
    const users = response.data;
    // console.log(users);

    users.find((user) => {
      if ((user.email = localStorage.getItem("user"))) {
        dispatch({
          type: "SET_USER",
          payload: user,
        });
      }
    });
  };

  return (
    <authContext.Provider
      value={{
        users: state.users,
        user: state.user,
        login,
        fetchUsers,
        logout,
        checkAuth,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}
