import React from "react";
import cn from "classnames";

export const PrimaryButton = ({
  text,
  onClick,
  className,
  icon,
  buttonType,
}) => {
  return (
    <button
      type={buttonType}
      className={cn(["btn btn-primary", className])}
      onClick={onClick}
    >
      {icon && <span className="svg-icon menu-icon">{icon}</span>}
      {text}
    </button>
  );
};
export const SecondaryButton = ({
  text,
  onClick,
  className,
  icon,
  buttonType,
}) => {
  return (
    <button
      type={buttonType}
      className={cn(["btn btn-secondary", className])}
      onClick={onClick}
    >
      {icon && <span className="svg-icon menu-icon">{icon}</span>}
      {text}
    </button>
  );
};
export const SuccessButton = ({
  text,
  onClick,
  className,
  icon,
  buttonType,
}) => {
  return (
    <button
      type={buttonType}
      className={cn(["btn btn-success", className])}
      onClick={onClick}
    >
      {icon && <span className="svg-icon menu-icon">{icon}</span>}
      {text}
    </button>
  );
};
export const WarningButton = ({
  text,
  onClick,
  className,
  icon,
  buttonType,
}) => {
  return (
    <button
      type={buttonType}
      className={cn(["btn btn-warning", className])}
      onClick={onClick}
    >
      {icon && <span className="svg-icon menu-icon">{icon}</span>}
      {text}
    </button>
  );
};
export const InfoButton = ({ text, onClick, className, icon, buttonType }) => {
  return (
    <button
      type={buttonType}
      className={cn(["btn btn-info", className])}
      onClick={onClick}
    >
      {icon && <span className="svg-icon menu-icon">{icon}</span>}
      {text}
    </button>
  );
};

export const LightButton = ({ text, onClick, className, icon, buttonType }) => {
  return (
    <button
      type={buttonType}
      className={cn(["btn btn-light", className])}
      onClick={onClick}
    >
      {icon && <span className="svg-icon menu-icon">{icon}</span>}
      {text}
    </button>
  );
};
export const DarkButton = ({ text, onClick, className, icon, buttonType }) => {
  return (
    <button
      type={buttonType}
      className={cn(["btn btn-dark", className])}
      onClick={onClick}
    >
      {icon && <span className="svg-icon menu-icon">{icon}</span>}
      {text}
    </button>
  );
};

export const BaseButton = ({ text, onClick, className, icon, buttonType }) => {
  return (
    <button
      type={buttonType}
      className={cn(["btn", className])}
      onClick={onClick}
    >
      {icon && <span className="svg-icon menu-icon">{icon}</span>}
      {text}
    </button>
  );
};

export default function Button({
  text,
  onClick,
  type = "primary",
  buttonType = "button",
  className,
  icon,
}) {
  if (type === "primary") {
    return (
      <PrimaryButton
        text={text}
        onClick={onClick}
        className={className}
        icon={icon}
        buttonType={buttonType}
      />
    );
  } else if (type === "secondary") {
    return (
      <SecondaryButton
        text={text}
        onClick={onClick}
        className={className}
        icon={icon}
        buttonType={buttonType}
      />
    );
  } else if (type === "success") {
    return (
      <SuccessButton
        text={text}
        onClick={onClick}
        className={className}
        icon={icon}
        buttonType={buttonType}
      />
    );
  } else if (type === "warning") {
    return (
      <WarningButton
        text={text}
        onClick={onClick}
        className={className}
        icon={icon}
        buttonType={buttonType}
      />
    );
  } else if (type === "info") {
    return (
      <InfoButton
        text={text}
        onClick={onClick}
        className={className}
        icon={icon}
        buttonType={buttonType}
      />
    );
  } else if (type === "light") {
    return (
      <LightButton
        text={text}
        onClick={onClick}
        className={className}
        icon={icon}
        buttonType={buttonType}
      />
    );
  } else if (type === "dark") {
    return (
      <DarkButton
        text={text}
        onClick={onClick}
        className={className}
        icon={icon}
        buttonType={buttonType}
      />
    );
  } else if (type === "base") {
    return (
      <BaseButton
        text={text}
        onClick={onClick}
        className={className}
        icon={icon}
        buttonType={buttonType}
      />
    );
  }
}
