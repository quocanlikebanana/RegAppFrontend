import { isAxiosError } from "axios";
import store from "../app/strore";
import { localLogout, refresh } from "../features/auth/authSlice";
import { BackendService } from "./backend";
import LocanStorageService from "./localstorage.service";

class AuthBackendService extends BackendService {
	constructor() {
		super();
		this.axiosInstance.interceptors.request.use((config) => {
			const token = LocanStorageService.getAccessToken();
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		}, (error) => Promise.reject(error));

		this.axiosInstance.interceptors.response.use(
			(response) => response,  // Pass through if the response is successful
			async (error) => {
				const originalRequest = error.config;

				// Check if the error is 401 (unauthorized) and accessToken is expired
				if (
					isAxiosError(error) &&
					error.response?.status === 401 &&
					!originalRequest._retry) {
					// Check if error is due to expired token and avoid infinite retry loops (._retry)
					originalRequest._retry = true;
					try {
						// Dispatch refresh token action
						await store.dispatch(refresh());

						// Get new access token in headers and retry request
						const newAccessToken = LocanStorageService.getAccessToken();
						originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
						return this.axiosInstance(originalRequest);
					} catch (refreshError) {
						return Promise.reject(refreshError);
					}
				}
				store.dispatch(localLogout());
				return Promise.reject(error);
			}
		);
	}
}

const authBackendService = new AuthBackendService();
export { authBackendService };