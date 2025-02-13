import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaGlobe, FaMicrochip, FaFutbol } from "react-icons/fa";

export default function Header() {
  const router = useRouter();

  const isActive = (pathname) => router.pathname === pathname;

  return (
    <header className="bg-emerald-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">APPLEBLADET</h1>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link
              href="/"
              className={`hover:underline flex items-center gap-2 ${
                isActive("/") ? "font-bold" : ""
              }`}
            >
              <FaHome />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/world"
              className={`hover:underline flex items-center gap-2 ${
                isActive("/world") ? "font-bold" : ""
              }`}
            >
              <FaGlobe />
              World
            </Link>
          </li>
          <li>
            <Link
              href="/tech"
              className={`hover:underline flex items-center gap-2 ${
                isActive("/tech") ? "font-bold" : ""
              }`}
            >
              <FaMicrochip />
              Tech
            </Link>
          </li>
          <li>
            <Link
              href="/sports"
              className={`hover:underline flex items-center gap-2 ${
                isActive("/sports") ? "font-bold" : ""
              }`}
            >
              <FaFutbol />
              Sports
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
