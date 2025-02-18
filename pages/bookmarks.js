import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa"; 

export default function Bookmarks() { // state-variabel bookmarks för att hålla reda på de bokmärkta artiklarna
  const [bookmarks, setBookmarks] = useState([]);

  // Läser om det finns bookmarks sparade i localStorage
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(savedBookmarks);
  }, []);

  // Kontrollera om en artikel är bokmärkt med article_id och retunerar true/false.
  const isBookmarked = (article_id) => {
    return bookmarks.some((bookmark) => bookmark.article_id === article_id);
  };

  // Spara bokmärke i state-variabelen bookmarks
  const saveBookmark = (article) => {
    if (!isBookmarked(article.article_id)) {
      const updatedBookmarks = [...bookmarks, article];
      setBookmarks(updatedBookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks)); // uppdaterar bookmarks state och sparar den uppdaterade listan i localStorage 
    }
  };

  // Ta bort bokmärke
  const removeBookmark = (article_id) => {
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark.article_id !== article_id
    ); // Om bookmark.article_id inte matchar det angivna article_id, returneras true 
    // och bokmärket behålls. Om de är lika, returneras false och bokmärket tas bort.
    
    setBookmarks(updatedBookmarks); // uppdatera React-komponentens state med de uppdaterade bokmärkena. 
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks)); // sparar den uppdaterade listan av bokmärken i localStorage under nyckeln "bookmarks"
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Bokmärken</h2>
        <div className="flex flex-col items-center justify-center">
          {bookmarks.length > 0 ? (
            bookmarks.map((article) => (
              <div key={article.article_id} className="w-full max-w-3xl p-4 mb-3 bg-white">
                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="object-cover rounded-lg mb-3 mx-auto"
                  />
                )}
                <h3 className="text-2xl font-bold">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.description || "No description available."}</p>
                <Link href={`/article/${article.article_id}`} className="text-blue-500 mt-2 inline-block hover:underline">
                  Läs mer
                </Link>
                <button
                  className="pl-4"
                  onClick={() =>
                    isBookmarked(article.article_id)
                      ? removeBookmark(article.article_id)
                      : saveBookmark(article)
                  }
                >
                  {isBookmarked(article.article_id) ? (
                    <FaBookmark className="text-blue-500  hover:text-red-500" />
                  ) : (
                    <FaRegBookmark />
                  )}
                </button>
              </div>
            ))
          ) : (
            <p>Inga bokmärken sparade.</p>
          )}
        </div>
      </main>
    </div>
  );
}
