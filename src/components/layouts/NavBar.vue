<template>
  <div class="w-full bg-gray-200 p-3 px-5 flex items-center justify-between">
    <RouterLink to="/tasks" class="flex items-center space-x-2">
      <img src="../../assets/logo.png" alt="logo" class="w-6 h-6" />
      <h2 class="text-1xl font-semibold text-gray-700">Task Manager</h2>
    </RouterLink>

    <button
        @click="handleLogout"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Logout
    </button>
  </div>
</template>

<script>
import {removeCookie} from "../../lib/utils.ts";
import router from "../../router/index.ts";

export default {
  name: "NavBar",
  methods:{
    async handleLogout(){
      await removeCookie("auth_token");
      await router.push("/");
    }
  }
}
</script>

<style scoped></style>