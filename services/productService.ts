import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api'

export const getProducts = async (page = 1, limit = 20) => {
  const response = await axios.get(`${API_BASE_URL}/products`, {
    params: { page, limit },
  })
  return response.data
}

export const searchProducts = async (term = '') => {
  const response = await axios.get(
    `${API_BASE_URL}/products/search?term=${term}`
  )
  return response.data
}

export const updateProducts = async (id, body) => {
  const response = await axios.patch(`${API_BASE_URL}/products/${id}`, body)
  return response
}
