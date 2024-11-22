import axios from "axios";

const BASE_URL = "http://localhost:3000/grid";

export async function generateGrid(bias?: string) {
    try {
        let params = {}
        if (bias) {
            params = { bias }
        }

        const response = await axios.post(`${BASE_URL}/generate`, null, {
            params,
        });
        return response.data.grid;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to generate grid.");
        }
        throw new Error("An unknown error occurred while generating the grid.");
    }
}

export async function getGridCode() {
    try {
        const response = await axios.get(`${BASE_URL}/decode`);
        return response.data.code;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to fetch grid code.");
        }
        throw new Error("An unknown error occurred while fetching the grid code.");
    }
}
