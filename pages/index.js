import ArticleCard from "@/components/articleCard";
import Link from "next/link";

export async function getStaticProps() {
  const result = await fetch(
    `https://newsdata.io/api/1/latest?apikey=${process.env.DIN_API_NYCKEL}&language=en&category=top`
  );
  const data = await result.json();

  return {
    props: { news: data.results || [] },
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
      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Latest News</h2>
        <div className="flex flex-col items-center justify-center">
          {news.length > 0 ? (
            news.map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))
          ) : (
            <p>No news available at the moment.</p>
          )}
        </div>
      </main>
    </div>
  );
}
