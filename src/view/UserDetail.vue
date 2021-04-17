<template>
  <div class="container" style="margin-left:10%">
    <header class="jumbotron">
      <h1>
        <strong>{{username}}'s</strong> Profile
      </h1>
    </header>
    
  <!--  <p>
      <strong>Id:</strong>
      {{user.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{user.user.email}}
    </p>
  
    <p>
      <strong>Name:</strong>
      {{user.name}} {{user.lastname}}
    </p>
    <p>
      <strong>Gender:</strong>
      {{user.gender}}
    </p>
    <p>
      <strong>CKD Stage:</strong>
      {{user.ckdPhase}}
    </p>
    <p>
      <strong>GFR:</strong>
      {{user.weight}}
    </p>
     <p>
      <strong>Weight:</strong>
      {{user.height}}
    </p>
     <p>
      <strong>Height:</strong>
      {{user.gfr}}
    </p>
    <p>
      <strong>BD:</strong>
      {{user.birthdate.toString().substring(-6,10)}}
    </p>
    <p>
      <strong>Age:</strong>
      {{age}}
    </p>
    <p>
      <strong>Address:</strong>
      {{user.address}}
    </p>
    <p>
      <strong>Phone No.:</strong>
      {{user.phoneNo}}
    </p>-->

<div class="table-responsive">
    <table class="table table-striped table-light table-bordered table-hover text-left">
    <thead>
    <tr> <th>Feild</th> <th>Information</th></tr>
      
      </thead>
      <tbody>
      <tr>
          <td>ID</td>
          <td>{{user.id}}</td>
          
      </tr>
      <tr>
          <td>Email</td>
          <td>{{user.user.email}}</td>
          
      </tr>
      <tr>
          <td>Full Name</td>
          <td>{{user.name}} {{user.lastname}}</td>
          
      </tr>
      <tr>
          <td>Gender</td>
          <td> {{user.gender}}</td>
          
      </tr>
      <tr>
          <td>Weight</td>
          <td>{{user.weight}}</td>
          
      </tr>
      <tr>
          <td>Height</td>
          <td>{{user.height}}</td>
          
      </tr>
      <tr>
          <td>CKD Stage</td>
          <td>{{user.ckdPhase}}</td>
          
      </tr>
      <tr>
          <td>GFR</td>
          <td>{{user.gfr}}</td>
          
      </tr>
      <tr>
          <td>Birthdate</td>
          <td>{{user.birthdate}}</td>
          
      </tr>
      <tr>
          <td>Age</td>
          <td>{{getAge}}</td>
          
      </tr>
      <tr>
          <td>Address</td>
          <td>{{user.address}}</td>
          
      </tr>
      <tr>
          <td>Phone No.</td>
          <td>{{user.phoneNo}}</td>
          
      </tr>
      </tbody>
    </table>
    </div>

    <br><hr><br>
    <h3>Meals record</h3>
    <table>
      <tr>
        <td>from:<input type="date" v-model="mealStart" @change="mealListHandler"/></td>
        <td>to:<input type="date" v-model="mealEnd" @change="mealListHandler"/></td>
      </tr>
    </table>
 <div class="table-responsive">
     <table class="table table-striped table-light table-bordered table-hover text-center" id="dataTable" width="100%" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Time</th>
          <th>Meal Type</th>
          <th>Note</th>
          <th>Food</th>
          <th>Total Phosphorus</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="meal in meals" v-if="user.name!=null">
      <td>{{meal.id}}</td>  
      <td>{{meal.datetime.toString().substring(-6,10)}}</td>
			<td>{{meal.datetime.toString().substring(11,16)}}</td>
      <td>{{meal.mealType}}</td>
      <td>{{meal.note}}</td>
      <td v-for="f in meal.dishes"><ui><li>{{f.name}} Phosphorus: {{f.phosphate}}</li></ui></td>
      <td>{{meal.totalPhosphate}}</td>
		</tr>
      </tbody>
    </table>
    </div>

     <br><hr><br>
    <h3>Statistics (Phosphorus intaking)</h3>
 <div class="table-responsive">
    <table class="table table-striped table-light table-bordered table-hover text-center" id="dataTable" width="100%" cellspacing="0">
      <thead>
        <tr>
          <th>Min</th>
          <th>Max</th>
          <th>Mean</th>
        </tr>
      </thead>
      <tbody>
    <tr>
      <td>{{min}}</td>
      <td>{{max}}</td>
      <td>{{mean}}</td>
		</tr>
      </tbody>
    </table>
    </div>
    <br>
    </div>
</template>

<script>
import UserService from '../service/user.service';
import PatientService from '../service/patient.service';

    export default {
        name: 'view',
        data () {
            var today = new Date();
            return {
                user: null,
                content:'',
                username:'',
                //age:22,
                meals:[],
                min: 240,
                max: 240,
                mean: 240,
                mealStart: today.toISOString().substr(0, 10),
                mealEnd: today.toISOString().substr(0, 10),
            }
        },
        computed:{
            getAge: function(){
              if(!this.user)
                return 0;
              else
              {
                console.log(this.user);
                var today = new Date();                
                var birthday = new Date(this.user.birthdate.toString().substring(0,10));
                console.log(birthday);
                var difference= Math.abs(today-birthday);
                var age = difference/(1000 * 3600 * 24*365)
                console.log(age)
                return Math.round(age);
              }
              
            },
            getStatistic: function(){
              var phos = [];
              let sum = 0;
              for(let i=0;i<meals.length;i++){
                  phos[i] = meals[i].totalPhosphate;
                  sum+=meals[i].totalPhosphate;
              }

              this.min = Math.min(phos);
              this.max = Math.max(phos);
              this.mean = (sum*1.0)/meals.length;
            }

        },
        created(){
          this.username=this.$route.params.username
        },
        mounted() {
          UserService.getPatientDetail(this.username).then(
            response => {
              this.user = response.data;
            },
            error => {
              this.content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );

          UserService.getPatientMeal(this.username,this.mealStart,this.mealEnd).then(
            response => {
              this.meals = response.data;
            },
            error => {
              this.content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        },
        methods: {
            navigate() {
                router.go(-1);
            },
            mealListHandler() {
              UserService.getPatientMeal(this.username,this.mealStart,this.mealEnd).then(
                response => {
                this.meals = response.data;
              },
              error => {
                this.content =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
              });              
            }
        },
       
    }
</script>