import axios from 'axios';

const dbapi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL
});

export default dbapi;