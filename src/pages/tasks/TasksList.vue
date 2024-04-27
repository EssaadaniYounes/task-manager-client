<template>
  <NavBar/>
  Tasks : {{tasks}}
</template>

<script>
import {getAllTasks} from "../../api/tasks.ts";
import NavBar from "../../components/layouts/NavBar.vue";

export default {
  name:"tasks-list",
  components: {NavBar},
  data(){
    return {
      tasks : []
    }
  },
  async mounted() {
    this.tasks = await getAllTasks("asc");
  }
}
</script>

<style scoped>

</style>