import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Notes App",
  description:
    "This app is built by ryudhis (Arya Yudhistira) for dibimbing internship test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-primary-bg min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
