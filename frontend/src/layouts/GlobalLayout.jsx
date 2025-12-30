import { Outlet } from "react-router-dom";

const GlobalLayout = () => {
  return (
    <div className="global-layout">
      <header>
        <h1>Welcome to Your Library</h1>
      </header>
      <div className="page-container">
        <main>
          <Outlet /> {/* Renders the child */}
        </main>
      </div>
      <footer>
        <p>&copy; 2025 Your Library</p>
      </footer>
    </div>
  );
};

export default GlobalLayout;
