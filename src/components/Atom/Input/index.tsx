import "./Input.scss";

interface IInputProps {
  className?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  id?: string;
  children?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInputProps> = (props) => {
  return <input {...props} className={`game-input ${props.className}`} />;
};

export default Input;
