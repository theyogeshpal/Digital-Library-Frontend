import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  BookOpen,
  Heart,
  ArrowRight,
  Star,
  SlidersHorizontal,
  Grid,
  List as ListIcon,
  Loader2,
  Bookmark,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Collection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 20;

  const [books, setBooks] = useState([]);
 
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(books.map((book) => book.category))];
    return ["All", ...uniqueCategories.sort()];
  }, [books]);

  const checkLoginAndNavigate = (bookId) => {
    const username = localStorage.getItem("Username");

    if (!username) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to view book details",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#4F46E5",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      navigate(`/book/${bookId}`);
    }
  };

  useEffect(() => {
    const getBooks = async () => {
      try {
        const bookdata = await axios.get(
          "https://digital-library-backend-jesb.onrender.com/book/show",
        );
        setBooks(bookdata.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    getBooks();
  }, []);
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, books]);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-white">
      {/* Search Hero Section */}
      <section className="relative pt-32 pb-20 bg-indigo-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[120%] bg-indigo-500/15 rounded-full blur-[80px] will-change-[filter]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[120%] bg-teal-500/10 rounded-full blur-[80px] will-change-[filter]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
              Explore the{" "}
              <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Archive
              </span>
            </h1>

            {/* Search Bar */}
            <div className="relative group max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-teal-500/10 rounded-2xl blur-lg group-hover:bg-teal-500/20 transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-2 flex items-center">
                <Search className="text-teal-400 ml-4" size={24} />
                <input
                  type="text"
                  placeholder="Search by title, author, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-white px-4 py-3 placeholder:text-gray-400 font-medium"
                />
                <button className="bg-teal-500 hover:bg-teal-400 text-indigo-950 px-8 py-3 rounded-xl font-black transition-all transform active:scale-95 shadow-lg shadow-teal-500/20">
                  Search
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-bold text-gray-300">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                {filteredBooks.length} Books Found
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                {categories.length - 1} Main Categories
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Grid Section */}
      <section className="py-12 bg-gray-50/50">
        <div className="container mx-auto px-4 lg:px-20">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-indigo-900 text-white shadow-xl shadow-indigo-200"
                      : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View & Sort Controls */}
            <div className="flex items-center gap-4 self-end">
              <div className="flex bg-white rounded-xl p-1 border border-gray-100">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-indigo-50 text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-indigo-50 text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <ListIcon size={20} />
                </button>
              </div>
              <div className="relative group">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-100 rounded-xl px-10 py-3 font-bold text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-100 cursor-pointer shadow-sm"
                >
                  <option>Latest</option>
                  <option>Popularity</option>
                  <option>Rating</option>
                  <option>Title (A-Z)</option>
                </select>
                <SlidersHorizontal
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600"
                  size={18}
                />
              </div>
            </div>
          </div>

          {/* Books Grid */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
                : "space-y-6"
            }
          >
            {currentBooks.map((book) => (
              <div
                key={book._id}
                className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 will-change-transform ${
                  viewMode === "list"
                    ? "flex flex-col md:flex-row h-auto md:h-64"
                    : ""
                }`}
              >
                {/* Book Image Cover */}
                <div
                  className={`relative overflow-hidden shrink-0 ${viewMode === "list" ? "w-full md:w-48" : "aspect-[3/4]"}`}
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors shadow-lg shadow-black/10 transform translate-y-[-10px] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300">
                    <Heart size={16} />
                  </button>
                  <div className="absolute bottom-3 left-3 right-3 transform translate-y-[20px] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => checkLoginAndNavigate(book._id)}
                      className="w-full py-2 bg-teal-500 text-indigo-950 rounded-lg text-xs font-black shadow-xl"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Book Info */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
                        {book.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-gray-600">
                        <Star
                          className="text-yellow-400 fill-yellow-400"
                          size={12}
                        />
                        {book.rating}
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-indigo-950 mb-1 group-hover:text-indigo-700 transition-colors line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2 font-medium">
                      By {book.author}
                    </p>
                    {viewMode === "list" && (
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-2xl line-clamp-2">
                        {book.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                      <BookOpen size={12} />
                      {book.reviews}
                    </div>
                    <button
                      onClick={() => checkLoginAndNavigate(book._id)}
                      className="flex items-center gap-1 text-indigo-600 font-bold text-xs hover:gap-2 transition-all"
                    >
                      Read
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredBooks.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-gray-300" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No matching archives found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or category filters to find what
                you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-8 px-8 py-3 bg-indigo-900 text-white rounded-2xl font-bold hover:bg-indigo-950 transition-all"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-12 h-12 rounded-xl font-bold text-sm transition-all ${
                      page === currentPage
                        ? "bg-indigo-900 text-white shadow-xl shadow-indigo-100"
                        : "bg-white text-gray-400 border border-gray-100 hover:border-indigo-100 hover:text-indigo-600"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      </section>

      {/* Recommended Section (Call to action) */}
      <section className="py-24 bg-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-500/5 rotate-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 lg:px-20 relative z-10 text-center">
          <Bookmark className="w-16 h-16 text-teal-400 mx-auto mb-8 opacity-20" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
            Can't find a specific resource?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light">
            Our curators are constantly expanding the archive. Request a special
            volume or access to restricted scholarly academic editions.
          </p>
          <button className="px-12 py-5 bg-teal-500 hover:bg-teal-400 text-indigo-950 rounded-2xl font-black shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95">
            Request Addition
          </button>
        </div>
      </section>
    </div>
  );
};

export default Collection;
