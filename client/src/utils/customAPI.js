
import axios from 'axios'


const customFetch = axios.create({
  baseURL: 'https://mern-blog-api-g89f.onrender.com/api/v1',
})


export default customFetch