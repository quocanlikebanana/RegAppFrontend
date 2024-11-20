import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
	error: unknown,
): error is FetchBaseQueryError {
	return typeof error === 'object' && error != null && 'status' in error
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
	error: unknown,
): error is { message: string } {
	return (
		typeof error === 'object' &&
		error != null &&
		'message' in error &&
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		typeof (error as any).message === 'string'
	)
}

export function toErrorMessage(error: unknown): string | null {
	if (error) {
		if (isFetchBaseQueryError(error)) {
			// The request couldn't reach the server (e.g., the server is down, DNS issues, etc.). 
			// The request timed out or encountered a network error(e.g., no internet connection).
			if (error.status === "FETCH_ERROR") {
				return 'Cannot connect to the server.';
			}
			else if (error.status === "TIMEOUT_ERROR") {
				return 'The request timed out. Please try again later.';
			}
			return 'error' in error ? error.error : JSON.stringify(error.data)
		} else if (isErrorWithMessage(error)) {
			return error.message
		}
		return 'An error occurred'
	}
	return null;
}