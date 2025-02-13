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

  try {
    const result = await fetch(
      `https://newsdata.io/api/1/news?apikey=${process.env.DIN_API_NYCKEL}&language=en&category=${category}`
    );
    const data = await result.json();

    if (!Array.isArray(data.results)) {
      console.error("Unexpected API response:", data);
      return { notFound: true };
    }

    return {
      props: { news: data.results, category },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching category articles:", error);
    return { notFound: true };
  }
}

export default function CategoryPage({ news, category }) {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center capitalize">
        {category} News
      </h1>
      <Link
        href="/"
        className="text-blue-500 mb-4 inline-block hover:underline"
      >
        ← Back to Home
      </Link>

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
          <p className="text-gray-500">No news available at the moment.</p>
        )}
      </div>
    </main>
  );
}
