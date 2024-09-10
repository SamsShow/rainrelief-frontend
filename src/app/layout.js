"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import WalletButton from "./WalletButton";
import "./globals.css";
import Image from 'next/image';
import logo from './assets/logoO.png';
import { motion } from 'framer-motion';

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "RainRelief",
//   description: "Automated Rain Incentive System",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-900`}>
        <header className="bg-zinc-800 shadow-lg fixed w-full z-10">
          <div className="container mx-auto px-1">
            <div className="flex justify-between items-center py-1">
              <div className="flex items-center space-x-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image src={logo} alt="RainRelief Logo" width={100} height={40} className="w-20 h-20" />
                </motion.div>
                <nav className="hidden md:flex space-x-6">
                  <NavLink href="/">Home</NavLink>
                  <NavLink href="/Farmer">Farmers</NavLink>
                  <NavLink href="/Admin">Admin</NavLink>
                  <NavLink href="/Weather">Weather</NavLink>
                </nav>
              </div>
              <WalletButton />
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8 pt-24">{children}</main>
      </body>
    </html>
  );
}

function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="relative">
      <motion.span
        className={`text-sm font-medium ${isActive ? 'text-yellow-500' : 'text-gray-300'}`}
        whileHover={{ color: '#EAB308' }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      {isActive && (
        <motion.span
          className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-500"
          layoutId="underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
}