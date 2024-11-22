import axios from "axios";

interface GenerateGridResponse {
    grid: string;
    lastBiasTime: number;
    prevBiasChar: string;
}

interface GetGridCodeResponse {
    code: string;
}

interface GenerateGridParams {
    bias?: string;
}

const BASE_URL = "http://localhost:4000/grid";

export async function generateGrid(params?: GenerateGridParams): Promise<GenerateGridResponse> {
    try {
        const response = await axios.post<GenerateGridResponse>(`${BASE_URL}/generate`, null, {
            params,
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to generate grid.");
        }
        throw new Error("An unknown error occurred while generating the grid.");
    }
}

export async function getGridCode(): Promise<GetGridCodeResponse> {
    try {
        const response = await axios.get<GetGridCodeResponse>(`${BASE_URL}/decode`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to fetch grid code.");
        }
        throw new Error("An unknown error occurred while fetching the grid code.");
    }
}
