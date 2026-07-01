import "../styles/form.css";
import { useField } from "../hooks";
import { useContext } from "react";
import UserContext from "../UserContext";

const LoginForm = () => {
  const [username, usernameReset] = useField("text");
  const [password, passwordReset] = useField("password");
  const { login } = useContext(UserContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    login({ username: username.value, password: password.value });
    usernameReset();
    passwordReset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-content-input">
          Username
          <input data-testid="username" {...username} />
        </div>
        <div className="form-content-input">
          Password
          <input data-testid="password" {...password} />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
