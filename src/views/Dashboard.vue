<template>
  <div class="Dashboard">
    <h1 class="mb-12">Dashboard</h1>
    <!-- <v-btn @click="debug">Check</v-btn> -->
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
        <Popup v-if="lengthA"  btnPlaceholder="Start creating the projects 🥳" />
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
              <v-chip small :class="` pro ${statuscheck(project.due)} white--text my-2 `"
                >{{ statuscheck(project.due) }} 
              </v-chip>
            </div>
          </v-flex>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { db, aut } from "../fb";
import lenArray from "../Utility/length"
import moment from "moment";


export default {
  name: "Home",
  components: { Popup: () => import("../components/Popup") },
  data() {
    return {
      projects: [],
      // auth: aut.currentUser !== null,
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
      db.collection("projects")
        .where("uid", "==", aut.currentUser.email)
        .onSnapshot((res) => {
          const changes = res.docChanges();
          changes.forEach((change) => {
            if (change.type === "added") {
              this.projects.push({
                ...change.doc.data(),
                id: change.doc.id,
              });
            }
          });
        });
    },
    
    statuscheck(date){
      const dateondb = moment(date,"dddd, Do MMMM YYYY").valueOf() 
      const nowdate = moment(new Date).valueOf()
      if (dateondb<=nowdate) {
        return "overdue"
        
      }
      else{
        return "ongoing"

      }
    }
  },
  computed: {
    lengthA(){
      return lenArray(this.projects)

    }
  },
  created() {
    db.collection("projects")
      .where("uid", "==", aut.currentUser.email)
      .onSnapshot((res) => {
        const changes = res.docChanges();
        changes.forEach((change) => {
          if (change.type === "added") {
            this.projects.push({
              ...change.doc.data(),
              id: change.doc.id,
            });
          }
        });
      });
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
