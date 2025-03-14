import React, { useEffect, useState } from "react";
import { handleUserAccountUpdate } from "../../apis/users";
import { useNavigate } from "react-router-dom";

function UserUpdatePage() {
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();

    const userUpdateHandler = async () => {
        try {
            const response = await handleUserAccountUpdate(userInfo.id, {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
            });
    
            if (response === 'Successfully updated') {
                const updatedUserDetails = {
                    id: userInfo.id,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    email: userInfo.email
                };
    
                localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
                
                setUserInfo(updatedUserDetails);
    
                alert('User details updated successfully');
                navigate('/');
            } else {
                console.error('Failed to update user details');
                alert('Failed to update user details');
            }
        } catch (error) {
            console.error('Error updating user details:', error);
            alert('An error occurred while updating user details');
        }
    };

    const handleChange = (e) => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        const storedUserDetails = localStorage.getItem('userDetails');
        if (storedUserDetails) {
            setUserInfo(JSON.parse(storedUserDetails));
        }
    }, []);

    if (!userInfo.id) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Update your Account</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                userUpdateHandler();
            }}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" onChange={handleChange} id="firstName" name="firstName" value={userInfo.firstName || ''}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" onChange={handleChange} id="lastName" name="lastName" value={userInfo.lastName || ''}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={handleChange} id="email" name="email" value={userInfo.email || ''}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default UserUpdatePage;