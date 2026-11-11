import apiClient from './apiClient';

const categoriesUrl = import.meta.env.VITE_CATEGORIES_API_URL || `${import.meta.env.VITE_API_URL}/categories`;
const storageKey = 'orchid-categories';
const getLocalCategories = () => JSON.parse(localStorage.getItem(storageKey) || '[]');
const saveLocalCategories = (items) => localStorage.setItem(storageKey, JSON.stringify(items));

export const getCategories = async () => {
  try { return await apiClient.get(categoriesUrl); } catch (error) {
    if (error.response?.status !== 404) throw error;
    return { data: getLocalCategories() };
  }
};
export const createCategory = async (category) => {
  try { return await apiClient.post(categoriesUrl, category); } catch (error) {
    if (error.response?.status !== 404) throw error;
    const item = { ...category, id: crypto.randomUUID() };
    saveLocalCategories([...getLocalCategories(), item]);
    return { data: item };
  }
};
export const updateCategory = async (id, category) => {
  try { return await apiClient.put(`${categoriesUrl}/${id}`, category); } catch (error) {
    if (error.response?.status !== 404) throw error;
    const item = { ...category, id };
    saveLocalCategories(getLocalCategories().map((current) => current.id === id ? item : current));
    return { data: item };
  }
};
export const deleteCategory = async (id) => {
  try { return await apiClient.delete(`${categoriesUrl}/${id}`); } catch (error) {
    if (error.response?.status !== 404) throw error;
    saveLocalCategories(getLocalCategories().filter((item) => item.id !== id));
    return { data: null };
  }
};
