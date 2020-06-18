<template>
  <div class="Dashboard  " style="height:100%">
    <h1 class="mb-12">Dashboard</h1>
    <v-container class="my-8 mt-12">
      <v-row justify-start class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('title')" v-on="on">
              <v-icon small class="float-left">mdi-folder</v-icon>
              <span class="caption">By project name</span>
            </v-btn>
          </template>

          <span>Sort by project name</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('person')" v-on="on">
              <v-icon small class="float-left">mdi-account</v-icon>
              <span class="caption">By Person</span>
            </v-btn>
          </template>
          <span>Sort by project author</span>
        </v-tooltip>
      </v-row>
      <div class="text-center">
        <Popup v-if="lengthA" btnPlaceholder="Start creating the projects 🥳" />
      </div>
      <v-card
        flat
        class="px-3 my-2 "
        v-for="project in projects"
        :key="project.id"
      >
        <v-row :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption gret--text">Project Title</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">
              Due by
            </div>
            <div>
              {{ project.due }}
            </div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="float-right">
              <v-chip
                small
                :class="` pro ${statuscheck(project.due)} white--text my-2 `"
                >{{ statuscheck(project.due) }}
              </v-chip>
            </div>
          </v-flex>
        </v-row>
      </v-card>
    </v-container>
    <div
      style="position: fixed;
  bottom: 3em;
  right: 0;"
      row
      wrap
      justify-end
      align-end
    >
      <v-btn @click="reloadpro" fab :loading="reloading" class="success"
        ><v-icon>mdi-reload</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import lenArray from "../Utility/length";
import moment from "moment";
import { projectGet } from "../Utility/getproject";

export default {
  name: "Home",
  components: {
    Popup: () => import("../components/Popup"),
    // Navbar:NavBar
  },
  data() {
    return {
      reloading: false,
      projects: [],

      cole: {
        complete: "#3cd1c2",
        ongoing: "orange",
        overdue: "#f83e70",
      },
    };
  },
  methods: {
    sortBy(com) {
      this.projects.sort((a, b) => (a[com] < b[com] ? -1 : 1));
    },
    reloadpro() {
      this.reloading = true;
      this.projects = projectGet();
      this.reloading = false;
    },

    statuscheck(date) {
      const dateondb = moment(date, "dddd, Do MMMM YYYY").valueOf();
      const nowdate = moment(new Date()).valueOf();
      if (dateondb <= nowdate) {
        return "overdue";
      } else {
        return "ongoing";
      }
    },
  },
  computed: {
    lengthA() {
      return lenArray(this.projects);
    },
  },
  created() {
    this.projects = projectGet();
  },
};
</script>

<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}
.theme--dark.v-chip:not(.v-chip--active).complete {
  background: #3cd1c2;
}
.theme--dark.v-chip:not(.v-chip--active).v-chip.ongoing {
  background: orange;
}
.theme--dark.v-chip:not(.v-chip--active).v-chip.overdue {
  background: #f83e70;
}
.theme--light.v-chip:not(.v-chip--active).complete {
  background: #3cd1c2;
}
.theme--light.v-chip:not(.v-chip--active).v-chip.ongoing {
  background: orange;
}
.theme--light.v-chip:not(.v-chip--active).v-chip.overdue {
  background: #f83e70;
}
</style>
