<template>
    <select class="form-input w-[150px]" v-model="sort">
      <option value="" disabled>Sort by due date</option>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import router from "../../router";
import {useRoute} from "vue-router";

const route = useRoute();
const sort =ref(route.query.sort?.toString() || "")

watch(sort, ()=>{

  router.push({
    name: 'tasks',
    query: {...route.query,sort:sort.value},
    hash: route.hash,
  })
})
</script>

<style scoped></style>