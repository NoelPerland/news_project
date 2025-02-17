import ArticleCard from "@/components/articleCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";


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
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Latest News</h2>
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
            <p>No news available at the moment.</p>
          )}
        </div>
      </main>
    </div>
  );
}
