
import axios from 'axios';

export const root_url = 'https://blogbackend-w9x2.onrender.com/'

const apiInstance = axios.create({
   
    baseURL: 'https://blogbackend-w9x2.onrender.com/api/',

    
    timeout: 50000, 

   
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json', 
    },
});


export default apiInstance;