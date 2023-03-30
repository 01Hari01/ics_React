import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

async function signup(formData) {
    try {
        const response = await axios.post(`${BASE_URL}register/`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function login(formData) {
    try {
        const response = await axios.post(`${BASE_URL}login/`, formData);
        console.log("inside api",response,formData)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteSupplier(id) {
    const url = `${BASE_URL}supplier/${id}/`;
    const response = await axios.delete(url);
    return response.data;
}

export async function getSuppliers() {
    try {
        const response = await axios.get(`${BASE_URL}suppliers/`);
        console.log("Response", response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const logout = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(`${BASE_URL}logout/`, null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};


export async function postSuppliers(data) {
    try {
        const response = await axios.post(`${BASE_URL}create/`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export { signup, login };
