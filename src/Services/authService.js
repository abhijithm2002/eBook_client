import Api, {authInstance} from '../Api/axiosInstance';

export const userSignup = async(userData) => {
    const response = await authInstance.post(`/api/user/userSignup`, userData);
   return response
}

export const userLogin = async(userData) => {
    const response = await authInstance.post(`/api/user/userLogin`, userData);
    return response;
}