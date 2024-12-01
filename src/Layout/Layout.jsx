import React, { useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";
import { UserContext } from "context/UserContext";
import api from "api";

const Layout = ({ children }) => {
  const { state, updateData, updateState } = useContext(UserContext);
  const token = localStorage.getItem("access_token");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // console.log("user context");
        // console.log(state);
        const response = await api.get("/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          updateData("user", response.data);
          // localStorage.setItem("userToken", userData.token);
          localStorage.setItem("userPreferences", response.data.preferences);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        updateState({
          token: null,
          preferences: null,
          user: null,
        });
        localStorage.setItem("access_token", null);
        localStorage.setItem("userPreferences", null);
      }
    };
    fetchUser();
  }, []);
  return (
    <div>
      {/* <ModalProvider /> */}
      <Sidebar>{children}</Sidebar>
      <Player />
    </div>
  );
};

export default Layout;
