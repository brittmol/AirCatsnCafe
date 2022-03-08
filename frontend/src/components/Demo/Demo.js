import React from "react";
import { useDispatch} from "react-redux";
import { login } from "../../store/session"

const DemoUser = () => {
  const dispatch = useDispatch();
  const demoLogin = () => {
    dispatch(
      login({
        credential: "demo@user.io",
        password: "password",
      })
    );
  };
  return (
    <button className="profile-buttons" onClick={demoLogin}>
      <i className="fas fa-user-circle"></i>
      Demo User
    </button>
  )
};
export default DemoUser;
