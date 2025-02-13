import Link from "next/link";

export async function getStaticPaths() {
  const result = await fetch(
    `https://newsdata.io/api/1/news?apikey=${process.env.DIN_API_NYCKEL}&language=en`
  );
  const data = await result.json();

  if (!Array.isArray(data.results)) {
    console.error("Unexpected API response:", data);
    return { paths: [], fallback: "blocking" };
  }

  const paths = data.results.map((article) => ({
    params: { articleId: article.article_id },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  try {
    const result = await fetch(
      `https://newsdata.io/api/1/news?apikey=${process.env.DIN_API_NYCKEL}&language=en`
    );
    const data = await result.json();

    if (!Array.isArray(data.results)) {
      return { notFound: true };
    }

    const article = data.results.find((a) => a.article_id === params.articleId);

    if (!article) {
      return { notFound: true };
    }

    return {
      props: { article },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return { notFound: true };
  }
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
          {article.description || "No description available."}
        </p>
      </div>
    </div>
  );
}
