// src/axios-config.js

import axios from 'axios';


const instance = axios.create({
    // baseURL: 'https://api.cxpcn.site',
    baseURL: 'https://api.cxpcn.site',
    headers: {

    },
    // 其他你想要设置的默认值
});

export default instance;
