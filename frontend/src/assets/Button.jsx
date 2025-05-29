import React from "react";
import { cn } from "../assets/ีutils/tw-merge";

export const ButtonVariant = {
  FILL_ROUND: "fill-round",
  OUTLINE: "outline",
  DEFAULT: "default",
};

export default function Button({
  children,
  className,
  variant = ButtonVariant.DEFAULT,
  ...props
}) {
  const variants = {
    [ButtonVariant.FILL_ROUND]: "rounded-full",
    [ButtonVariant.OUTLINE]: "border border-[#3C9AFB]",
    [ButtonVariant.DEFAULT]: "bg-[#7DB5E3]",
  };

  return (
    <button
      className={cn(
        "flex items-center justify-center p-2.75 px-5 rounded-lg font-light cursor-pointer disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}