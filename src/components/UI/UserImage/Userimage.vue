<template>
  <v-dialog max-width="700px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-hover v-slot:default="{ hover }">
        <v-avatar color="purple darken-1" :size="size">
          <v-img
            :src="imgurl"
            lazy-src="../../../assets/userimageplaceholder.png"
            transition="fade-transition"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="black lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out v-card--reveal success display-3"
                style="height: 100%;"
              >
                <v-btn v-on="on" class="white--text" text>
                  🖊
                </v-btn>
              </div>
            </v-expand-transition>
          </v-img>
        </v-avatar>
      </v-hover>
    </template>
    <ChangeImage />
  </v-dialog>
</template>

<script>
import { aut } from "../../../fb";
export default {
  props: ["size"],
  components:{ChangeImage:()=>import("../../Form/Changefolder/ChangeUserImage/ChangeUserImage")},
  data() {
    return {
      imgurl: aut.currentUser.photoURL,
      dialog: false,
    };
  },
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.75;
  position: absolute;
  width: 100%;
}
</style>