import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { Footer, Header } from "@/components/layouts";
import ReduxProvider from "@/components/layouts/ReduxProvider";
import LayoutMain from "@/components/layouts/LayoutMain";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Nhà nghĩ dưỡng và căn hộ cao cấp cho thuê.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <LayoutMain>{children}</LayoutMain>
        </ReduxProvider>
      </body>
    </html>
  );
}
