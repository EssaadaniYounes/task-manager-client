<template>
  <div class="container mx-auto max-w-2xl flex flex-col items-center justify-center p-12">
    <PlatformLogo />
    <AuthFormWrapper label="Create Your Account">
      <form @submit.prevent="handleRegister" class="space-y-4 md:space-y-6">
        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input v-model="registerPayload.name" type="text" name="name" id="name" class="form-input"
            placeholder="Essaadani younes">
          <span v-for="error in v$.name.$errors" :key="error.$uid">
            <ErrorIndicator :error="error.$message" />
          </span>
        </div>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input v-model="registerPayload.email" type="email" name="email" id="email" class="form-input"
            placeholder="yo@gmail.com">
          <span v-for="error in v$.email.$errors" :key="error.$uid">
            <ErrorIndicator :error="error.$message" />
          </span>
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input v-model="registerPayload.password" type="password" name="password" id="password" placeholder="••••••••"
            class="form-input">
          <span v-for="error in v$.password.$errors" :key="error.$uid">
            <ErrorIndicator :error="error.$message" />
          </span>
        </div>

        <button type="submit"
          class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
          Up</button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?<RouterLink to="/"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</RouterLink>
        </p>
      </form>
    </AuthFormWrapper>

  </div>

</template>

<script setup lang="ts">
import {  reactive, computed } from 'vue'
import useVuelidate from "@vuelidate/core";
import {required, minLength, email} from "@vuelidate/validators";

const registerPayload = reactive({
  name: "",
  email: "",
  password: ""
})

const rules = computed(()=>{
  return {
    name: {required, minLength: minLength(3)},
    email: {required, email},
    password: {required, minLength:minLength(6)}
  }
})

const v$ = useVuelidate(rules, registerPayload)
const handleRegister = async()=>{
  const validatedForm = await v$.value.$validate();
  if(validatedForm){
    await axios.get('/sanctum/csrf-cookie');
    const {data, status}  = await axios.post("/api/auth/register", registerPayload);
    if(status === 201){
      await setCookie({
        name : "auth_token",
        value: `Bearer ${data.data.auth_token}`
      });
      router.push("/tasks");
    }
  }
}

import PlatformLogo from "../../components/layouts/PlatformLogo.vue";
import AuthFormWrapper from "../../components/partials/AuthFormWrapper.vue";
import ErrorIndicator from "../../components/partials/ErrorIndicator.vue";
import axios from "../../lib/axiosConfig";
import {setCookie} from "../../lib/utils";
import router from "../../router";

</script>

<style scoped></style>