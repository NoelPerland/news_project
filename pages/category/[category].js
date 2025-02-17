import ArticleCard from "@/components/articleCard";
import Link from "next/link";
import { useEffect, useState, } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

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


const [bookmarks, setBookmarks] = useState([]);

// Spara bokmärken i localStorage, Utan denna kod skulle bokmärkena försvinna när sidan laddas om 
useEffect(() => {

  const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  setBookmarks(savedBookmarks);
}, []);

// kontrollerar om en artikel är bokmärkt genom att jämföra artikelns article_id med de bokmärken som finns sparade i listan bookmarks i useState. 
const isBookmarked = (article_id) => {
      return bookmarks.some((bookmark) => bookmark.article_id === article_id);
};

// sparar en artikel som bokmärke
const saveBookmark = (article) => {
  if (!isBookmarked(article.article_id)) {    // Om artikeln inte är bokmärkt, skapar vi en ny lista av bokmärken
      const updatedBookmarks = [...bookmarks, article];
      setBookmarks(updatedBookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
}
}
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center capitalize">
        {category} News
      </h1>
      <div className="flex flex-col items-center justify-center">
        {news.length > 0 ? (
          news.map((article) => (
            <> 
            <ArticleCard key={article.article_id} article={article} />

            <button className="pl-4" onClick={() => saveBookmark(article)}>
            {isBookmarked(article.article_id) ? (
              <FaBookmark className="text-blue-500" />) : ( <FaRegBookmark /> )} </button> 
              </>
          ))
        ) : (
          <p className="text-gray-500">No news available at the moment.</p>
        )}
      </div>
    </main>
  );
}
