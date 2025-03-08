import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success("Login successful!"); 
            navigate("/auth-success"); 
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/auth/google");
            window.location.href = response.data.url; 
        } catch (error) {
            console.error("Google Login Error:", error);
            toast.error("Google login failed. Please try again.");
        }
    };

    const closeModal = () => {
        if (location.pathname === "/login") {
            navigate("/");
        }
    };

    return (
        <div className={`modal ${location.pathname === "/login" ? "show d-block" : ""}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="p-0 pt-2 pe-2 loginmodal-header modal-header">
                        <button type="button" className="btn-close" onClick={() => navigate("/")}></button>
                    </div>
                    <div className="modal-body loginmodal-body">
                        <div className="text-center">
                            <img src="/images/og-logo.jpg" className="card-img-login text-center" alt="Logo" />
                            <h5 className="modal-title text-center">Welcome To Hotel</h5>
                        </div>
                        <button
                            className="google-login-btn btn btn-primary google-btn w-100 my-2 d-flex align-items-center justify-content-center"
                            onClick={handleGoogleLogin}
                        >
                            <img src="/images/google.png" style={{ width: "22px", height: "22px", marginRight: "10px" }} alt="Google Icon" />
                            Continue with Google
                        </button>
                        <div className="text-center my-2">or</div>

                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label>Email</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-success w-100">Login</button>
                        </form>
                        <div className="login-footer text-center">
                            <p><span>By creating an account, I agree</span> Terms of Service, Privacy Policy and Intellectual Property Rights</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
