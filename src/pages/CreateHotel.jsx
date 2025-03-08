import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateHotel = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        cost_per_night: "",
        available_rooms: "",
        rating: "",
        image_url: "",
    });

    useEffect(() => {
        if (id) {
            axios.get(`${import.meta.env.VITE_API_URL}/hotels/${id}`)
                .then((response) => setFormData(response.data))
                .catch((error) => console.error("Error fetching hotel:", error));
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`${import.meta.env.VITE_API_URL}/hotels/${id}`, formData);
                toast.success("Hotel updated successfully!");
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/hotels`, formData);
                toast.success("Hotel added successfully!");
            }
            navigate("/");
        } catch (error) {
            toast.error("Error occurred while saving the hotel!");
        }
    };

    return (
        <div className="container create-hotel mt-5">
            <h2 className="text-center mt-3">{id ? "Edit Hotel" : "Create a New Hotel"}</h2>
            <form onSubmit={handleSubmit} className="">
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Hotel Name</label>
                            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Cost per Night</label>
                            <input type="number" className="form-control" name="cost_per_night" value={formData.cost_per_night} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Available Rooms</label>
                            <input type="number" className="form-control" name="available_rooms" value={formData.available_rooms} onChange={handleChange} required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Rating (0-5)</label>
                            <input type="number" className="form-control" name="rating" value={formData.rating} onChange={handleChange} min="0" max="5" required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Image URL</label>
                            <input type="text" className="form-control" name="image_url" value={formData.image_url} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-success w-100">{id ? "Update Hotel" : "Add Hotel"}</button>
            </form>
        </div>
    );
};

export default CreateHotel;
