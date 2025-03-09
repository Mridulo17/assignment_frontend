import { createContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = sessionStorage.getItem('authToken');
                if (!token) {
                    setUser(null);
                    setLoading(false);
                    return;
                }
    
                const response = await api.get('/user'); 
                setUser(response.data);
            } catch (error) {
                console.error("Fetching user failed:", error);
                toast.error("Failed to fetch user!");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUser();
    }, []);
    
    const login = async (email, password) => {
        try {
            await api.get('/sanctum/csrf-cookie'); 
            const response = await api.post('/login', { email, password });
    
            const token = response.data.token;
            sessionStorage.setItem('authToken', token);
    
            api.defaults.headers.Authorization = `Bearer ${token}`; 
    
            setUser(response.data.user);
            toast.success("Login successful!");

        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Invalid email or password!");
        }
    };
    


    const register = async (name, email, password) => {
        try {
            await api.get('/sanctum/csrf-cookie'); 
            const response = await api.post('/register', { name, email, password });
            setUser(response.data.user);
            toast.success("Registration successful!");
        } catch (error) {
            console.error("Registration failed:", error);
            toast.error("Registration failed! Please try again.");
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout'); 
    
            sessionStorage.removeItem('authToken'); 
            delete api.defaults.headers.Authorization; 
    
            setUser(null); 
            navigate("/login"); 
            toast.success("Logged out successfully!");

        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed! Please try again.");

        }
    };
    

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
