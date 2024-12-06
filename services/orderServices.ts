import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api'

export const createOrder = async (body) => {
  const response = await axios.post(`${API_BASE_URL}/orders`, body)
  return response
}

export const getAllOrders = async (page = 1, limit = 20) => {
  const response = await axios.get(`${API_BASE_URL}/orders`, {
    params: { page, limit },
  })
  return response.data
}
