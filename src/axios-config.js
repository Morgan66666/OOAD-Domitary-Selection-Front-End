// src/axios-config.js

import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:8081',
    headers: {

    },
    // 其他你想要设置的默认值
});

export default instance;
