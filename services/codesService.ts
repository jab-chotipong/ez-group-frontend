import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api'

export const verifyCode = async (code: string) => {
  const response = await axios.get(`${API_BASE_URL}/codes/verify?code=${code}`)
  return response.data
}

export const getAllCodes = async () => {
  const response = await axios.get(`${API_BASE_URL}/codes`)
  return response.data
}
