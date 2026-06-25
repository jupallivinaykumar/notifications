import { useEffect } from "react";

function NotificationPermission() {
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  return null;
}

export default NotificationPermission;
