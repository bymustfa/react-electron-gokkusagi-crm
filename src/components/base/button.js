import React from "react";
import cn from "classnames";

export const PrimaryButton = ({ text, onClick, className, icon }) => {
  return (
    <button className={cn(["btn btn-primary", className])} onClick={onClick}>
      {icon && icon}
      {text}
    </button>
  );
};
export const SecondaryButton = ({ text, onClick, className, icon }) => {
  return (
    <button className={cn(["btn btn-secondary", className])} onClick={onClick}>
      {icon && icon}
      {text}
    </button>
  );
};
export const SuccessButton = ({ text, onClick, className, icon }) => {
  return (
    <button className={cn(["btn btn-success", className])} onClick={onClick}>
      {icon && icon}
      {text}
    </button>
  );
};
export const WarningButton = ({ text, onClick, className, icon }) => {
  return (
    <button className={cn(["btn btn-warning", className])} onClick={onClick}>
      {icon && icon}
      {text}
    </button>
  );
};

export const LightButton = ({ text, onClick, className, icon }) => {
  return (
    <button className={cn(["btn btn-light", className])} onClick={onClick}>
      {icon && icon}
      {text}
    </button>
  );
};
export const DarkButton = ({ text, onClick, className, icon }) => {
  return (
    <button className={cn(["btn btn-dark", className])} onClick={onClick}>
      {icon && icon}
      {text}
    </button>
  );
};

export default function Button({
  text,
  onClick,
  type = "primary",
  className,
  icon,
}) {
  switch (type) {
    case "primary":
      return (
        <PrimaryButton
          text={text}
          onClick={onClick}
          className={className}
          icon={icon}
        />
      );
      break;

    case "secondary":
      return (
        <SecondaryButton
          text={text}
          onClick={onClick}
          className={className}
          icon={icon}
        />
      );
      break;

    case "success":
      return (
        <SuccessButton
          text={text}
          onClick={onClick}
          className={className}
          icon={icon}
        />
      );
      break;
    case "warning":
      return (
        <WarningButton
          text={text}
          onClick={onClick}
          className={className}
          icon={icon}
        />
      );
      break;
    case "light":
      return (
        <LightButton
          text={text}
          onClick={onClick}
          className={className}
          icon={icon}
        />
      );
      break;
    case "dark":
      return (
        <DarkButton
          text={text}
          onClick={onClick}
          className={className}
          icon={icon}
        />
      );
      break;
  }
}
