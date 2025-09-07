import apiClient from './_axios';

export const getWebServers = async () => {
   const response = await apiClient.get('/server/get-web-servers');
   console.log(`response--`, response);
   return response.data;
};
