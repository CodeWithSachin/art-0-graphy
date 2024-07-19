import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
		credentials: "include" as const,
	}),
	endpoints: (builder) => ({
		refreshToken: builder.query({
			query: (data: any) => ({
				url: "refresh-token",
				method: "GET",
			}),
		}),
		loadUser: builder.query({
			query: (data: any) => ({
				url: "me",
				method: "GET",
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;
					dispatch(
						userLoggedIn({
							accessToken: result.data.activationToken,
							user: result.data.user,
						})
					);
				} catch (error: any) {
					console.log(error);
				}
			},
		}),
	}),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
