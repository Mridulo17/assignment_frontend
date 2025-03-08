import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 5000);
    }, [navigate]);

    return (
        <div className="container text-center mt-5">
            <div className="card error-card">
                <h1 className="text-danger">Something went wrong!</h1>
                <p>We're experiencing an issue. Redirecting you back to home...</p>
            </div>
        </div>
    );
};

export default ErrorPage;
