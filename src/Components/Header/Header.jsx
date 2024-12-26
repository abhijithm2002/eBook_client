import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../ReduxStore/authSlice";
import { Button } from "@nextui-org/react";

export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-xl font-bold">YourLogo</span>
            </Link>
            <nav className="hidden md:block ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/booklist"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                
                Booklist
              </Link>
              <Link
                to="/addBook"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Add Books
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-300 text-sm font-medium">
                  Welcome, {user?.name}
                </span>
                <Button
                  onClick={handleLogout}
                    size="sm"
                    variant="bordered"
                    color="danger"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link
                to="/login"
               
              >
                <Button
                  onClick={handleLogout}
                    size="sm"
                    variant="shadow"
                    color="danger"
                >Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
     
    </header>
  );
}
