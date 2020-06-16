<template>
  <v-dialog max-width="700px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" class="success">Add new project</v-btn>
    </template>

    <v-card>
      <v-card-title class="mx-4  ">
        <h2 class="mx-3">Add new Project</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-5" ref="form">
          <v-text-field
            label="Title"
            v-model="title"
            prepend-icon="mdi-format-title"
            :rules="inputRules"
          >
          </v-text-field>
          <v-textarea
            label="Information"
            v-model="content"
            prepend-icon="mdi-pencil"
            :rules="inputRules"
          ></v-textarea>

          <v-menu>
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="computedDateFormattedMomentjs"
                label="Due Date"
                prepend-icon="mdi-calendar-range"
                v-on="on"
                :rules="inputRules"
              >
              </v-text-field>
            </template>
            <v-date-picker v-model="due"></v-date-picker>
          </v-menu>
          <v-btn
            text
            class="success mx-0  mt-3 "
            @click="submit"
            :loading="loading"
          >
            ADD PROJECT</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
import { db } from "@/fb";
export default {
  data() {
    return {
      title: "",
      content: " ",
      due: "",
      inputRules: [
        (v) => v.length >= 3 || "Minimum length must be 3 charecters",
      ],
      loading: false,
      dialog: false,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const project = {
          title: this.title,
          content: this.content,
          due: moment(this.due).format("dddd, Do MMMM YYYY"),
          person: "Karan",
          status: "ongoing",
          uid:this.$store.state.user.email
        };
        db.collection("projects")
          .add(project)
          .then(() => {
            this.loading = false;
            
          });
            this.dialog = false;
          this.$emit("projectAdded");
      }
    },
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.due ? moment(this.due).format("dddd, Do MMMM YYYY") : "";
    },
  },
};
</script>
