<template>
  <v-form ref="form" v-model="valid" lazy-validation v-if="!isSingup">
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      hint="Your First Name"
      label="Name"
      outlined
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="emailS"
      :error-messages="emailSErrors"
      label="E-mail"
      hint="You'll be sent verification code to this email"
      outlined
      required
      @input="$v.emailS.$touch()"
      @blur="$v.emailS.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="passwordS"
      :error-messages="passwordSErrors"
      :append-icon="pasShow ? 'mdi-eye' : 'mdi-eye-off'"
      :type="pasShow ? 'text' : 'password'"
      label="Password"
      required
      outlined
      @input="$v.passwordS.$touch()"
      @blur="$v.passwordS.$touch()"
      @click:append="pasShow = !pasShow"
    ></v-text-field>
    <v-text-field
      v-model="ConfpasswordS"
      :error-messages="confpasswordSErrors"
      :append-icon="CpasShow ? 'mdi-eye' : 'mdi-eye-off'"
      :type="CpasShow ? 'text' : 'password'"
      label="Re-type the password"
      hint="Enter the above typed password"
      required
      outlined
      @input="$v.ConfpasswordS.$touch()"
      @blur="$v.ConfpasswordS.$touch()"
      @click:append="CpasShow = !CpasShow"
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[(v) => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
      color="success"
    ></v-checkbox>

    <v-btn
      :disabled="!valid && !checkbox"
      :loading="inloading"
      color="success"
      class="mr-4 mt-2"
      @click="Signup"
    >
      Signup
    </v-btn>

    <v-btn color="error" class="mr-4 mt-2" @click="reset">
      Reset Form
    </v-btn>
  </v-form>
</template>

<script>
import { aut, db } from "../../../fb";

import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  minLength,
  sameAs,
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    emailS: { required, email },
    passwordS: { required, minLength: minLength(8), maxLength: maxLength(16) },
    ConfpasswordS: { required, sameAsPassword: sameAs("passwordS") },
  },
  computed: {
    emailSErrors() {
      const errors = [];
      if (!this.$v.emailS.$dirty) return errors;
      !this.$v.emailS.email && errors.push("Must be valid e-mail");
      !this.$v.emailS.required && errors.push("E-mail is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    passwordSErrors() {
      var errors = [];
      if (!this.$v.passwordS.$dirty) return errors;
      !this.$v.passwordS.required && errors.push("Password is required");
      !this.$v.passwordS.minLength &&
        errors.push("Password should have atleast 8 Charecters");
      !this.$v.passwordS.maxLength &&
        errors.push("Password should have only have maximum of 16 Charecters");
      return errors;
    },
    confpasswordSErrors() {
      var errors = [];
      if (!this.$v.ConfpasswordS.$dirty) return errors;
      !this.$v.ConfpasswordS.required && errors.push("Password is required");
      !this.$v.ConfpasswordS.sameAsPassword &&
        errors.push("Password must be identical");
      return errors;
    },
  },
  data() {
    return {
      inloading: false,
      isSingup: false,
      emailS: null,
      passwordS: null,
      ConfpasswordS: null,
      pasShow: false,
      CpasShow: false,
      tab: null,
      valid: true,
      name: "",
      checkbox: false,
      login: {
        show: false,
      },
    };
  },
  methods: {
    Signup() {
      this.inloading = true;
      this.$refs.form.validate();
      aut
        .createUserWithEmailAndPassword(this.emailS, this.passwordS)
        .then(() => {
          db.collection("users")
            .doc(this.emailS)
            .set({
              email: this.emailS,
              name: this.name,
            })
            .then(() => {
              aut.currentUser.sendEmailVerification().then(() => {
                aut.currentUser.updateProfile({
                  displayName: this.name.toLowerCase(),
                  photoURL:
                    "https://firebasestorage.googleapis.com/v0/b/calender-k-project.appspot.com/o/user%20(1)%20(1)%20(1)%20(1)%20(1)%20(1)%20(1)%20(1).png?alt=media&token=d32d41ac-8022-4258-b5a8-c44e2dbde8b5",
                });
              });
            })
            .then(() => (this.$store.state.user = aut.currentUser));
        })
        .then(() => {
          this.inloading = false;
          this.$store.state.user = aut.currentUser;
          this.$store.route = "Dashboard.vue";
          this.$router.replace("/dashboard");
        }).catch(err=>{
            console.log(err)
        })
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style></style>
