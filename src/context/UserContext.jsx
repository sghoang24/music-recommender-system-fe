import React, { createContext, useContext, useReducer } from "react";

export const UserContext = createContext();

export const UserReducer = (state, action) => {
  if (action.type === "UPDATE_DATA") {
    return { ...state, [action.key]: action.value };
  }
  if (action.type === "UPDATE_STATE") {
    return { ...state, ...action.state };
  }
  return { ...state };
};

const initState = {
  user: null,
  token: localStorage.getItem("access_token"),
};

export const UserProvider = (props) => {
  const [state, dispatch] = useReducer(UserReducer, initState);
  return (
    <UserContext.Provider
      value={{
        state,
        updateData: (key, value) =>
          dispatch({
            type: "UPDATE_DATA",
            key,
            value,
          }),
        updateState: (state_) =>
          dispatch({
            type: "UPDATE_STATE",
            state: state_,
          }),
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
