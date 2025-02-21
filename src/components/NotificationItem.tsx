import React from "react";

interface NotificationProps {
  message: string;
}

const NotificationItem: React.FC<NotificationProps> = ({ message }) => {
  return (
    <div className="border p-4 mb-2 bg-white rounded shadow-sm">
      <p>{message}</p>
    </div>
  );
};

export default NotificationItem;
