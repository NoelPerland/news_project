import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaHome, FaGlobe, FaBusinessTime } from "react-icons/fa";
import { IoFitness } from "react-icons/io5";
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
<<<<<<< HEAD
      <header className="bg-emerald-600 text-white p-4 flex justify-between items-center w-full h-20">
        {/* Left Section - Logo */}
=======
      <header className="bg-emerald-600 text-white p-4 flex justify-between items-center w-full">
>>>>>>> 9200ad436c9d20574915e9f653e0b5d75fe6349a
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
<<<<<<< HEAD
        {/* Center Section - Category Links */}
=======

>>>>>>> 9200ad436c9d20574915e9f653e0b5d75fe6349a
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
