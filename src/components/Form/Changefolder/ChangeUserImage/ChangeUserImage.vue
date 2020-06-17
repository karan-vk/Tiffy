<template>
  <v-card class="pa-6">
    <h1>Change Your Profile picture</h1>

    <v-row>
      <v-file-input
        outlined
        accept="image/*"
        @change="reset"
        v-model="selectedFile"
        label="File input"
        class="px-5"
      >
      </v-file-input
      ><v-progress-circular
        v-if="completed"
        :value="completed"
        class="mr-2 px-5"
        button
        size="40"
        ><div class="progimg">{{ completed }}</div>
      </v-progress-circular>
    </v-row>
    <!-- <v-img :src="dataUrl">

  </v-img> -->
    <v-btn
      class=" pa-10 white--text"
      :color="color"
      @click="uploadImage"
      style="height:200;width:100%"
      :disabled="selectedFile == null"
    >
      <v-icon class="px-3">mdi-cloud-upload</v-icon>
      Upload
    </v-btn>
  </v-card>
</template>

<script>
import "firebase/storage";
import { fb, aut, db } from "../../../../fb";

export default {
  data() {
    return {
      selectedFile: null,
      completed: null,
      color: "red",
      local: null,
    };
  },
  computed: {
    dataUrl(event) {
      return (
        +URL.createObjectURL(event) +
        btoa(
          new Uint8Array(this.local).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        )
      );
    },
  },
  methods: {
    reset(event) {
      (this.completed = null), (this.color = "red");
      
    },
    uploadImage() {
      console.log(aut.currentUser.uid);
      if (this.selectedFile) {
        let file = this.selectedFile;

        var storageRef = fb
          .storage()
          .ref("users/" + aut.currentUser.uid + "/pro");

        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.completed = progress.toFixed(0);
            if (progress > 25) {
              this.color = "orange";
            }
            if (progress > 50) {
              this.color = "yellow";
            }
            if (progress >= 100) {
              this.color = "green";
            }
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              db.collection("users")
                .doc(aut.currentUser.email)
                .update({
                  image: downloadURL,
                })
                .then(() => {
                  aut.currentUser
                    .updateProfile({
                      photoURL: downloadURL,
                    })
                    .then(() => console.log(downloadURL));
                });
            });
          }
        );
      }
    },
  },
};
</script>

<style>
.progimg {
  font-size: 15px;
}
</style>
