<template>
  <v-app id="" class="grey lighten-4">
    <Navbar v-if="isNavShow"></Navbar>

    <v-content class="mx-6  mb-4 ">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>

    <v-footer :inset="footer.inset" app>
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
// import Navbar from "@/components/Navbar";
import { aut } from "./fb";

export default {
  components: { Navbar:()=>import("@/components/Navbar") },
  data: () => ({
    footer: {
      inset: false,
    },
    isAuth: aut.currentUser !== null,
  }),
  created: function() {
    this.$store.state.user = aut.currentUser;
  },
  computed: {
    isNavShow() {
      this.$store.state.user = aut.currentUser;

      return this.$store.state.user;
    },
  },
};
</script>
<style lang="scss" >
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
@import '../node_modules/@mdi/font/css/materialdesignicons.min.css'
</style>
