<template>
  <v-btn class="mr-4 mt-2" outlined fab color="green" :loading="inloading" shaped @click="gLogin"><v-icon size=32>mdi-google</v-icon></v-btn>
</template>

<script>
import { aut, db, glogin } from "../../../fb";
export default {
    data() {
        return {
            inloading:false
        }
    },
    methods: {
        gLogin() {
      var provider = glogin;
      aut
        .signInWithPopup(provider)
        .then((result) => {
          db.collection("users").doc(result.user.email).get().then(doc=>{
            if(doc.exists){
              console.log("Already signed up")
              this.$store.state.user = aut.currentUser
            }
            else{
              console.log("new G user")
              db.collection("users")
            .doc(result.user.email)
            .set({
              email: result.user.email,
              name: result.user.displayName,
            })

            .then(() => (this.$store.state.user = aut.currentUser));
            }
          })
        })
        .then(() => {
          console.log("successfull")
          this.inloading = false;
          this.$store.state.user = aut.currentUser;
          this.$router.push("/dashboard");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
    },

}
</script>

<style>

</style>