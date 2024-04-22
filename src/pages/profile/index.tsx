import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import Listing from "../../components/listing/Listing";
import ListingHistory from "../../components/listing/ListingHistory";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import AddNewListingPopUp from "../../components/popUp/AddNewListingPopUp";
import { theme } from '../../utils/theme';
import ImageUploadButton from "../../components/imageUploadButton/ImageUploadButton";
import Header from "../../components/header/Header";
import axios from "axios";

const ProfilePage = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({ name: '', profilePic: null, listings: [], bookings: [] });
    const [imageUrl, setImageUrl] = useState('');

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        navigate('/');
    };

    const handleImageUpload = async (imageUrl: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No JWT token available');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };

            const blob = await fetch(imageUrl).then((response) => response.blob());
            const formData = new FormData();
            const extension = blob.type.split('/')[1];
            const fileName = `profile_pic.${extension}`;
            const file = new File([blob], fileName);
            formData.append('profile_pic', file, fileName);

            const res = await axios.put('http://localhost:3001/api/users/profile', formData, config);
            console.log('Response from server:', res.data);
            window.location.reload()
        } catch (error) {
            console.error('Error updating profile picture:', error);
        }
    };


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No JWT token available');
                }
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const res = await axios.get("http://localhost:3001/api/users/profile", config);
                if (!res.data || !res.data.data) {
                    throw new Error('No user profile data available');
                }

                const { name, profile_pic, listings, bookings } = res.data.data;
                setUserData({ name, profilePic: profile_pic, listings, bookings });

                if (profile_pic && profile_pic.data) {
                    const buffer = new ArrayBuffer(profile_pic.data.length);
                    const view = new Uint8Array(buffer);
                    for (let i = 0; i < profile_pic.data.length; i++) {
                        view[i] = profile_pic.data[i];
                    }
                    const blob = new Blob([buffer], { type: 'image/png' }); // Assuming the image is PNG

                    const imageUrl = URL.createObjectURL(blob);
                    setImageUrl(imageUrl);
                }


            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);
    const listedParts: any[] = [];
    userData.listings.forEach((e: any) => listedParts.push(<Listing showEditButton availability={e.listing_state}
                                                   image={"https://ilcadinghy.es/wp-content/uploads/2020/04/barco-ilca-7-laser-completo.jpg"}
                                                   price={e.price} title={e.title} listing_id={e.id} description={e.description}/>))

    const bookingHistory: any[] = [];
    userData.bookings.forEach((e: any) => bookingHistory.push(<ListingHistory listingId={e.listing_id} startDate={e.start_date} endDate={e.end_date} client={"You"}/>))


    return (
        <div>
            <Header showSearchBar={false} showProfileIcon={true} showBackButton={true} />
            <div style={{ background: theme.primary300, display: "flex", flexDirection: "row", marginTop: 53, marginLeft: "2.5%", width: "90%", padding: "2.5%" }}>
                <div style={{
                    width: 320,
                    display: 'flex',
                    flexDirection: "column",
                    gap: 10
                }}>
                    <Avatar name={userData.name} size="320" src={imageUrl} />
                    <ImageUploadButton setImage={handleImageUpload} />
                    <Button variant={"secondary"} onClick={handleLogoutClick}>Logout</Button>
                </div>
                <div className="info" style={{ marginLeft: 30 }}>
                    <h1>{userData.name}</h1>
                    <div className="listed-parts">
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <h1>Listed Parts:</h1>
                            <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center" }}>
                                <AddNewListingPopUp />
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: "column",
                            gap: '10px'
                        }}>
                            {listedParts}
                        </div>
                    </div>
                    <div className="rent-history">
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <h1>Rent History:</h1>
                            <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center" }}>
                                <Button style={{ width: 240, height: 40 }}>Register return</Button>
                            </div>
                        </div>
                        {/*<ListingHistory listingId={1} startDate={"placeholder"} endDate={"placeholder"} client={"placeholder"}/>*/}
                    </div>
                    <div className="booking-history">
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <h1>Booking History:</h1>
                        </div>
                        {bookingHistory}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
