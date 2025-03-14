import React, { useState } from "react";
import { handleRegisterUser } from "../../apis/users";
import { useNavigate } from "react-router-dom";
import { matchPasswordFields } from "../../utils/utilFunctions";

function RegisterPage() {

    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [unmatchedPasswordsError, setUnmatchedPasswordsError] = useState(false);

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(matchPasswordFields(userDetails.password, confirmPassword)) {
                await handleRegisterUser(userDetails);
                navigate('/user/login');
            } else {
                setUnmatchedPasswordsError(true);
            }
            
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="container">
            <h1>Register your Account</h1>
            <form>
            <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">First Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="firstName"
                        name="firstName"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Last Name</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        name="lastName"
                        onChange={handleChange} 
                    />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input 
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={handleChange}   
                    />
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input 
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="confirm password" className="form-label"> Confirm Password</label>
                    <input 
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>

                {(unmatchedPasswordsError===true) ? <p className="text-danger">Passwords don't match</p>: ''}

                <div className="container-fluid p-0">
                    <div className="row justify-content-start">
                        <div className="col-12 col-lg-6">
                            <div className="d-flex flex-wrap gap-4 mt-4">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                            <button type="reset" className="btn btn-outline-danger">Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;