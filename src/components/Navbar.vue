<template>
  <div>
    <v-navigation-drawer
    class="primary "
    v-model="show"
    :clipped="primaryDrawer.clipped"
    :floating="primaryDrawer.floating"
    :mini-variant="primaryDrawer.mini"
    :temporary="primaryDrawer.type === 'temporary'"
    app
    overflow
  >
    <v-col align="center">
      <v-flex class="mt-6">
        <Userimage  size="110" />

        <p class="white--text headline mt-1">
          {{ Dispname }}
        </p>
      </v-flex>
      <v-flex class="mt-4 mb-3 text-center">
        <popup
          btnPlaceholder="Add new Project"
          @snakbar="snack"
        />
      </v-flex>
    </v-col>
    <v-list nav>
      <v-divider></v-divider>

      <v-list-item
        v-for="item in items"
        :key="item.title"
        router
        :to="item.route"
      >
        <v-list-item-icon>
          <v-icon class="white--text">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="white--text">{{
            item.title
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="white--text">
        <v-list-item-icon>
          <v-btn text fab color="black">
            <v-icon>mdi-brightness-6 </v-icon>
          </v-btn>
          <v-list-item-title class="white--text">
            <v-switch
              block
              inset
              color="black"
              class="mx-4"
              v-model="$vuetify.theme.dark"
              primary
              label="Dark"
            ></v-switch>
          </v-list-item-title>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
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
export default {
  components: {
    popup:()=>import('./Popup'),
    Snackbar: () => import("./UI/Snackbar/Snackbar"),
    Userimage: () => import("./UI/UserImage/Userimage"),
    userImage:()=>import("./UI/UserImage/Userimage")
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
  created() {
    this.imgurl = aut.currentUser.photoURL;
  },
  computed: {
    Dispname() {
      setTimeout(() => {
        this.name = this.$store.state.user.displayName.toUpperCase();
      }, 1000);
      return this.name;
    },
    
  },
  mounted() {
    console.log("mounted")
    
  },
};
</script>

<style></style>
