import { FC } from "react";

export type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "custom";
  size?: "small" | "medium" | "large";
};

const Button: FC<TButtonProps> = ({
  children,
  className = "",
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false, // Add a default value for the disabled prop
  ...rest
}: TButtonProps) => {
  const buttonClasses = `px-3 py-2 text-sm rounded-lg ${className} ${
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-500"
      : variant === "secondary"
      ? "bg-gray-400 text-black hover:bg-gray-300 text-white"
      : variant === "danger"
      ? "bg-red-600 text-white hover:bg-red-500"
      : ""
  } ${size === "small" ? "text-xs" : size === "large" ? "text-lg" : ""} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`; // Add styles for disabled state

  return (
    <button {...rest} className={buttonClasses} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
