import React from "react";
import { handleDeleteAccount } from '../../apis/users';
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../customHooks/useLocalStorage";

function DeleteAccountModal() {
    const [userDetails, setUserDetails] = useLocalStorage('userDetails', null);
    const navigate = useNavigate();

    const userId = userDetails?.id;

    const handleUserDeleteAccount = async (id) => {
        try {
            const response = await handleDeleteAccount(id);
            if (response === true) {
                setUserDetails(null);
                sessionStorage.removeItem('token');
                localStorage.removeItem('userDetails');
                
                navigate('/user/login');
            }
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    return (
        <div className="modal fade" id="deleteAccountModal" tabIndex="-1" aria-labelledby="deleteAccountModal" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="deleteAccountTitle">Delete your Account?</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <b>Are you sure that you want to delete your Account?</b>
                        <p className="text-danger">
                          WARNING: You will lose your account and all your data permanently. Account cannot be restored
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">No</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => handleUserDeleteAccount(userId)}>Delete My Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccountModal;