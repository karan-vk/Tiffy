import { aut, db, glogin } from "../../../fb";
// import Router from "../../../router/index"
// import store from "../../../store/index"



const Glogin = () => {
  console.log("glogin");
  var userget = null;
  var provider = glogin;
  aut
    .signInWithPopup(provider)
    .then((result) => {
      db.collection("users")
        .doc(result.user.email)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Already signed up");
            // store.state.user = aut.currentUser;
          } else {
            console.log("new G user");
            db.collection("users")
              .doc(result.user.email)
              .set({
                email: result.user.email,
                name: result.user.displayName,
              });

            //   .then(() => (store.state.user = aut.currentUser));
          }
        });
    })
    .then(() => {
      userget = aut.currentUser;
    })
    .catch(function(error) {
      console.log(error);

      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

 return userget 
}

export default Glogin;
