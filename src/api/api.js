import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:4000/'
});

export const getPizzasFromApi = (sortCriterion) => axiosInstance.get(
  `pizzas?_sort=${sortCriterion.nameField}&_order=${sortCriterion.order}`
);

export const getCategoriesFromApi = () => axiosInstance.get('categories');
export const getSizesFromApi = () => axiosInstance.get('pizzaSizes');
export const getDoughTypesFromApi = () => axiosInstance.get('doughTypes');
export const getSortCriteriaFromApi = () => axiosInstance.get('sortCriteria');
