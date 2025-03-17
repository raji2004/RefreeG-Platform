import NotificationItem from "@/components/NotificationItem"; // Import the new component
import Link from "next/link";

const Notifications = () => {
  const notifications = [
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
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Notification Center</h1>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-gray-600 mb-4">
            You have no saved notifications at this time 🙂
          </p>
          <Link href="/">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Browse Causes →
            </button>
          </Link>
        </div>
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
