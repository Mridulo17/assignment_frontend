import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container text-center mt-5">
            <div className="card error-card">
                <h1 className="display-4 text-danger">404</h1>
                <h2>Page Not Found</h2>
                <p>Sorry, the page you are looking for does not exist.</p>
                <Link to="/" className="btn btn-primary">Go to Home</Link>
            </div>
        </div>
    );
};

export default NotFound;
