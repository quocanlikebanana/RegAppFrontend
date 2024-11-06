import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/strore';
import { BackendError, backendService } from '../../service/backend.ts';
import LocalStorageService from '../../service/localstorage.service.ts';
import { authBackendService } from '../../service/auth-backend.ts';


interface AuthResponse {
	email: string;
	firstName: string;
	lastName: string;
	accessToken: string;
	refreshToken: string;
}

interface AuthState {
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
	accessToken: string | null;
	refreshToken: string | null;
	user: {
		email: string;
		firstName: string;
		lastName: string;
	} | null;
}

interface LoginPayload {
	email: string;
	password: string;
}

interface RegisterPayload {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

const initialState: AuthState = {
	isAuthenticated: !!LocalStorageService.getAccessToken(),
	loading: false,
	error: null,
	accessToken: LocalStorageService.getAccessToken(),
	refreshToken: LocalStorageService.getRefreshToken(),
	user: null,
};

const login = createAsyncThunk('auth/login',
	async (payload: LoginPayload, { rejectWithValue }) => {
		try {
			const response = await backendService.post('/auth/login', {
				email: payload.email,
				password: payload.password,
			});
			const authResponse = response.data as AuthResponse;
			if (!authResponse) {
				throw new Error('Invalid account data');
			}
			LocalStorageService.setAccessToken(authResponse.accessToken);
			LocalStorageService.setRefreshToken(authResponse.refreshToken);
			return authResponse;
		} catch (error) {
			if (error instanceof BackendError) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Something went wrong');
		}
	}
);

const register = createAsyncThunk('auth/register',
	async (payload: RegisterPayload, { rejectWithValue }) => {
		try {
			const response = await backendService.post('/auth/register', {
				email: payload.email,
				password: payload.password,
				firstName: payload.firstName,
				lastName: payload.lastName,
			});
			const authResponse = response.data as AuthResponse;
			if (!authResponse) {
				throw new Error('Invalid account data');
			}
			LocalStorageService.setAccessToken(authResponse.accessToken);
			LocalStorageService.setRefreshToken(authResponse.refreshToken);
			return authResponse;
		} catch (error) {
			if (error instanceof BackendError) {
				return rejectWithValue(error.message || 'Register failed');
			}
			return rejectWithValue('Something went wrong');
		}
	}
);

const refresh = createAsyncThunk('auth/refresh',
	async (_, { rejectWithValue }) => {
		try {
			const refreshToken = LocalStorageService.getRefreshToken();
			if (!refreshToken) {
				throw new Error('No refresh token available');
			}
			const response = await backendService.post('/auth/refresh', {
				refreshToken
			});
			const tokenResponse = response.data as {
				accessToken: string,
				refreshToken: string
			};
			if (!tokenResponse) {
				throw new Error('Invalid account data');
			}
			LocalStorageService.setAccessToken(tokenResponse.accessToken);
			LocalStorageService.setRefreshToken(tokenResponse.refreshToken);
			return tokenResponse;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Something went wrong');
		}
	}
);

const logout = createAsyncThunk('auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			await authBackendService.get<void>('/auth/logout');
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Something went wrong');
		} finally {
			LocalStorageService.clearTokens();
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		localLogout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.accessToken = null;
			state.refreshToken = null;
			LocalStorageService.clearTokens();
		},
	},
	extraReducers: (builder) => {
		// No need to update all properties of the state, just the ones that are relevant to the action
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.user = {
					email: action.payload.email,
					firstName: action.payload.firstName,
					lastName: action.payload.lastName,
				};
				state.accessToken = action.payload.accessToken;
				state.refreshToken = action.payload.refreshToken;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(register.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.user = {
					email: action.payload.email,
					firstName: action.payload.firstName,
					lastName: action.payload.lastName,
				};
				state.accessToken = action.payload.accessToken;
				state.refreshToken = action.payload.refreshToken;
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(refresh.fulfilled, (state, action: PayloadAction<{ accessToken: string, refreshToken: string }>) => {
				state.accessToken = action.payload.accessToken;
				state.refreshToken = action.payload.refreshToken;
			})
			.addCase(logout.fulfilled, (state) => {
				state.isAuthenticated = false;
				state.user = null;
				state.accessToken = null;
				state.refreshToken = null;
			});
	},
});

export const { localLogout } = authSlice.actions;
export { login, register, refresh, logout };
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;