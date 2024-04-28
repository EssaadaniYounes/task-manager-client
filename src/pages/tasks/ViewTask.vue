<template>
  <NavBar/>
    <TaskDetails :task="task"/>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref, watch} from "vue";
import {getTaskByID} from "../../api/tasks";
import NavBar from "../../components/layouts/NavBar.vue";
import TaskDetails from "../../components/features/task/TaskDetails.vue";

const route = useRoute()

let task = ref({
  title: '',
  description: '',
  due_date: '',
  status: ''
});
watch(() => route.params.id, async(taskID:string)=>{
  task.value = await getTaskByID(taskID)
}, { immediate: true })

</script>

<style scoped>

</style>