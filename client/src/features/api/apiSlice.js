import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let tag = [];

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",

    // baseUrl: "http://localhost:5001/ticket/app/v1",
  }),
  tagTypes: ["users", "wallets"],
  endpoints: (builder) => ({
    //user signup
    userRegister: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
        // credentials: "include",
      }),
      providesTags: ["users"],
    }),

    //user login
    userLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),

    //user logout
    userLogout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",

        headers: {
          Authorization: `Bearer ${localStorage
            .getItem("token")
            ?.replace(/"/g, "")}`, // Example: Getting token from localStorage
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),

    //user forget
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/forget-password",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    //user reset password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/reset-password?resetToken=${data.resetToken}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    //user update password
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `/update-password`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage
            .getItem("token")
            ?.replace(/"/g, "")}`, // Example: Getting token from localStorage
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),

    //create
    create: builder.mutation({
      query: (data) => {
        let newUrl = "";
        let newTag;
        if (!data.url) {
          for (var key of data.entries()) {
            if (key[0] === "url") newUrl = key[1];
            if (key[0] === "tag") newTag = key[1].split(",");
          }
        } else {
          newTag = data.tag;
        }

        newTag.map((d) => tag.push(d));

        return {
          url: data.url ? data.url : newUrl,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("token")
              ?.replace(/"/g, "")}`, // Example: Getting token from localStorage
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
      },
      invalidatesTags: () => {
        return [...new Set(tag)];
      },
    }),

    //read
    read: builder.query({
      query: (data) => {
        data?.tag.map((d) => tag.push(d));
        return {
          url: data.url,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("token")
              ?.replace(/"/g, "")}`, // Example: Getting token from localStorage
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
      },
      providesTags: () => {
        return [...new Set(tag)];
      },
    }),

    //update
    update: builder.mutation({
      query: (data) => {
        let newUrl = "";
        let newTag;
        if (!data.url) {
          for (var key of data.entries()) {
            if (key[0] === "url") newUrl = key[1];
            if (key[0] === "tag") newTag = key[1].split(",");
          }
        } else {
          newTag = data.tag;
        }
        newTag.map((d) => tag.push(d));
        return {
          url: data.url ? data.url : newUrl,
          method: "PUT",
          body: data,
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("token")
              ?.replace(/"/g, "")}`, // Example: Getting token from localStorage
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
      },
      invalidatesTags: () => {
        return [...new Set(tag)];
      },
    }),

    //delete
    delete: builder.mutation({
      query: (data) => {
        data?.tag.map((d) => tag.push(d));
        return {
          url: data.url,
          method: "DELETE",
          body: data,
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("token")
              ?.replace(/"/g, "")}`, // Example: Getting token from localStorage
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
      },
      invalidatesTags: () => {
        return [...new Set(tag)];
      },
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserLogoutMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,

  useCreateMutation,
  useReadQuery,
  useUpdateMutation,
  useDeleteMutation,
  useLazyReadQuery,
} = apiSlice;
