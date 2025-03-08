import { createContext, useEffect, useState } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                await api.get('/sanctum/csrf-cookie'); 
                
                const response = await api.get('/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`, 
                        Accept: "application/json",
                    },
                    withCredentials: true, 
                });
    
                console.log(response);
                setUser(response.data);
            } catch (error) {
                console.error("Fetching user failed:", error);
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
            setUser(response.data.user);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    // const register = async (name, email, password,) => {
    //     const response = await api.post('/register', { name, email, password });
    //     console.log(response);
    //     setUser(response.data.user);
    // };

    const register = async (name, email, password) => {
        try {
            await api.get('/sanctum/csrf-cookie'); 
            const response = await api.post('/register', { name, email, password });
            setUser(response.data.user);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };


    const logout = async () => {
    try {
        await api.post('/logout', {}, { withCredentials: true }); 

            setUser(null); 
            navigate("/login"); 
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    // const logout = async () => {
    //     try {
    //         await api.post('/logout', {}, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`, 
    //                 Accept: "application/json",
    //             },
    //             withCredentials: true, 
    //         });
    
    //         localStorage.removeItem("token"); 
    //         setUser(null);
    //     } catch (error) {
    //         console.error("Logout failed:", error);
    //     }
    // };
    

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
