/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse, isAxiosError } from 'axios';

class BackendError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'BackendError';
	}
}

// Define the ApiService class
class BackendService {
	private readonly backendURL: string = import.meta.env.VITE_BACKEND_URL as string;
	protected axiosInstance: AxiosInstance;

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: this.backendURL,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	private async handleRequest<T>(callback: () => Promise<T>): Promise<T> {
		try {
			return await callback();
		} catch (error) {
			console.log(error);
			if (isAxiosError(error)) {
				throw new BackendError(error.response?.data.response || error.message);
			} else {
				throw new BackendError(`Something went wrong with the server.`);
			}
		}
	}

	// Method for GET requests
	public async get<T>(url: string): Promise<AxiosResponse<T>> {
		return await this.handleRequest(async () => await this.axiosInstance.get<T>(url))
	}

	// Method for POST requests
	public async post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
		return await this.handleRequest(async () => await this.axiosInstance.post<T>(url, data));
	}

	// Method for PUT requests
	public async put<T>(url: string, data: any): Promise<AxiosResponse<T>> {
		return await this.handleRequest(async () => this.axiosInstance.put<T>(url, data));
	}

	// Method for DELETE requests
	public async delete<T>(url: string): Promise<AxiosResponse<T>> {
		return await this.handleRequest(async () => this.axiosInstance.delete<T>(url));
	}
}

// Export an instance of ApiService with a base URL
const backendService = new BackendService();
export { backendService, BackendError, BackendService };