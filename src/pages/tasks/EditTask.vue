<template>
  <NavBar/>
  <div class="max-w-4xl space-y-2 m-3 md:mx-auto  py-6 sm:px-6 lg:px-8">
    <h3 class="text-lg md:text-2xl font-semibold text-gray-600">Edit task</h3>
    <div v-if="!loading" class="p-4 bg-gray-200 rounded-lg">
      <TaskForm :isEditMode="true" :task="task"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {watch, ref} from 'vue'
import { useRoute } from 'vue-router'
import {getTaskByID} from "../../api/tasks";
import NavBar from "../../components/layouts/NavBar.vue";
import TaskForm from "../../components/features/task/TaskForm.vue";

const route = useRoute()

let task = ref({
  title: '',
  description: '',
  due_date: '',
  status: ''
});
const loading = ref(false);
watch(() => route.params.id, getTask, { immediate: true })

async function getTask(id) {
    loading.value = true
  try{
    task = await getTaskByID(id)
  }catch (e){
    console.log(e)
  }finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>