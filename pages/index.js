import Link from "next/link";

export async function getStaticProps() {
  const result = await fetch(
    `https://newsdata.io/api/1/news?apikey=${process.env.DIN_API_NYCKEL}&language=en&category=top`
  );
  const data = await result.json();

  return {
    props: { news: data.results || [] }, // Ensure there's always an array
    revalidate: 60,
  };
}

export default function Home({ news }) {
  const categories = [
    "world",
    "technology",
    "sports",
    "business",
    "entertainment",
    "health",
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-emerald-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">APPLEBLADET</h1>
        <nav>
          <ul className="flex gap-4">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/category/${category}`}
                  className="hover:underline capitalize"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Latest News</h2>
        <div className="flex flex-col items-center justify-center">
          {news.length > 0 ? (
            news.map((article) => (
              <div
                key={article.article_id}
                className="w-full max-w-3xl p-4 mb-1 bg-white"
              >
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
            ))
          ) : (
            <p>No news available at the moment.</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-emerald-900 text-white text-center p-4 mt-6">
        <p>&copy; 2025 APPLEBLADET. All rights reserved.</p>
      </footer>
    </div>
  );
}
