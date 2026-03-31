import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
})

export const getBeneficiarios = () => api.get('/beneficiarios')
export const getBeneficiario = (id) => api.get(`/beneficiarios/${id}`)
export const createBeneficiario = (data) => api.post('/beneficiarios', data)
export const updateBeneficiario = (id, data) => api.put(`/beneficiarios/${id}`, data)
export const deleteBeneficiario = (id) => api.delete(`/beneficiarios/${id}`)