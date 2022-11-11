import { MouseEvent } from "react";
import "./Button.scss";

interface IButtonProps {
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  id?: string;
  children?: React.ReactNode;
  onClick?: (event: MouseEvent) => void;
}

const Button: React.FC<IButtonProps> = (props) => {
  return (
    <button {...props} className={`game-button ${props.className}`}>
      {props.children}
    </button>
  );
};

export default Button;
