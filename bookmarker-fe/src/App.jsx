import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import AddBookmark from './pages/addBookmark/addBookmark';
import EditBookmark from './pages/editBookmark/editBookmark';
import ViewBookmark from './pages/viewBookmark/viewBookmark';
import SearchBookmarks from './pages/searchBookmarks/searchBookmarks';
import ManageTags from './pages/manageTags/manageTags';
import ManageAccount from './pages/manageAccount/manageAccount';

import {
  ROUTE_HOME,
  ROUTE_NEW_BOOKMARK,
  ROUTE_BOOKMARK_DETAILS,
  ROUTE_EDIT_BOOKMARK,
  ROUTE_SEARCH_BOOKMARKS,
  ROUTE_MANAGE_TAGS
} from './utils/constants';

import RegisterPage from './pages/registerPage/registerPage';
import LoginPage from './pages/loginPage/loginPage';
import ProtectedRoute from './utils/protectedRoute';
import { useCallback, useEffect, useState } from 'react';
import UserUpdatePage from './pages/userUpdate/userUpdate';

function App() {
  const [userDetails, setUserDetails] = useState(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    return storedUserDetails ? JSON.parse(storedUserDetails) : null;
  });


  useEffect(() => {
      const token = sessionStorage.getItem('token');
      const storedUserDetails = localStorage.getItem('userDetails');

      if (token && storedUserDetails) {
        setUserDetails(JSON.parse(storedUserDetails));
      } else if (!token || !storedUserDetails) {
        sessionStorage.removeItem('token');
        localStorage.removeItem('userDetails');
        setUserDetails(null);
      }
  }, []);

  const updateUserDetails = useCallback((details) => {
    setUserDetails(details);

    if (details) {
      localStorage.setItem('userDetails', JSON.stringify(details));
    } else {
      localStorage.removeItem('userDetails');
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
              <Routes>
                <Route path={ROUTE_HOME} element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
                <Route path={ROUTE_NEW_BOOKMARK} element={<ProtectedRoute> <AddBookmark /> </ProtectedRoute>} />
                <Route path={ROUTE_BOOKMARK_DETAILS} element={<ProtectedRoute> <ViewBookmark /> </ProtectedRoute>} />
                <Route path={ROUTE_EDIT_BOOKMARK} element={<ProtectedRoute> <EditBookmark /> </ProtectedRoute>} />
                <Route path={ROUTE_SEARCH_BOOKMARKS} element={<ProtectedRoute> <SearchBookmarks /> </ProtectedRoute>} />
                <Route path={ROUTE_MANAGE_TAGS} element={<ProtectedRoute> <ManageTags /> </ProtectedRoute>} />
                <Route path='/user/account' element={<ProtectedRoute> <ManageAccount /> </ProtectedRoute>} />
                <Route path='/user/update' element={<ProtectedRoute> <UserUpdatePage /> </ProtectedRoute>} />
                <Route path='/user/register' element={<RegisterPage />} />
                <Route path='/user/login' element={<LoginPage />} />
                
              </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;