import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendURL } from '../../../app/env';

interface LoginRequest {
	email: string;
	password: string;
}

interface RegisterRequest {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

interface Token {
	accessToken: string;
	refreshToken: string;
}

interface AuthResponse {
	email: string;
	firstName: string;
	lastName: string;
	token: Token;
}

const authApiReducerPath = 'authApi';
const backendFetchQuery = fetchBaseQuery({ baseUrl: backendURL });

// Define a service using a base URL and expected endpoints
const authApi = createApi({
	reducerPath: authApiReducerPath,
	baseQuery: backendFetchQuery,
	endpoints: (builder) => ({
		login: builder.mutation<AuthResponse, LoginRequest>({
			query: (creadentials) => ({
				url: 'auth/login',
				method: 'POST',
				body: creadentials,
			}),
		}),

		register: builder.mutation<AuthResponse, RegisterRequest>({
			query: (createNew) => ({
				url: 'auth/register',
				method: 'POST',
				body: createNew,
			}),
		}),

		refresh: builder.mutation<AuthResponse, { refreshToken: string }>({
			query: (refreshToken) => ({
				url: 'auth/refresh',
				method: 'POST',
				body: { refreshToken },
			}),
		}),
	})
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useRefreshMutation
} = authApi;

export type { AuthResponse, Token };
export default authApi;