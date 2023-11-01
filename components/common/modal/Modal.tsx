import Image from "next/image";

interface IProps {
  isOpen?: boolean;
  children: React.ReactNode;
  commonStyles?: string;
  title?: string;
  handleCloseModal: () => void;
}

export default function Modal({
  title,
  isOpen,
  children,
  commonStyles,
  handleCloseModal,
}: IProps) {
  return (
    <div
      className={`fixed top-0 left-0 w-[100vw] h-[100vh] flex_center z-[1000] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_6px] ${
        !isOpen && "invisible opacity-0 hidden"
      }`}
    >
      <div
        className={`w-full rounded-xl bg-white ${commonStyles}`}
      >
        {title ? (
          <div className="relative py-4 border-b-2 text-center">
            <Image
              src="/close_black.svg"
              alt="close_black icon"
              width={30}
              height={30}
              className="absolute top-3 left-3 hover:bg-c-border transition-colors rounded-full p-1 box-content"
              onClick={handleCloseModal}
            />
            <p className="text-xl text-primary font-medium">{title}</p>
          </div>
        ) : null}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
