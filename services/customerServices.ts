import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api'

export const searchCustomers = async (term = '') => {
  const response = await axios.get(
    `${API_BASE_URL}/customers/search?term=${term}`
  )
  return response.data
}

export const getBalance = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/customers/${id}/balance`)
  return response.data
}
