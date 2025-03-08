import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ManageHotels from "./pages/ManageHotels";
import HotelDetails from "./pages/HotelDetails";
import CreateHotel from "./pages/CreateHotel";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
// import AuthSuccess from "./components/AuthSuccess";
import Register from "./pages/Register";
import Navbar from "./pages/Navbar";
import { AuthProvider } from './context/AuthContext'; 
import AuthSuccess from "./components/AuthSuccess";

function App() {
    const [hotels, setHotels] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/hotels`)
            .then((response) => setHotels(response.data))
            .catch(() => {
                console.error("Error fetching hotels");
                window.location.href = "/error";
            });
    }, []);

    const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

    return (
        <AuthProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<ManageHotels hotels={hotels} setHotels={setHotels} />} />
                <Route path="/hotels/:id" element={<HotelDetails />} />
                <Route path="/create-hotel" element={<CreateHotel />} />
                <Route path="/edit-hotel/:id" element={<CreateHotel />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth-success" element={<AuthSuccess />} />
                <Route path="/register" element={<Register />} />
            </Routes>

            {isAuthPage && (
                <div className="modal-backdrop" onClick={() => navigate("/")}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {location.pathname === "/login" ? <Login /> : <Register />}
                    </div>
                </div>
            )}
        </AuthProvider> 
    );
}

export default App;
