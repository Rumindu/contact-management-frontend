import React from "react";

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  variant: "edit" | "delete";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  variant,
}) => {
  const bgColor =
    variant === "edit"
      ? "bg-blue-500 hover:bg-blue-700"
      : "bg-red-500 hover:bg-red-700";

  return (
    <button
      className={`${bgColor} text-white font-bold py-1 px-3 rounded text-sm`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ActionButton;
