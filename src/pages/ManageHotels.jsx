import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const ManageHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchHotels(currentPage);
    }, [currentPage]);

    const fetchHotels = async (page) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/hotels?page=${page}`);
            console.log(response)
            setHotels(response.data.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error("Failed to fetch hotels", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this hotel?")) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/hotels/${id}`);
                setHotels(hotels.filter(hotel => hotel.id !== id));
                alert("Hotel deleted successfully!");
            } catch (error) {
                console.error("Error deleting hotel:", error);
            }
        }
    };

    return (
        <>
        <div className="container mt-4">
             <div className="card manage-hotel-card">
                <div className="d-flex justify-content-between">
                    <h2 className="manage-title">Manage Hotels</h2>
                    <div className="">
                    <Link to="/create-hotel" className="btn btn-success">+ Create Hotel</Link>
                    </div>
                </div>

                <div className="row">
                    {hotels?.map((hotel) => (
                        <div className="col-md-3 mb-3" key={hotel.id}>
                            <div className="card proparty-card">
                                {/* <img src={hotel.image_url} className="card-img-top" alt={hotel.name} /> */}
                                <img 
                                    src={hotel.image_url || "/images/card.jpg"} 
                                    className="img-fluid" 
                                    alt={hotel.name} 
                                    onError={(e) => e.target.src = "/images/card.jpg"} 
                                />
                                <div className="card-body">
                                    <h5 className="hotel-name card-title">{hotel.name}</h5>
                                    <p className="hotel-address card-text">{hotel.address}</p>
                                    <p className="hotel-cost"><strong>Cost:</strong> ${hotel.cost_per_night} / night</p>
                                    <div className="room-rating d-flex justify-content-between">
                                        <p><strong>Rooms:</strong> {hotel.available_rooms}</p>
                                        <p><strong>Rating:</strong> ⭐ {hotel.rating}</p>
                                    </div>
                                    <div className="proparty-card-btn-link d-flex justify-content-between">
                                        <Link to={`/hotels/${hotel.id}`} className="btn btn-primary">View</Link>
                                        <Link to={`/edit-hotel/${hotel.id}`} className="btn btn-warning">Edit</Link>
                                        <button className="btn btn-danger" onClick={() => handleDelete(hotel.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            <nav>
                <ul className="pagination justify-content-center mt-3">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                            <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
             </div>
        </div>
        </>
        
    );
};

export default ManageHotels;
