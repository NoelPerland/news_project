export async function getStaticPaths() {
  const categories = [
    "business",
    "sports",
    "entertainment",
    "technology",
    "health",
  ];

  let allArticles = [];
  for (const category of categories) {
    const result = await fetch(
      `https://newsdata.io/api/1/news?apikey=${process.env.DIN_API_NYCKEL}&language=en&category=${category}`
    );
    const data = await result.json();
    allArticles = [...allArticles, ...data.results];
  }

  const paths = allArticles.map((article) => ({
    params: { articleId: article.article_id },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const categories = [
    "business",
    "sports",
    "entertainment",
    "technology",
    "health",
  ];

  let article = null;
  for (const category of categories) {
    const result = await fetch(
      `https://newsdata.io/api/1/news?apikey=${process.env.DIN_API_NYCKEL}&language=en&category=${category}`
    );
    const data = await result.json();

    article = data.results.find((a) => a.article_id === params.articleId);
    if (article) break;
  }

  return {
    props: { article },
    revalidate: 60,
  };
}

export default function Article({ article }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-2xl p-6 border rounded-lg shadow-lg bg-white">
        <h1 className="text-3xl font-bold mb-4 text-center">{article.title}</h1>
        {article.image_url && (
          <img
            className="w-[400px] mx-auto block rounded-lg mb-4"
            src={article.image_url}
            alt={article.title}
          />
        )}
        <p className="text-lg leading-relaxed text-gray-700">
          {article.description}
        </p>
      </div>
    </div>
  );
}
