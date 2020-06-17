<template>
<div>
  
    <v-dialog max-width="700px" v-model="dialog">
      <template v-slot:activator="{ on }">
        <v-btn 
        
        text v-on="on" class="success">{{btnPlaceholder}}</v-btn>
      </template>
      <Newproject @projectAdded="snack" @dClose="close" />
      
    </v-dialog>
</div>
</template>

<script>

export default {
  props:["btnPlaceholder"],
  components:{Newproject:()=>import('./Form/NewProject/NewProject')},
  data() {
    return {
      dialog: false,
      snackbar:false
    }
  },
  methods: {
    close(){
      return this.dialog=false
    },
    snack(){
      this.$emit("snakbar")
    }
  },
  
  };
</script>
