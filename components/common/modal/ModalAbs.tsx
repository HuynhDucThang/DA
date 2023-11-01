type IPosition = "top" | "left" | "bottom" | "right";

interface IProps {
  position?: IPosition;
  isOpen?: boolean;
  children: React.ReactNode;
  parentStyles?: string;
  subParentStyles?: string;
}

export default function ModalAbs({
  children,
  isOpen = false,
  parentStyles,
  subParentStyles,
}: IProps) {
  return (
    <div
      className={`absolute shadow-[rgba(0,_0,_0,_0.24)_0px_3px_6px] rounded-xl overflow-hidden bg-white transition-all duration-500 z-[100] ${
        !isOpen && "invisible opacity-0 hidden"
      } ${parentStyles}`}
    >
      <div className={`h-full ${subParentStyles}`}>{children}</div>
    </div>
  );
}
