import { createContext, useReducer, useEffect, useContext } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import NotificationContext from "./NotificationContext";

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "USER/LOGIN":
      return action.payload;
    case "USER/LOGOUT":
      return null;
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null);
  const { notify } = useContext(NotificationContext);
  useEffect(() => {
    const logged = globalThis.localStorage.getItem("logged");
    if (logged) {
      const userData = JSON.parse(logged);
      blogService.setToken(userData.token);
      dispatch({ type: "USER/LOGIN", payload: userData });
    }
  }, []);

  const login = async ({ username, password }) => {
    try {
      const userData = await loginService.login(username, password);
      globalThis.localStorage.setItem("logged", JSON.stringify(userData));
      blogService.setToken(userData.token);
      dispatch({ type: "USER/LOGIN", payload: userData });
    } catch (error) {
      notify({ message: error.response.data.error, type: "error" });
    }
  };

  const logout = () => {
    globalThis.localStorage.removeItem("logged");
    dispatch({ type: "USER/LOGOUT" });
  };

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

export default UserContext;
