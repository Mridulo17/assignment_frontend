import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import ManageHotels, { loader as manageHotelsLoader } from "../pages/ManageHotels";


const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/manage-hotels", element: <ManageHotels />, loader: manageHotelsLoader },
]);
const MainLayout = () => {
    const location = useLocation();
    const state = location.state;
    
    return (
        <>
            <Outlet />
            {state?.modal && (
                <>
                    {state?.modal === "login" && <Login />}
                    {state?.modal === "register" && <Register />}
                </>
            )}
        </>
    );
};

const AppRouter = () => {
    return (
        <RouterProvider router={router} />,
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
