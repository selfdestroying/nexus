import { api } from '../../instance'

export const requestCategories = () => api.get('categories')
