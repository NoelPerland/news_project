import Link from "next/link";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";


export default function ArticleCard({ article, saveBookmark, isBookmarked }) {
  return (
    <div className="w-full max-w-3xl p-4 mb-3 bg-white rounded-lg shadow-md relative pt-8">
      {article.pubDate && (
        <p className="absolute top-2 right-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md">
          {new Date(article.pubDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      )}

      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          width={500}
          className="object-cover rounded-lg mb-3 mx-auto"
        />
      )}

      <h3 className="text-2xl font-bold mt-2">{article.title}</h3>

      <p className="text-sm text-gray-600">
        {article.description || "No description available."}
      </p>

      <Link
        href={`/article/${article.article_id}`}
        className="text-blue-500 mt-2 inline-block hover:underline"
      >
        Read more
      </Link>

      <button
        className="absolute top-2 left-2 p-2"
        onClick={() => saveBookmark(article)} // Använd saveBookmark-funktionen från props
      >
        {isBookmarked(article.article_id) ? (
          <FaBookmark className="text-blue-500" />
        ) : (
          <FaRegBookmark />
        )}
      </button>

    </div>
  );
}
