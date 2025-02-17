import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaGlobe, FaMicrochip, FaBusinessTime } from "react-icons/fa";
import { IoFitness } from "react-icons/io5";
import { FaFutbol } from "react-icons/fa6";
import { TbDeviceDesktopCog } from "react-icons/tb";
import { IoMdFootball } from "react-icons/io";

export default function Header() {
  const router = useRouter();
  const isActive = (pathname) => router.asPath === pathname;

  const categories = [
    { name: "World", slug: "world", icon: <FaGlobe /> },
    { name: "Tech", slug: "technology", icon: <TbDeviceDesktopCog /> },
    { name: "Sports", slug: "sports", icon: <IoMdFootball /> },
    { name: "Health", slug: "health", icon: <IoFitness /> },
    { name: "Business", slug: "business", icon: <FaBusinessTime /> },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr] h-22">
      <header className="bg-emerald-600 text-white p-4 flex justify-between items-center w-full">
        {/* Left Section - Logo */}
        <div className="flex-1">
          <Link href="/" className="text-2xl font-bold hover:underline">
            APPLEBLADET
          </Link>
        </div>

        {/* Center Section - Category Links */}
        <nav className="flex-1 flex justify-center">
          <ul className="flex gap-12">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className={`hover:underline flex items-center gap-2 ${
                    isActive(`/category/${category.slug}`)
                      ? "font-bold underline"
                      : ""
                  }`}
                >
                  {React.cloneElement(category.icon, { className: "w-6 h-6" })}
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section - Home Link */}
        <nav className="flex-1 flex justify-end">
          <ul className="flex gap-12">
            <li>
              <Link
                href="/"
                className={`hover:underline flex items-center gap-2 ${
                  isActive("/") ? "font-bold" : ""
                }`}
              >
                <FaHome className="w-5 h-5" />
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
