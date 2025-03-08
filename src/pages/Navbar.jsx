import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout, loading } = useContext(AuthContext);
    if (loading) return <div>Loading...</div>;

    const handleLogout = () => {
        logout();
        navigate("/");  
    };
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Hotel App</Link>
                <div className="d-flex me-3">
                    {user ? (
                        <button className="nav-button btn btn-outline-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <>
                            <button className="nav-button btn btn-outline-primary me-2" onClick={() => navigate("/login")}>
                                Login
                            </button>
                            <button className="nav-button btn btn-outline-primary" onClick={() => navigate("/register")}>
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
