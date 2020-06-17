<template>
  <div>
    <Drawer @snackbar="snack" v-bind:show="show" />
    <Snackbar type="success" v-bind:snackbar="snackbarSuccess">{{
      snackbarMessage
    }}</Snackbar>

    <v-app-bar :clipped-left="primaryDrawer.clipped" app flat>
      <!-- <v-snackbar v-model="snakbar1" :timeout="4000" color="success">
        
        <v-btn text color="white" @click="snakbar1 = false">Close</v-btn>
      </v-snackbar> -->
      <v-app-bar-nav-icon
        class="grey--text"
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="show = !show"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Todo</span>
        <span>Karan</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <Userimage size="36" />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark text v-on="on">
            <span>{{ name }}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            router
            :to="item.route"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn text color="grey" @click="logout">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { aut } from "../fb";
import Drawer from "./UI/Navigation Drawer/NavigationDrawer.vue";
export default {
  components: {
    Drawer: Drawer,
    Snackbar: () => import("./UI/Snackbar/Snackbar"),
    Userimage: () => import("./UI/UserImage/Userimage"),
  },
  data: () => {
    return {
      imgurl: null,
      name: aut.currentUser.displayName.toUpperCase(),
      show: false,
      drawers: ["Default (no property)", "Permanent", "Temporary"],
      primaryDrawer: {
        type: "default (no property)",
        clipped: false,
      },
      snackbarSuccess: true,
      snackbarMessage:
        "Welcome " + aut.currentUser.displayName.toUpperCase() + " !!! 🎉",

      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", route: "/dashboard" },
        { title: "My Projects", icon: "mdi-folder", route: "/project" },
        { title: "Team", icon: "mdi-account-multiple", route: "/team" },
      ],

      isAuth: aut.currentUser !== null,
    };
  },
  methods: {
    snack() {
      this.snackbarMessage = "Project Successfully added !! 👍";
      this.snackbarSuccess = true;
    },
    logout() {
      localStorage.removeItem("user");

      aut
        .signOut()
        .then(() => {
          this.$store.state.user = null;
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
