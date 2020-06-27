<template>
  <v-btn class="mr-4 mt-2" :loading="inloading" outlined fab @click="gitLogin"
    ><v-icon size="36">mdi-github</v-icon></v-btn
  >
</template>

<script>
import { aut, gitLogin,db } from "../../../fb";
export default {
    data() {
        return {
            inloading:false
        }
    },
  methods: {
    gitLogin() {
        this.inloading =true
      const provider = gitLogin;
      aut
        .signInWithPopup(provider)
        .then((result) => {
            console.log(result)
          db.collection("users")
            .doc(result.user.email)
            .get()
            .then((doc) => {
              if (doc.exists) {
                console.log("Already signed up");
                this.$store.state.user = aut.currentUser;
              } else {
                console.log("new Git user");
                db.collection("users")
                  .doc(result.user.email)
                  .set({
                    email: result.user.email,
                    name: result.user.displayName,
                  })

                  .then(() => (this.$store.state.user = aut.currentUser));
              }
            });
        })
        .then(() => {
          console.log("successfull");
          this.inloading = false;
          this.$store.state.user = aut.currentUser;
          this.$router.push("/dashboard");
        })
        .catch(function(error) {
          // Handle Errors here.
          console.log(error)
          var errorCode = error.code;
          if (error.code=="auth/popup-closed-by-user") {
              this.inloading=false
              
          }
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
  },
};
</script>

<style></style>
