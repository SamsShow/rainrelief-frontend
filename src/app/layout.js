import { Inter } from "next/font/google";
import Link from "next/link";
import WalletButton from "./WalletButton"; // Import the client-side wallet button
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RainRelief",
  description: "Automated Rain Incentive System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-900`}>
        <header className="bg-zinc-900 p-4 shadow-lg flex justify-between items-center">
          <nav className="space-x-4">
            <Link href="/" className="text-white hover:text-yellow-500">
              Home
            </Link>
            <Link href="/Farmer" className="text-white hover:text-yellow-500">
              Farmers
            </Link>
            <Link href="/Admin" className="text-white hover:text-yellow-500">
              Admin
            </Link>
            <Link href="/Weather" className="text-white hover:text-yellow-500">
              Weather
            </Link>
          </nav>
          <WalletButton />
        </header>
        <main className="p-8">{children}</main>
      </body>
    </html>
  );
}
  