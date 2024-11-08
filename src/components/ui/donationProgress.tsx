import React from "react"; // Import React library for building components

// Define interface for the component props
interface DonationProgressProps {
  currentAmount: number; // Current donation amount
  goalAmount: number; // Donation goal amount
}

// Functional component to display the donation progress bar
const DonationProgress: React.FC<DonationProgressProps> = ({
  currentAmount,
  goalAmount,
}) => {
  // Calculate the donation progress percentage
  const progressPercentage = (currentAmount / goalAmount) * 100;

  // Determine if the goal is reached and set the color accordingly
  const isGoalReached = progressPercentage >= 100;
  const progressBarColor = isGoalReached
    ? "bg-green-600" // Red if goal is exceeded
    : progressPercentage > 50
    ? "bg-gradient-to-r from-blue-500 to-blue-800" // Gradient for over 50% progress
    : "bg-blue-600"; // Blue for less than 50% progress

  // Limit the width to 100% when the goal is reached or exceeded
  const progressBarWidth = isGoalReached ? "100%" : `${progressPercentage}%`;

  return (
    <div>
      {/* Background for the progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        {/* Foreground of the progress bar with dynamic color and width */}
        <div
          className={`${progressBarColor} h-2.5 rounded-full`}
          style={{ width: progressBarWidth }} // Set the width dynamically
        ></div>
      </div>
    </div>
  );
};

export default DonationProgress; // Export the component for use in other files
