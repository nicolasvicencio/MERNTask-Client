import axios from 'axios'
require('dotenv')

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL
});

export default axiosClient