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
import TextField from "../../components/textField/TextField";
import PasswordField from "../../components/textField/PasswordField";
import PhoneNumberField from "../../components/phoneNumberField/PhoneNumberField";
import ChangePasswordPopUp from "../../components/popUp/ChangePasswordPopUp";

const ProfileInfoPage = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({ name: '', phone: '', email:'', profilePic: null});
    const [imageUrl, setImageUrl] = useState('');
    const [editMode, setEditMode] = useState(false)

    const [usernameError, setUsernameError] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleEditProfile = () => {
        setEditMode(!editMode)
    };

    const handleSaveChanges = async () => {
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
            const res = await axios.put('http://localhost:3001/api/users/edit', {
                name: username,
                phoneNumber
            }, config);
            setEditMode(!editMode)
            window.location.reload()
        }
        catch(e: any){
            setUsernameError(e.response.data.usernameError);
            setNumberError(e.response.data.numberError);
            setErrorMessage(e.response.data.message);
            console.error('Error updating profile data:', e);
        }
    }

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

    const bufferToUrl = (image: any) => {
        const buffer = new ArrayBuffer(image.data.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < image.data.length; i++) {
            view[i] = image.data[i];
        }
        const blob = new Blob([buffer], { type: 'image/png' });
        return URL.createObjectURL(blob);
    }


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
                const { name, profile_pic, phone, email } = res.data.data;
                setUserData({ name, phone, email, profilePic: profile_pic });
                setUsername(name)
                setEmail(email)
                setPhoneNumber(phone)

                if (profile_pic && profile_pic.data) {
                    setImageUrl(bufferToUrl(profile_pic));
                }

            } catch (error) {
                navigate('/login');
                console.error("Error fetching user profile:", error);
            }
        };
        fetchUserProfile();
    }, []);


    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center'}}>
            <Header showSearchBar={false} showProfileIcon={true} showBackButton={true} />
            <div style={{ borderRadius: 25, background: theme.primary300, display: "flex", flexDirection: "row", marginTop: 53, marginLeft: "8%", width: "80%", padding: "2.5%" }}>
                <div style={{
                    width: 320,
                    display: 'flex',
                    flexDirection: "column",
                    gap: 10
                }}>
                    <Avatar name={userData.name} size="320" src={imageUrl} />
                    <ImageUploadButton setImage={handleImageUpload} />
                    {editMode ? (
                        <Button variant={"primary"} onClick={handleSaveChanges}>Edit Profile</Button>
                    ) : (
                        <Button variant={"secondary"} onClick={handleEditProfile}>Edit Profile</Button>
                    )}

                </div>
                <div style={{ marginLeft: 30, width: 300 }}>
                    <div>
                        <h1>Name:</h1>
                        {editMode ? (
                            <>
                                <TextField value={username} placeholder={"Username"} onChange={setUsername} isError={usernameError}/>
                                {usernameError ? (<p style={{color: 'red'}}>{errorMessage}</p>) : null}
                            </>

                        ) : (
                            <div>
                                <h2>{userData.name}</h2>
                            </div>
                        )}
                        <h1>Email:</h1>
                            <div>
                                <h2>{userData.email}</h2>
                            </div>
                        <h1>Phone Number:</h1>
                        {editMode ? (
                            <>
                                <PhoneNumberField value={phoneNumber} placeholder={"Phone number"}  onChange={setPhoneNumber} isError={numberError}/>
                                {numberError ? (<p style={{color: 'red'}}>{errorMessage}</p>) : null}
                            </>

                        ) : (
                            <div>
                                <h2>{userData.phone}</h2>
                            </div>
                        )}
                        <ChangePasswordPopUp/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfoPage;
