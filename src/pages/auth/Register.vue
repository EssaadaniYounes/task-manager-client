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
          class="primary-btn"
        >
          SignUp
        </button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?
          <RouterLink to="/"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign in
          </RouterLink>
        </p>
      </form>
    </AuthFormWrapper>

  </div>

</template>

<script setup lang="ts">
import {  reactive } from 'vue'
import useVuelidate from "@vuelidate/core";
import {toast} from "vue3-toastify";
import {AxiosError} from "axios/index";
import PlatformLogo from "../../components/layouts/PlatformLogo.vue";
import AuthFormWrapper from "../../components/partials/AuthFormWrapper.vue";
import ErrorIndicator from "../../components/partials/ErrorIndicator.vue";
import router from "../../router";
import {registerRules} from "../../lib/validation-rules";
import {Register} from "../../api/auth";

const registerPayload = reactive({
  name: "",
  email: "",
  password: ""
})

const v$ = useVuelidate(registerRules, registerPayload)
const handleRegister = async()=>{
  try{
    const validatedForm = await v$.value.$validate();
    if(validatedForm){
      const success = await Register(registerPayload);
      success ? router.push("/tasks") : toast.error(`Invalid Credentials!`);
    }
  }catch (e){
    if(e instanceof AxiosError){
      toast.error(`${e.response.data.message}`)
    }
  }
}
</script>

<style scoped></style>