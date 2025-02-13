import Link from "next/link";

export async function getStaticPaths() {
  const categories = [
    "business",
    "sports",
    "entertainment",
    "technology",
    "health",
  ];

  const paths = categories.map((category) => ({
    params: { category },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { category } = params;

  const result = await fetch(
    `https://newsdata.io/api/1/news?apikey=${process.env.DIN_API_NYCKEL}&language=en&category=${category}`
  );
  const data = await result.json();

  return {
    props: { news: data.results, category },
    revalidate: 60,
  };
}

export default function CategoryPage({ news, category }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-4 capitalize">{category} News</h1>
      <Link href="/" className="text-blue-500 mb-4 hover:underline">
        ← Back to Home
      </Link>

      {news.map((article) => (
        <div
          key={article.article_id}
          className="w-full max-w-lg p-4 border rounded-lg shadow-lg mb-6"
        >
          <h2 className="text-xl font-semibold mb-2">
            <Link
              href={`/article/${article.article_id}`}
              className="text-blue-600 hover:underline"
            >
              {article.title}
            </Link>
          </h2>
          {article.image_url && (
            <img
              className="w-full rounded-lg"
              src={article.image_url}
              alt={article.title}
            />
          )}
        </div>
      ))}
    </div>
  );
}
