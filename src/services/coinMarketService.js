import axios from 'axios';
import { config } from '../config';

const url = config.apiUrl2

const verifyConect = async () => {
  /* const token = JSON.parse(localStorage.getItem("token")) */
  const { data } = await axios.get(`${url}/coinmarketcap`)
  return data
}

function verifyConect2() {
  return fetch(`${url}/coinmarketcap`)
    .then(res => res.json())
    .then(res => res.data)
}


//consultar las monedas especificas
const consultQuotes = async () => {
  /* const token = JSON.parse(localStorage.getItem("token")) */
  const { data } = await axios.get(`${url}/coinmarketcap/quotes`)
  return data
}

export {
    verifyConect,
    verifyConect2,
    consultQuotes
}