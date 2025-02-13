import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaGlobe, FaMicrochip, FaFutbol } from "react-icons/fa";

export default function Header() {
  const router = useRouter();

  const isActive = (pathname) => router.asPath === pathname;

  // Define category links dynamically
  const categories = [
    { name: "World", slug: "world", icon: <FaGlobe /> },
    { name: "Tech", slug: "technology", icon: <FaMicrochip /> },
    { name: "Sports", slug: "sports", icon: <FaFutbol /> },
  ];

  return (
    <header className="bg-emerald-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">APPLEBLADET</h1>
      <nav>
        <ul className="flex gap-4">
          {/* Home Link */}
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

          {/* Category Links */}
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/category/${category.slug}`}
                className={`hover:underline flex items-center gap-2 ${
                  isActive(`/category/${category.slug}`) ? "font-bold" : ""
                }`}
              >
                {category.icon}
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
