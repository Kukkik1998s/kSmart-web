<template>
  <div class="container" style="margin-left:10%">
    <header class="jumbotron">
      <h1>
        Food
      </h1>
    </header>

<div class="table-responsive">
    <table class="table table-striped table-light table-bordered table-hover text-left">
    <thead>
    <tr> <th>Feild</th> <th>Information</th></tr>
      
      </thead>
      <tbody>
      <tr>
          <td>ID</td>
          <td>{{food.id}}</td>
          
      </tr>
      <tr>
          <td>Name</td>
          <td>{{food.name}}</td>
          
      </tr>
      <tr>
          <td>Category</td>
          <td> {{user.category}}</td>
          
      </tr>
      <tr>
          <td>Phosphorus</td>
          <td>{{user.phosphorus}}</td>
          
      </tr>      
      </tbody>
    </table>
</div>
  </div>
</template>

<script>
import UserService from '../service/user.service';
    export default {
        name: 'food',
        data () {
            return {
                id: '',
                name:'',
                category:'',
                phosphorus:'',                
            }
        },
        computed:{
            
        },
        created(){
          this.foodId=this.$route.params.foodId
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

          PatientService.getPatientMeal(this.username).then(
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
        },
       
    }
</script>