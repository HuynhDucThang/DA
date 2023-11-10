"use client";

import { usePathname } from "next/navigation";
import { Header } from ".";

interface IProps {
  children: React.ReactNode;
}

export default function LayoutMain({ children }: IProps) {
  const pathName = usePathname();

  return pathName.split("/")[1] === "admin" ? (
    <div className="bg-[#151c2c] !text-white">{children}</div>
  ) : (
    <>
      <Header />
      {children}
    </>
  );
}
