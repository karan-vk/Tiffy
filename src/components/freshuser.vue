<template>
   <v-card
      flat
      class="text-center"
      >
        <v-btn
        outlined
        block
        color="primary"
        >Start creating your projects !!🥳</v-btn>
                <Popup @projectAdded="snakbar = true" />
      </v-card>

</template>

<script>

export default {
    components:{Popup:()=>import("./Popup")},
    data() {
        return {
            snakbar:false,
        }
    },

}
</script>

<style>

</style>