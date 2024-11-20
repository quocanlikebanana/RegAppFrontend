import { Token } from "../routes/auth/services/authApi";

class LocalStorageService {
	private static ACCESS_TOKEN_KEY = 'access_token';
	private static REFRESH_TOKEN_KEY = 'refresh_token';

	static getAccessToken(): string | null {
		return localStorage.getItem(this.ACCESS_TOKEN_KEY);
	}

	static getRefreshToken(): string | null {
		return localStorage.getItem(this.REFRESH_TOKEN_KEY);
	}

	static setTokens(token: Token): void {
		localStorage.setItem(this.ACCESS_TOKEN_KEY, token.accessToken);
		localStorage.setItem(this.REFRESH_TOKEN_KEY, token.refreshToken);
	}

	static clearTokens(): void {
		localStorage.removeItem(this.ACCESS_TOKEN_KEY);
		localStorage.removeItem(this.REFRESH_TOKEN_KEY);
	}
}

export default LocalStorageService;