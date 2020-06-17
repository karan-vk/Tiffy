<template>
  <div class="projects">
    <h1 class="headline grey--text mb-12">Projects</h1>
    <v-container class="my-8 mt-12">
      <v-expansion-panels multiple>
        <Popup v-if="checkProject" btnPlaceholder="Start adding projects ➕" />
        <v-expansion-panel v-for="project in projects" :key="project.title">
          <v-expansion-panel-header>{{
            project.title
          }}</v-expansion-panel-header>
          <v-expansion-panel-content class="px-2">
            <div class="font-weight-bold">Due by {{ project.due }}</div>
            <div>{{ project.content }}</div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>  
  </div>
</template>

<script>
// @ is an alias to /src
import { db,aut } from "../fb";
import LenArray from "../Utility/length"
export default {
  name: "Home",
  components: {Popup:()=>import('../components/Popup')},
  data() {
    return {
      projects: [],
      // lent:
    };
  },
  computed: {
    myProjects() {
      return this.projects.filter(function(project) {
        return project.person == "Karan";
      });
    },
    checkProject(){
      return LenArray(this.projects)
    }
  },
  created() {
    db.collection("projects")
    .where("uid","==",aut.currentUser.email)
    .onSnapshot((res) => {
      const changes = res.docChanges();
      changes.forEach((change) => {
        if (change.type == "added") {
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
