import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:4000/",
});

export const getPizzasFromApi = (sortCriterion) => {
  return axiosInstance.get(
    `pizzas?_sort=${sortCriterion.nameField}&_order=${sortCriterion.order}`
  );
};

export const getCategoriesFromApi = () => {
  return axiosInstance.get("categories");
};
export const getSizesFromApi = () => {
  return axiosInstance.get("pizzaSizes");
};
export const getDoughTypesFromApi = () => {
  return axiosInstance.get("doughTypes");
};

export const getSortCriteriaFromApi = () => {
  return axiosInstance.get("sortCriteria");
};
