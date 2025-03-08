import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container text-center mt-5">
            <h1>Welcome to Hotel Management</h1>
            <button className="btn btn-primary me-2" onClick={() => navigate("/login", { state: { modal: "login" } })}>
                Login
            </button>
            <button className="btn btn-success" onClick={() => navigate("/register", { state: { modal: "register" } })}>
                Register
            </button>
        </div>
    );
};

export default Home;
