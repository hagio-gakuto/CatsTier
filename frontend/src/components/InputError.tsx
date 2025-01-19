import React from "react";

// Propsの型を定義
interface InputErrorProps {
  message: string;
}

const InputError: React.FC<InputErrorProps> = ({ message }) => {
  return <span className="text-xs text-red-600">{message}</span>;
};

export default InputError;
