import Link from "next/link";

export default function ArticleCard({ article }) {
  return (
    <div className="w-full max-w-3xl p-4 mb-3 bg-white rounded-lg shadow-md relative">
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
      <h3 className="text-2xl font-bold">{article.title}</h3>
      <p className="text-sm text-gray-600">
        {article.description || "No description available."}
      </p>

      <Link
        href={`/article/${article.article_id}`}
        className="text-blue-500 mt-2 inline-block hover:underline"
      >
        Read more
      </Link>
    </div>
  );
}
