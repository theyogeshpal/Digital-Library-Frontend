import { createContext, useContext, useState } from 'react';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [books] = useState([
  { 
    "id": 1, 
    "title": "The Pragmatic Programmer", 
    "author": "Andrew Hunt, David Thomas", 
    "rating": 4.9, 
    "year": 2019, 
    "language": "English", 
    "pages": 352,
    "isbn": "978-0135957059",
    "cover": "https://books.google.com/books/content?id=9vS8EAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "pdfUrl": "https://www.pdfdrive.com/the-pragmatic-programmer-e158632778.html",
    "summary": "A guide to becoming a better programmer through practical advice and techniques.",
    "tags": ["Programming", "Software Development", "Best Practices"]
  },
  { 
    "id": 2, 
    "title": "Deep Learning", 
    "author": "Ian Goodfellow", 
    "rating": 4.8, 
    "year": 2016, 
    "language": "English", 
    "pages": 800,
    "isbn": "978-0262035613",
    "cover": "https://books.google.com/books/content?id=omivDQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "pdfUrl": "https://www.deeplearningbook.org/",
    "summary": "Comprehensive introduction to deep learning and neural networks.",
    "tags": ["AI", "Machine Learning", "Neural Networks"]
  },
  { 
    "id": 3, 
    "title": "Clean Code", 
    "author": "Robert C. Martin", 
    "rating": 4.9, 
    "year": 2008, 
    "language": "English", 
    "pages": 464,
    "isbn": "978-0132350884",
    "cover": "https://books.google.com/books/content?id=hjEFCAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "pdfUrl": "https://www.pdfdrive.com/clean-code-e158632779.html",
    "summary": "Learn to write clean, maintainable, and efficient code.",
    "tags": ["Programming", "Code Quality", "Software Engineering"]
  },
  { 
    "id": 4, 
    "title": "Atomic Habits", 
    "author": "James Clear", 
    "rating": 4.9, 
    "year": 2018, 
    "language": "English", 
    "pages": 320,
    "isbn": "978-0735211292",
    "cover": "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "pdfUrl": "https://www.pdfdrive.com/atomic-habits-e158632780.html",
    "summary": "Tiny changes, remarkable results - build good habits and break bad ones.",
    "tags": ["Self-Help", "Productivity", "Personal Development"]
  },
  { 
    "id": 5, 
    "title": "Eloquent JavaScript", 
    "author": "Marijn Haverbeke", 
    "rating": 4.7, 
    "year": 2018, 
    "language": "English", 
    "pages": 472,
    "isbn": "978-1593279509",
    "cover": "https://books.google.com/books/content?id=p99vDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "pdfUrl": "https://eloquentjavascript.net/Eloquent_JavaScript.pdf",
    "summary": "A modern introduction to programming with JavaScript.",
    "tags": ["JavaScript", "Web Development", "Programming"]
  },
  { 
    "id": 6, 
    "title": "You Don't Know JS Yet", 
    "author": "Kyle Simpson", 
    "rating": 4.8, 
    "year": 2020, 
    "language": "English", 
    "pages": 143,
    "isbn": "978-1484200766",
    "cover": "https://covers.openlibrary.org/b/id/14418659-L.jpg",
    "pdfUrl": "https://github.com/getify/You-Dont-Know-JS",
    "summary": "Deep dive into JavaScript core mechanisms and concepts.",
    "tags": ["JavaScript", "Advanced Programming", "Web Development"]
  },
  { 
    "id": 7, 
    "title": "The Psychology of Money", 
    "author": "Morgan Housel", 
    "rating": 4.8, 
    "year": 2020, 
    "language": "English", 
    "pages": 256,
    "isbn": "978-0857197689",
    "cover": "https://covers.openlibrary.org/b/id/10355153-L.jpg",
    "pdfUrl": "https://www.pdfdrive.com/psychology-of-money-e158632781.html",
    "summary": "Timeless lessons on wealth, greed, and happiness.",
    "tags": ["Finance", "Psychology", "Personal Finance"]
  },
  { 
    "id": 8, 
    "title": "Zero to One", 
    "author": "Peter Thiel", 
    "rating": 4.6, 
    "year": 2014, 
    "language": "English", 
    "pages": 224,
    "isbn": "978-0804139298",
    "cover": "https://books.google.com/books/content?id=Id9OAwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "pdfUrl": "https://www.pdfdrive.com/zero-to-one-e158632782.html",
    "summary": "Notes on startups, or how to build the future.",
    "tags": ["Business", "Startups", "Entrepreneurship"]
  },
  { 
    "id": 9, 
    "title": "Introduction to Algorithms", 
    "author": "Thomas H. Cormen", 
    "rating": 4.7, 
    "year": 2022, 
    "language": "English", 
    "pages": 1312,
    "isbn": "978-0262046305",
    "cover": "https://books.google.com/books/content?id=vS9REAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "pdfUrl": "https://www.pdfdrive.com/introduction-to-algorithms-e158632783.html",
    "summary": "Comprehensive guide to algorithms and data structures.",
    "tags": ["Algorithms", "Computer Science", "Data Structures"]
  },
  { 
    "id": 10, 
    "title": "Designing Data-Intensive Applications", 
    "author": "Martin Kleppmann", 
    "rating": 4.9, 
    "year": 2017, 
    "language": "English", 
    "pages": 616,
    "isbn": "978-1449373320",
    "cover": "https://books.google.com/books/content?id=Z_u_DQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "pdfUrl": "https://www.pdfdrive.com/designing-data-intensive-applications-e158632784.html",
    "summary": "The big ideas behind reliable, scalable, and maintainable systems.",
    "tags": ["System Design", "Databases", "Distributed Systems"]
  }
]);

  const [wishlist, setWishlist] = useState([]);
  const [currentReads, setCurrentReads] = useState([]);

  const addToWishlist = (bookId) => {
    if (!wishlist.includes(bookId)) {
      setWishlist([...wishlist, bookId]);
    }
  };

  const removeFromWishlist = (bookId) => {
    setWishlist(wishlist.filter(id => id !== bookId));
  };

  const addToCurrentReads = (bookId) => {
    if (!currentReads.find(item => item.id === bookId)) {
      setCurrentReads([...currentReads, { id: bookId, progress: 0 }]);
    }
  };

  const updateProgress = (bookId, progress) => {
    setCurrentReads(currentReads.map(item => 
      item.id === bookId ? { ...item, progress } : item
    ));
  };

  return (
    <LibraryContext.Provider value={{ 
      books, 
      wishlist, 
      currentReads,
      addToWishlist, 
      removeFromWishlist,
      addToCurrentReads,
      updateProgress
    }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);
