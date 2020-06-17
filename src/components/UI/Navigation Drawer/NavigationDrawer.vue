<template>
  <v-navigation-drawer
    class="primary "
    v-model="ShowNav"
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
</template>

<script>
import { aut } from "@/fb";
export default {
    props:["show"],
  components: { popup: () => import("../../Popup"),Userimage:()=>import('../UserImage/Userimage') },
  data: () => {
    return {
      imgurl: null,
      name: null,
      drawers: ["Default (no property)", "Permanent", "Temporary"],
      primaryDrawer: {
        
        type: "default (no property)",
        clipped: false,
        
      },
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", route: "/dashboard" },
        { title: "My Projects", icon: "mdi-folder", route: "/project" },
        { title: "Team", icon: "mdi-account-multiple", route: "/team" },
      ],
      
     

    };
  },
  methods: {
      snack(){
          
          this.$emit("snackbar")
      }
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
    ShowNav:{
        get(){
            return this.show
        },
        set(){
            this.show
        }
    }
  },
};
</script>

<style></style>
