import apiClient from './_axios';

const API_URL = import.meta.env.VITE_API_URL; // or from '@/constants'

interface TableUser {
   name: string;
   email: string;
   password: string;
   confirmPassword: string;
}

export const forgetPassword = async (data: { email: string }) => {
   const response = await apiClient.post('/auth-admin/forget-password', data);

   return {
      status: response.status,
      data: response.data,
   };
};

export const verifyResetPasswordToken = async (data: {
   token: string;
   userId: string;
}) => {
   console.log(data.token);
   const response = await apiClient.post(
      '/auth-admin/verify-pass-reset-token',
      data
   );

   // console.log(`response--`, response);
   return {
      status: response.status,
      data: response.data,
   };
};

export const updatePassword = async (data: {
   token: string;
   userId: string;
   password: string;
}) => {
   const response = await apiClient.post('/auth-admin/update-password', data);
   console.log(`response--`, response);
   return {
      status: response.status,
      data: response.data,
   };
};

export const signUp = async (data: TableUser) => {
   const response = await apiClient.post(
      '/auth-admin/create-owner-account',
      data
   );
   return {
      status: response.status,
      data: response.data,
   };
};

export const verifyEmail = async (data: { otp: string; userId: string }) => {
   // console.log(`data--`, data);

   const response = await apiClient.post('/auth-admin/verify-email', data);

   // console.log(`response--`, response);
   return {
      status: response.status,
      data: response.data,
   };
};

export const signIn = async (data: { email: string; password: string }) => {
   const response = await apiClient.post('/auth-admin/signin', data);
   // console.log(`response auth--`, response);

   return {
      status: response.status,
      data: response.data,
      // data: response.data,
   };
};

export const getProfile = async () => {
   const response = await apiClient.get('/auth-admin/is-auth');
   return {
      status: response.status,
      data: response.data,
   };
};
