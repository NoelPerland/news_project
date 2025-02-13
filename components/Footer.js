import { FaTwitter, FaNewspaper } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-white text-center p-4 mt-6">
      <div className="flex justify-center items-center gap-4">
        <p>&copy; 2025 APPLEBLADET. All rights reserved.</p>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-400"
        >
          <FaTwitter size={20} />
        </a>
        <a href="#" className="hover:text-emerald-400">
          <FaNewspaper size={20} />
        </a>
      </div>
    </footer>
  );
}
