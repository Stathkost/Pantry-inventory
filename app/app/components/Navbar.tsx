"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiHome2Line,
  RiAddCircleLine,
  RiDeleteBinLine,
  RiSettingsLine,
  RiInformationLine,
} from "react-icons/ri";

const navigationLinks = [
  { path: "/", text: "MyPantry", icon: <RiHome2Line /> },
  { path: "/enlist", text: "Enlist", icon: <RiAddCircleLine /> },
  { path: "/manage", text: "Manage", icon: <RiDeleteBinLine /> },
  { path: "/settings", text: "Settings", icon: <RiSettingsLine /> },
  { path: "/about", text: "About", icon: <RiInformationLine /> },
];

function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-gray-200 p-4 flex justify-center items-center relative">
      <ul className="flex space-x-4">
        {navigationLinks.map((link) => (
          <li key={link.path}>
            <Link
              href={link.path}
              className={`${
                pathname === link.path ? "text-blue-500" : "text-gray-700"
              } flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-100`}
            >
              {link.icon}
              <span>{link.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
