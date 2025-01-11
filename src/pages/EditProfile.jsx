import React, { useState, useEffect } from "react";
import { supabase } from "../services/lib/supabaseClient";
import { UserAuth } from "../components/context/AuthContext";

const EditUser = () => {
    const { decryptSession } = UserAuth();
    const session = decryptSession();

    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        phone: "",
        photo: "",
    });
    const [photoFile, setPhotoFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session?.id) {
            fetchUserData(session.id);
        }
    }, [session]);

    const fetchUserData = async (userId) => {
        try {
            const { data, error } = await supabase
                .from("users")
                .select("fullName, email, phone, photo")
                .eq("id", userId)
                .single();

            if (error) throw error;
            setUserData(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handlePhotoChange = (e) => {
        setPhotoFile(e.target.files[0]);
    };

    const updateUser = async () => {
        setLoading(true);
        try {
            let photoUrl = userData.photo;

            if (photoFile) {
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from("profile-photos")
                    .upload(`photos/${session.id}-${Date.now()}`, photoFile);

                if (uploadError) throw uploadError;

                photoUrl = supabase.storage
                    .from("profile-photos")
                    .getPublicUrl(uploadData.path).data.publicUrl;
            }

            const { error: updateError } = await supabase
                .from("users")
                .update({
                    fullName: userData.fullName,
                    email: userData.email,
                    phone: userData.phone,
                    photo: photoUrl,
                })
                .eq("id", session.id);

            if (updateError) throw updateError;

            alert("User updated successfully!");
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Full Name:
                    <input
                        type="text"
                        name="fullName"
                        value={userData.fullName}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Phone:
                    <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Photo:
                    <input type="file" accept="image/*" onChange={handlePhotoChange} />
                </label>
                <br />
                <button onClick={updateUser} disabled={loading}>
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </form>
            {userData.photo && (
                <div>
                    <h3>Current Photo:</h3>
                    <img
                        src={userData.photo}
                        alt="User Photo"
                        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                    />
                </div>
            )}
        </div>
    );
};

export default EditUser;
