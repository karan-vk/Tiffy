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

          <v-tab>
            Signup
            <v-icon>mdi-heart</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="text-center mt-8 pa-6">
          <v-tab-item>
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

              <v-btn color="error" class="mr-4 mt-2" @click="reset">
                Reset Password
              </v-btn>
            </v-form>
          </v-tab-item>
          <v-tab-item>
            <v-form ref="form" v-model="valid" lazy-validation v-if="!isSingup">
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                :counter="10"
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
                counter
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
                counter
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
              ></v-checkbox>

              <v-btn
                :disabled="!valid"
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
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { aut, db } from "../fb";
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
    email: { required, email },
    emailS: { required, email },
    password: { required, minLength: minLength(8), maxLength: maxLength(16) },
    passwordS: { required, minLength: minLength(8), maxLength: maxLength(16) },
    ConfpasswordS: { required, sameAsPassword: sameAs("passwordS") },
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
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
      inloading:false,
      isSingup: false,
      emailS: null,
      passwordS: null,
      ConfpasswordS: null,
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
    };
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    Login() {
      this.inloading=true

      this.$refs.form.validate();
      aut.signInWithEmailAndPassword(this.email, this.password).then(() => {
        console.log("hello");
        this.$store.state.user = aut.currentUser;
        this.$router.replace("/dashboard");
        this.inloading=false
        this.$store.state.snackbar1=true
      });
    },
    Signup() {
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
            }).then(()=>this.$store.state.user = aut.currentUser);
        })
        .then(() => {
          console.log("hello");
          this.$store.state.user = aut.currentUser;
          this.$store.route = "Dashboard.vue";
          this.$router.replace("/dashboard");
        });
    },
  },
};
</script>

<style></style>
