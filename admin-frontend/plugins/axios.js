import axios from 'axios'

export default axios.create({
  BASEURL: process.env.apiUrl
})

///