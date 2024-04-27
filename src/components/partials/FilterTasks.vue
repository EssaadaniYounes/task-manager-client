<template>
  <select class="form-input w-[150px]" v-model="filter">
    <option value="">All</option>
    <option value="pending">Pending</option>
    <option value="in progress">In Progress</option>
    <option value="completed">Completed</option>
  </select>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import router from "../../router";
import {useRoute} from "vue-router";

const route = useRoute();
const filter =ref(route.query.filter?.toString() || "")

watch(filter, ()=>{

  router.push({
    name: 'tasks',
    query: {...route.query,filter:filter.value},
    hash: route.hash,
  })
})
</script>

<style scoped></style>