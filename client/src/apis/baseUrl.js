import axios from 'axios';

export default axios.create({
    headers: { 'authorization': localStorage.getItem('token') }
});