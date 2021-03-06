import axios from 'axios'
const baseUrl = '/api/animes'
import storage from '../utils/storage'

const getConfig=() => {
  return{
    headers:{
      Authorization:`bearer ${storage.loadUser().token}`
    }
  }
}

const getAll=() => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create=anime => {
  const request=axios.post(baseUrl,anime,getConfig())
  return request.then(response => response.data)
}

const update = (anime) => {
  const request = axios.put(`${baseUrl}/${anime.id}`, anime, getConfig())
  return request.then(response => response.data)
}

const comment= (id,comment) => {
  const request=axios.post(`${baseUrl}/${id}/comments`,{ comment }, getConfig() )
  return request.then(response => response.data)
}

const remove=(id) => {
  const request = axios.delete(`${baseUrl}/${id}`, getConfig())
  return request.then(response => response.data)
}

const obj={ getAll, create, update ,remove, comment }
export default obj