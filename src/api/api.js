import axios from 'axios';


const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1:4000/',
    withCredentials:true,
})

export const  getPizzasFromApi = (sortCriteria) => {
       return axiosInstance.get(`pizzas?_sort=${sortCriteria.nameField}&_order=${sortCriteria.order}`);
}

export const getCategoriesFromApi = () => {
    return axiosInstance.get('categories');
}
export const getSizesFromApi = () => {
    return axiosInstance.get('pizzaSizes');
}
export const getDoughTypesFromApi = () => {
    return axiosInstance.get('doughTypes');
}

export const getSortCriteriaFromApi = () => {
    return axiosInstance.get('sortCriteria');
}