import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa"; 
import axios from "axios";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";

const HotelDetails = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [shareUrl, setShareUrl] = useState("");

    useEffect(() => {
        fetchHotelDetails();
        setShareUrl(window.location.href);
    }, []);

    const fetchHotelDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/hotels/${id}`);
            setHotel(response.data);
        } catch (error) {
            console.error("Error fetching hotel details:", error);
        }
    };

    if (!hotel) {
        return <p className="text-center mt-5">Loading...</p>;
    }

    return (
        <div className="container mt-4">
            <div className="card create-hotel">
                <h2 className="text-center">{hotel.name}</h2>
                <div className="row">
                    <div className="col-md-12 card-img-top">
                        <img 
                            src={hotel.image_url || "/images/card.jpg"} 
                            className="img-fluid" 
                            alt={hotel.name} 
                            onError={(e) => e.target.src = "/images/card.jpg"} 
                        />
                    </div>
                    <div className="col-md-12 mt-4">
                        <div className="d-flex justify-content-between">
                            <p><strong>Address:</strong> {hotel.address}</p>
                            <p><strong>Cost per Night:</strong> ${hotel.cost_per_night}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p><strong>Available Rooms:</strong> {hotel.available_rooms}</p>
                            <p><strong>Rating:</strong> ⭐ {hotel.rating}</p>
                        </div>
                        
                        <div className="mt-4 d-flex justify-content-center social-media">
                            <h5 className="share-hotel me-3">Share this Hotel:</h5>
                            <FacebookShareButton url={shareUrl}>
                                <FaFacebook size={22} className="me-2 text-primary" />
                            </FacebookShareButton>
                            <TwitterShareButton url={shareUrl}>
                                <FaTwitter size={22} className="me-2 text-info" />
                            </TwitterShareButton>
                            <WhatsappShareButton url={shareUrl}>
                                <FaWhatsapp size={22} className="me-2 text-success" />
                            </WhatsappShareButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;
