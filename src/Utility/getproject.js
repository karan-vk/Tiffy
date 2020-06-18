import { db, aut } from "../fb";

export const projectGet = () => {
  let projects = [];
  db.collection("projects")
    .where("uid", "==", aut.currentUser.email)
    .onSnapshot((res) => {
      const changes = res.docChanges();
      changes.forEach((change) => {
        if (change.type === "added") {
          projects.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
        }
      });
    });
  return projects;
};
