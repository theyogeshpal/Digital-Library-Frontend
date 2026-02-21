import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LibraryProvider } from './context/LibraryContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ResourceDetail from './pages/ResourceDetail';
import Reader from './pages/Reader';
import MyLibrary from './pages/MyLibrary';
import About from './pages/About';
import Support from './pages/Support';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <AuthProvider>
      <LibraryProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/resource/:id" element={<ResourceDetail />} />
              <Route path="/reader/:id" element={<Reader />} />
              <Route path="/my-library" element={<MyLibrary />} />
              <Route path="/about" element={<About />} />
              <Route path="/support" element={<Support />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Layout>
        </Router>
      </LibraryProvider>
    </AuthProvider>
  );
};

export default App;
