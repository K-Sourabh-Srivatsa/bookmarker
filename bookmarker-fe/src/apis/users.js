import axios from "axios";
// import api from "./api";
// import { api, apiNoAuth } from './api.js';
import { api } from "./api";
import { apiNoAuth } from "./api";

export const handleRegisterUser = async (user) => {
    try {
        await apiNoAuth.post('/users/register', user);
    } catch (err) {
        return err;
    }
}

export const handleLoginUser = async (user) => {
    try {
        const response = await apiNoAuth.post('/users/login', user);
        return response;
    } catch (err) {
        return err;
    }
}

export const handleUserLogout = () => {
    try {
        if(!sessionStorage.getItem('token')) return null;

        sessionStorage.removeItem('token');
        localStorage.removeItem('userDetails');
    } catch (err) {
        return err;
    }
}

export const handleDeleteAccount = async (id) => {
    try {
        if(!sessionStorage.getItem('token')) return null;

        await api.delete(`/users/${id}`);

        sessionStorage.removeItem('token');
        localStorage.removeItem('userDetails');

        return true;
    } catch (err) {
        return err;
    }
};

export const handleUserAccountUpdate = async (id, updatedUser) => {
    try {
        const response = await api.put(`/users/${id}`, updatedUser);
        if (response.status === 200) {
            return 'Successfully updated';
        } else {
            throw new Error('Failed to update user');
        }
    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
}