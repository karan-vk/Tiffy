import fire from "firebase/app";
import "firebase/firestore";
import  "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCcm1bZQ6TioV7qRVPiDCUYeHaODk7Yqps",
  authDomain: "calender-k-project.firebaseapp.com",
  databaseURL: "https://calender-k-project.firebaseio.com",
  projectId: "calender-k-project",
  storageBucket: "calender-k-project.appspot.com",
  messagingSenderId: "625707313407",
  appId: "1:625707313407:web:b3b1540ba9a6708cf344ca",
};
export const gitLogin =new fire.auth.GithubAuthProvider()
export const glogin = new fire.auth.GoogleAuthProvider()
export const fb = fire.initializeApp(firebaseConfig);
export const aut = fb.auth();
// fire
//   .auth()
//   .setPersistence(fire.auth.Auth.Persistence.LOCAL)
//   .then(()=>console.log("Persistence successfull")
//   )
//   .catch((err) => console.log(err));

  // aut.onAuthStateChanged((user) => {
  //   if (user) {
  //     // this.$store.state.user = aut.currentUser;
  //   }
  // })


export const db = fire.firestore();
db.enablePersistence().catch((err) => {
  if (err.code == "failed-precondition") {
    console.log("persistence failed");
  } else if (err.code == "unimplemented") {
    console.log("persistence is not available");
  }
});


// var provider = new fb.auth()