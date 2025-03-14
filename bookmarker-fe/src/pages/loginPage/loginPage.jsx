import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLoginUser } from "../../apis/users";
import useLocalStorage from "../../customHooks/useLocalStorage";

function LoginPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [userDetails, setUserDetails] = useLocalStorage('userDetails', null);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await handleLoginUser(user);
            sessionStorage.setItem('token', response.data.token);
            localStorage.setItem('userDetails', JSON.stringify(response.data.user));
            setUserDetails(response.data.user);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <h1>Login to your account</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="container-fluid p-0">
                    <div className="row justify-content-start">
                        <div className="col-12 col-lg-6">
                            <div className="d-flex flex-wrap gap-4 mt-4">
                                <button type="submit" className="btn btn-primary">Login</button>
                                <button type="reset" className="btn btn-outline-danger">Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;