import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store.ts';
import authApi, { AuthResponse, Token } from '../routes/auth/services/authApi.ts';
import LocalStorageService from '../services/localstorage.service.ts';
import logoutApi from '../routes/content/services/logout.api.ts';

interface AuthState {
	user: {
		email: string;
		firstName: string;
		lastName: string;
	} | null,
	token: Token | null,
};

const initialState: AuthState = ((): AuthState => {
	const accessToken = LocalStorageService.getAccessToken();
	const refreshToken = LocalStorageService.getRefreshToken();
	if (accessToken && refreshToken) {
		return {
			user: null,
			token: {
				accessToken,
				refreshToken,
			},
		}
	}
	return {
		user: null,
		token: null,
	}
})();

function setAuthState(state: AuthState, action: PayloadAction<AuthResponse>) {
	state.user = {
		email: action.payload.email,
		firstName: action.payload.firstName,
		lastName: action.payload.lastName,
	};
	state.token = action.payload.token;
	LocalStorageService.setTokens(action.payload.token);
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				authApi.endpoints.login.matchFulfilled,
				(state, action) => {
					setAuthState(state, action);
				})
			.addMatcher(
				authApi.endpoints.register.matchFulfilled,
				(state, action) => {
					setAuthState(state, action);
				})
			.addMatcher(
				authApi.endpoints.refresh.matchFulfilled, (state, action) => {
					setAuthState(state, action);
				})
			.addMatcher(
				(action) =>
					logoutApi.endpoints.logout.matchFulfilled(action) ||
					logoutApi.endpoints.logout.matchRejected(action),
				(state) => {
					state.user = null;
					state.token = null;
					LocalStorageService.clearTokens();
				})
	},
});

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectIsAuth = (state: RootState) => state.auth.token != null && state.auth.user != null;

export default authSlice.reducer;