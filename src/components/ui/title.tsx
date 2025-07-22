import { FC, ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
  className?: string;
}

const Title: FC<TitleProps> = ({ children, className = "" }) => {
  return (
    <div className={`mb-12 text-center ${className}`}>
      <div className="text-3xl font-bold text-gray-900 sm:text-4xl">
        {children}
      </div>
    </div>
  );
};

export default Title; 