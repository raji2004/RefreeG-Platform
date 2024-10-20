import React from "react";

interface DividerProps {
  children?: React.ReactNode; // Optional text between the lines (default is "or")
}

const Divider: React.FC<DividerProps> = ({ children  }) => {
  return (
    <div className="flex items-center text-gray-400 gap-2 w-full">
      <div className="flex-grow h-[1px] bg-gray-300"></div>
      <div className="text-gray-400">{children}</div>
      <div className="flex-grow h-[1px] bg-gray-300"></div>
    </div>
  );
};

export default Divider;
