//data service

import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'http://localhost:8080/api/test/';
const API_URL = 'https://ksmart-springboot-mongodb.herokuapp.com/api/test/';
//const API_GET = 'http://localhost:8080/api/get/';
const API_GET = 'https://ksmart-springboot-mongodb.herokuapp.com/api/get/';
const BASE_URL = 'https://ksmart-springboot-mongodb.herokuapp.com/api/';
class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'doctor', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getPatient(){
    return axios.get(API_GET+'patients', {headers: authHeader()});
  }

  getDoctor(){
    return axios.get(API_GET+'doctors', {headers: authHeader()});
  }

  getPatientDetail(username){
    return axios.get(API_GET+'this/patient?username='+username, {headers: authHeader()});
  }

  getFoods() {
    return axios.get(BASE_URL+"meal/foods",{headers: authHeader()});
  }
  
  getFood(id) {
    return axios.get(BASE_URL+"meal/foods/"+id,{headers: authHeader()});
  }  

}

export default new UserService();