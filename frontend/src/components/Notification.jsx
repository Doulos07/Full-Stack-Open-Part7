import "../styles/notification.css";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const Notification = () => {
  const { notification } = useContext(NotificationContext);
  console.log(notification);
  if (!notification) return null;

  return (
    <div className={`notification ${notification.type}`}>
      <h3>{notification.message}</h3>
    </div>
  );
};

export default Notification;
