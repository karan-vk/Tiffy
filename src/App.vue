<template>
  <v-app id="app" class="grey lighten-4">
    <v-main class="mx-6  mb-4 ">
      <Navbar v-if="isNavShow"></Navbar>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import { aut } from "./fb";
// import Navbar from "@/components/Navbar";
import Footer from "./components/UI/Footer/footer";

export default {
  components: {
    Navbar: ()=>import("@/components/Navbar"),

    Footer: Footer,
  },
  data: () => ({
    isAuth: aut.currentUser !== null,
  }),
  created: function() {
    this.$store.state.user = aut.currentUser;
  },
  computed: {
    isNavShow() {
      this.$store.state.user = aut.currentUser;

      return aut.currentUser;
    },
  },
  mounted() {
    this.$store.state.user = aut.currentUser;
  },
};
</script>
<style lang="scss">
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
</style>
