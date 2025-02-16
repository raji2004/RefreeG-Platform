"use client"
import React, { useState } from "react";
import NotificationItem from "../../../../components/NotificationItem"; // Import the new component

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "donation",
      message:
        "You just received a donation of ₦200,000.00 from Jake at 9:45pm (WAT)",
    },
    {
      id: 2,
      type: "message",
      message:
        'You just received a message: "So what else do you need for this cause?"',
    },
  ]);

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4">Notification Center</h1>

      {notifications.length === 0 ? (
        <p>You have no new notifications at this time :)</p>
      ) : (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            message={notification.message}
          />
        ))
      )}
    </div>
  );
};

export default Notifications;
