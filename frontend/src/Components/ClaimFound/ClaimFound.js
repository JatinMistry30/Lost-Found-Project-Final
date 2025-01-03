import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './ClaimFound.css'

const API_BASE_URL = "http://localhost:5000";

const ClaimFound = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [itemDetails, setItemDetails] = useState({
        itemName: '',
        description: '',
        ownerId: '',
        ownerUsername: '',
        ownerEmail: ''
    });
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${API_BASE_URL}/api/claim-reports/${id}`, {
                    withCredentials: true,
                });
                
                console.log('Fetched item details:', response.data);
                setItemDetails(response.data);
            } catch (err) {
                console.error("Failed to fetch item details:", err);
                alert("Failed to fetch item details.");
                navigate("/");
            } finally {
                setIsLoading(false);
            }
        };

        fetchItemDetails();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!location.trim()) {
                alert("Please enter a location");
                return;
            }
            if (!description.trim()) {
                alert("Please enter a description");
                return;
            }
            if (!photo) {
                alert("Please select a photo");
                return;
            }

            const formData = new FormData();
            formData.append("itemId", id);
            formData.append("location", location.trim());
            formData.append("description", description.trim());
            formData.append("photo", photo);

            // Add item owner details
            formData.append("itemOwnerId", itemDetails.ownerId);
            formData.append("itemOwnerUsername", itemDetails.ownerUsername);
            formData.append("itemOwnerEmail", itemDetails.ownerEmail);

            console.log('Submitting form with data:', {
                itemId: id,
                location: location.trim(),
                description: description.trim(),
                itemOwnerId: itemDetails.ownerId,
                itemOwnerUsername: itemDetails.ownerUsername,
                itemOwnerEmail: itemDetails.ownerEmail
            });

            const response = await axios.post(
                `${API_BASE_URL}/api/claim-reports`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            if (response.status === 201) {
                alert("Report submitted successfully.");
                navigate(`/details/${id}`);
            }
        } catch (err) {
            console.error("Error submitting report:", err);
            const errorMessage = err.response?.data?.message || err.message || "An unknown error occurred";
            alert(`Error: ${errorMessage}`);
        }
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="report-found-container">
            <h2 className="title">Claim Found Item</h2>
            <div className="item-details">
                <h3 className="item-name">Item Name: {itemDetails.itemName}</h3>
                <p className="item-description">Item Description: {itemDetails.description}</p>
            </div>
            <form onSubmit={handleSubmit} className="claim-form">
                <div className="form-group">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input
                        type="text"
                        id="location"
                        className="form-input"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        className="form-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="photo" className="form-label">Photo</label>
                    <input
                        type="file"
                        id="photo"
                        className="form-input"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        accept="image/*"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Submit Report</button>
            </form>
        </div>
    );
};

export default ClaimFound;
