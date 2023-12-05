import axios from 'axios'

const baseURL = process.env.SITE_URL

export default axios.create({
    baseURL
})