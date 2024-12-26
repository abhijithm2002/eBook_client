import Api,{authInstance} from '../Api/axiosInstance';


export const refreshAccessToken = async() => {
    const response = await authInstance.post(`api/user/refresh-token`,{withCredentials: true})
    return response.data
}

export const createBook = async(formData, userId) => {
    console.log('userid',userId)
    const response = await authInstance.post(`api/user/createBook`,{...formData,userId});
    return response;
}

export const getMyBooks = async(userId) => {
    const response = await authInstance.get(`api/user/getMyBook/${userId}`);
    return response;
}

export const editBook = async(formData, bookId) => {
    const response = await authInstance.put(`api/user/updateBook/${bookId}`,formData);
    return response;
}

export const deleteBook = async(bookId) => {
    const response = await authInstance.delete(`api/user/deleteBook/${bookId}`);
    return response;
}

export const getAllBooks = async() => {
    const response = await authInstance.get(`api/user/getAllBooks`);
    return response;
}

export const searchBooks = async (query) => {
    try {
        const response = await authInstance.get(`api/user/searchBooks?q=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error searching books:', error);
        throw error;
    }
};

