import axios from "axios";

export interface Payment {
    id: string;
    name: string;
    code: string;
    amount: string;
    grid: string;
}

interface GetPaymentsResponse {
    payments: Payment[];
}

interface CreatePaymentResponse {
    message: string;
    payment: Payment;
}

interface CreatePaymentParams {
    name: string;
    code: string;
    amount: string;
    grid: string;
}

const BASE_URL = "http://localhost:4000/payment";


export async function getPayments(): Promise<GetPaymentsResponse> {
    try {
        const response = await axios.get<GetPaymentsResponse>(BASE_URL);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.error || "Failed to fetch payments.");
        }
        throw new Error("An unknown error occurred while fetching payments.");
    }
}

export async function createPayment(params: CreatePaymentParams): Promise<CreatePaymentResponse> {
    try {
        const response = await axios.post<CreatePaymentResponse>(`${BASE_URL}/create`, params);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.error || "Failed to create payment.");
        }
        throw new Error("An unknown error occurred while creating the payment.");
    }
}
