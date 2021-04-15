<template>
  <div class="container" style="margin-left:10%">
    <header class="jumbotron">
      <h1>
        Food
      </h1>
    </header>
    <div class="submit-form">
    <div>
      <div class="form-group">
        <label for="name">name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="food.name"
          name="name"
        />
      </div>
      <div class="form-group">
        <label for="category">category</label>
        <input
          type="text"
          class="form-control"
          id="category"
          required
          v-model="food.category"
          name="category"
        />
      </div>
      <div class="form-group">
        <label for="description">phosphate</label>
        <input
          type="number"
          class="form-control"
          id="phosphate"
          required
          v-model="food.phosphate"
          name="phosphate"
        />
      </div>

      <button @click="submitFood" class="btn btn-success">Submit</button>
    </div>    
  </div>
<!--
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
          <td> {{food.category}}</td>
          
      </tr>
      <tr>
          <td>Phosphorus</td>
          <td>{{food.phosphate}}</td>
          
      </tr>      
      </tbody>
    </table>
</div>
-->
  </div>
</template>

<script>
import UserService from '../service/user.service';
    export default {
        name: 'food',
        data () {
            return {
                food : {
                  "id":"",
                  "name":"",
                  "category":"",
                  "phosphorus":""
                }
            }
        },
        computed:{
            
        },
        created(){
          this.foodId=this.$route.params.foodId
        },
        mounted() {
          UserService.getFood(this.foodId).then(
            response => {
              this.food = response.data;
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
            submitFood() {              
              /*
              var data = {                
                "id": this.food.id,
                "name": this.food.name,
                "ingredients": this.food.ingredients,
                "category": this.food.category,
                "phosphate": this.food.phosphate,
                "latestUpdate": this.food.latestUpdate,                
              };
              */
              UserService.saveFood(this.food).then(
                response => {
                  this.tutorial.id = response.data.id;
                  console.log(response.data);
                  router.go(-1);
                },
                error => {
                  this.content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                })
              .catch(e => {
                console.log(e);
               });
            }
        },       
       
    }
</script>