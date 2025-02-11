import Link from "next/link";
import { useContext, useState } from "react";

export default function Home() {
  const articles = [
    {
      title: "Breaking News: Noel making a repo 🧑‍💻",
      summary: "The tech industry is experiencing massive growth...",
      link: "#",
    },
    {
      title: "NVIDIA stocks keeps on dropping 📉",
      summary: "New AI models are reshaping industries...",
      link: "#",
    },
    {
      title: "YE BANNED FROM TWITTER 🚫",
      summary: "Scientists report that he is racist...",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-emerald-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">APPLEBLADET</h1>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="#" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                World
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Tech
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Sports
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <h2 className="text-xl font-semibold mb-4">Latest News</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <div key={index} className="card bg-white shadow-lg p-4 rounded-lg">
              <h3 className="text-lg font-bold">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.summary}</p>
              <Link
                href={article.link}
                className="text-blue-500 mt-2 inline-block"
              >
                Read more
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-emerald-900 text-white text-center p-4 mt-6">
        <p>&copy; 2025 APPLEBLADET. All rights reserved.</p>
      </footer>
    </div>
  );
}
