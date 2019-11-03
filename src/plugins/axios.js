/**
 * Created by PhpStorm.
 * User: Balogun Wahab
 * Date: 10/1/19
 * Time: 10:05 PM
 */
import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'https://us-central1-kruise-ec380.cloudfunctions.net/api'
});

export default axiosInstance;
