function Header({ setUser, setShowLogin, setShowRegister, user }) {
  const handleLogout = () => {
    // Implement logout logic and reset user state
    setUser(null);
    // Show login and register forms after logout
    setShowLogin(true);
    setShowRegister(true);
  };
  return (
    <>
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <svg
                className="bi me-2"
                width={40}
                height={32}
                role="img"
                aria-label="Bootstrap"
              >
                <use xlinkHref="#bootstrap" />
              </svg>
            </a>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <a href="#" className="nav-link px-2 text-white">
                  Welcome to the Dashboard {user.username}!
                </a>
              </li>
            </ul>
            {/* <form
                className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
                role="search"
              >
                <input
                  type="search"
                  className="form-control form-control-dark text-bg-dark"
                  placeholder="Search..."
                  aria-label="Search"
                />
              </form> */}
            <div className="text-end">
              <button
                type="button"
                className="btn btn-outline-light me-2"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </button>
              {/* <button type="button" className="btn btn-warning">
                  Sign-up
                </button> */}
            </div>
          </div>
        </div>
      </header>
      ;
    </>
  );
}
export default Header;
