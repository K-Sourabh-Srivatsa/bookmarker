import { React, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_MANAGE_TAGS, ROUTE_NEW_BOOKMARK } from "../../utils/constants";
import { handleUserLogout } from "../../apis/users";
import useLocalStorage from "../../customHooks/useLocalStorage";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const searchButtonRef = useRef(null);

  const [userDetails, setUserDetails] = useLocalStorage("userDetails", null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (query.trim()) {
      navigate(`/bookmarks/search?query=${encodeURIComponent(query.trim())}`);
    }
    setRefreshTrigger((prevState) => prevState + 1);
    setQuery("");
  };

  const handleLogout = () => {
    handleUserLogout();
    setUserDetails(null);
    navigate("/user/login");
  };

  const handleClickOutside = (e) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(e.target) &&
      searchButtonRef.current &&
      !searchButtonRef.current.contains(e.target)
    ) {
      setQuery("");
    }
  };

  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
  }, []);

  if (userDetails) {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid justify-content-between">
            <a className="navbar-brand" href="/">
              <h1>Bookmarker</h1>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="text-decoration-none">
                    <a className="nav-link active" aria-current="page">
                      Home
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={ROUTE_NEW_BOOKMARK}
                    className="text-decoration-none"
                  >
                    <a className="nav-link">Add new Bookmark</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={ROUTE_MANAGE_TAGS} className="text-decoration-none">
                    <a className="nav-link">Manage your Tags</a>
                  </Link>
                </li>
                <div className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    ref={searchInputRef}
                  />
                  <button
                    className="btn btn-outline-success"
                    type="submit"
                    onClick={handleSearch}
                    ref={searchButtonRef}
                  >
                    Search
                  </button>
                </div>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userDetails.firstName}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/user/account">
                        Manage Account
                      </a>
                    </li>
                    <li onClick={() => handleLogout()}>
                      <a className="dropdown-item">Logout</a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userDetails.firstName}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <h1>Bookmarker</h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/user/login" className="text-decoration-none">
                  <a className="nav-link active" aria-current="page">
                    Login
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user/register" className="text-decoration-none">
                  <a className="nav-link">Register</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
