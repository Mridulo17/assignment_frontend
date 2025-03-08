import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 2000);

        return () => clearTimeout(timer); 
    }, [navigate]);

    return (
        <div className="auth-success">
            <div className="alert alert-success text-center">
                <h4>Login Successful!</h4>
                <p>Redirecting you to the home page...</p>
            </div>
        </div>
    );
};

export default AuthSuccess;
