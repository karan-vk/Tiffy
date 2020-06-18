<template>
  <div>
    <Snackbar type="error" v-bind:snackbar="snackbarError">
      {{ error }}
    </Snackbar>
    <v-form ref="form" v-model="valid" lazy-validation v-if="!isSingup">
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        outlined
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        :append-icon="login.show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="login.show ? 'text' : 'password'"
        label="Password"
        required
        outlined
        @keypress.enter="Login"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
        @click:append="login.show = !login.show"
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        :loading="inloading"
        color="success"
        class="mr-4 mt-2"
        @click="Login"
      >
        Login
      </v-btn>
      <GSign />
      <GitSign />

      <v-btn color="error" class="mr-4 mt-2" @click="reset">
        Reset Password
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { aut } from "../../../fb";
import Snackbar from "../../UI/Snackbar/Snackbar";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  minLength,
} from "vuelidate/lib/validators";
import Gsign from '../../Auth/GoogleSignin/GoogleSignin';
import GitSignin from "../../Auth/GitAuth/GitAuth"
export default {
  components: { Snackbar: Snackbar,GSign:Gsign,GitSign:GitSignin },
  mixins: [validationMixin],
  validations: {
    email: { required, email },

    password: { required, minLength: minLength(8), maxLength: maxLength(16) },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },

    passwordErrors() {
      var errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      !this.$v.password.minLength &&
        errors.push("Password should have atleast 8 Charecters");
      !this.$v.password.maxLength &&
        errors.push("Password should have only have maximum of 16 Charecters");
      return errors;
    },
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
  methods: {
    snackf() {},
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    Login() {
      this.inloading = true;

      this.$refs.form.validate();
      aut
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // console.log("hello");
          this.$store.state.user = aut.currentUser;
          this.$router.replace("/dashboard");
          this.inloading = false;
          this.$store.state.snackbar1 = true;
        })
        .catch((err) => {
          console.log(err);
          switch (err.code) {
            case "auth/user-not-found":
              this.error = "User does not exist";
              this.snackbarError = true;
              break;
            case "auth/wrong-password":
              this.error = "Incorrect Password";
              this.snackbarError = true;
              break;
            default:
              this.error = "something went wrong";
              this.snackbarError = true;
          }
          this.inloading = false;
        });
      setTimeout(() => {
        this.error = null;
        this.snackbarError = false;
      }, 5000);
    },
    
  },
};
</script>

<style></style>
