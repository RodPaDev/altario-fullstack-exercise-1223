import axios from "axios";

const BASE_URL = "http://localhost:3000/ping";

export async function getPing(): Promise<boolean> {
    try {
        const response = await axios.get(BASE_URL);
        if (response.status === 200) {
            return true; // Successful ping
        }
        return false; // Unexpected response status
    } catch (error) {
        console.error("Error in pinging the server:", error);
        return false; // Failed to ping
    }
}
