import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  FaHome,
  FaGlobe,
  FaBusinessTime,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { IoFitness } from "react-icons/io5";
import { TbDeviceDesktopCog } from "react-icons/tb";
import { IoMdFootball } from "react-icons/io";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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
    <header className="bg-emerald-600 text-white">
      <div className="w-full px-4 flex items-center justify-between h-20">
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/Apple-LOGO.png"
              alt="Applebladet Logo"
              width={190}
              height={50}
              priority
            />
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 justify-center">
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

        <nav className="hidden md:flex flex-1 justify-end">
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

        <div className="md:hidden flex items-center justify-end">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="text-white"
          >
            {menuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-emerald-600 z-50">
          <ul className="flex flex-col items-center gap-4 p-4">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  onClick={() => setMenuOpen(false)}
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
            <li>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`hover:underline flex items-center gap-2 ${
                  isActive("/") ? "font-bold" : ""
                }`}
              >
                <FaHome className="w-5 h-5" />
                Home
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
