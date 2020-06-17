<template>
  <v-layout row wrap justify-space-around>
    <v-flex md6 sm11 xs11>
           

      <v-card class="my-6">
        <v-tabs
          v-model="tab"
          background-color="deep-purple accent-4"
          centered
          dark
          icons-and-text
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab>
            Signin
            <v-icon>mdi-phone</v-icon>
          </v-tab>

          <v-tab @click="isSignup = true">
            Signup
            <v-icon>mdi-heart</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="text-center mt-8 pa-6">
          <v-tab-item>
            <Signin />
          </v-tab-item>
          <v-tab-item>
            <!-- <v-lazy
              v-model="Signup"
              :options="{
                threshold: 0.5,
              }"
              min-height="400px"
              transition="fade-transition"
            > -->
              <Signup />
            <!-- </v-lazy> -->
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

import Signup from "../components/Form/NewUser/NewUser"
import Signin from "../components/Form/Signin/Signin"


export default {
  components: { Signup: Signup,
  Signin:Signin
  
  },
  

  

  data() {
    return {
      Signup: false,
      inloading: false,
      isSingup: false,
      pasShow: false,
      CpasShow: false,
      tab: null,
      login: {
        show: false,
      },
      valid: true,
      name: "",
      email: "",
      password: "",
      select: null,
      checkbox: false,
      error: null,
      snackbarError: false,
    };
  },

  
};
</script>

<style></style>
