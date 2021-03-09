import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'https://ksmart-springboot-mongodb.herokuapp.com/api/test/';
const API_GET = 'http://localhost:8080/api/get/';

class PatientService {
    getPatientMeal(username){
        return axios.get(API_GET+'patient/meal?username='+username, {headers: authHeader()});
      }
    
}

export default new PatientService();