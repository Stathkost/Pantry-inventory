import "../globals.css";
import { Inter } from "next/font/google";

import App from "./App";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pantryinventory",
  description: "Developed with 🤍 by Konstantinosstath!",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${inter.className} h-screen flex flex-col bg-gray-100`}>
        <App>{children}</App>
      </body>
    </html>
  );
}
