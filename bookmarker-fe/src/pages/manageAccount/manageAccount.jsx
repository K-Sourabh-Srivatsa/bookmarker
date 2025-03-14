import React, { useEffect, useState, } from "react";
import DeleteAccountModal from "../../components/deleteAccountModal/deleteAccountModal";
import { handleExportBookmarksDownload } from "../../apis/bookmark";
import { useNavigate } from "react-router-dom";

function ManageAccount() {

    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        setUserDetails(JSON.parse(localStorage.getItem('userDetails')));

    }, []);

    return (
        <div className="container">
            <h1>Manage your Account</h1>
            <div className="container">
                {userDetails &&
                    <div>
                        <h5>First Name:</h5> <p>{userDetails.firstName}</p>
                        <h5>Last Name:</h5> <p>{userDetails.lastName}</p>
                        <h5>Email ID:</h5> <p>{userDetails.email}</p>
                    </div>
                }
            </div>
            <div className="d-flex flex-row mt-5 justify-content-between">
                <div className="container">
                    <button className="btn btn-warning p-1" onClick={() => navigate('/user/update')}>Update your Details</button>
                </div>
                <div className="container">
                    <button className="btn btn-secondary p-1" onClick={handleExportBookmarksDownload}>Export Bookmarks</button>
                    <p><b>NOTE: </b>Bookmarks will be exported in a .json file</p>
                </div>
                <div className="container">
                    <button type="button" className="btn btn-danger p-1" data-bs-toggle="modal" data-bs-target="#deleteAccountModal">
                        Delete Account
                    </button>

                </div>
            </div>

            <DeleteAccountModal />
        </div>
    );
}

export default ManageAccount;