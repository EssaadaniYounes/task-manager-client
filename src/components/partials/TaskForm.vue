<template>
  <form @submit.prevent="() => isEditMode ? handleUpdateTask() : handleNewTask()">
    <div class="gap-2 grid grid-cols-1 md:grid-cols-3 mb-4">
      <InputWrapper forInput="title" label="Title">
        <input v-model="taskPayload.title" type="text" name="title" id="title" class="form-input"
          placeholder="Learn clerk" />
      </InputWrapper>
      <InputWrapper forInput="due_date" label="Due date">
        <input v-model="taskPayload.due_date" type="date" name="due_date" id="due_date" class="form-input" />
      </InputWrapper>
      <InputWrapper forInput="status" label="Due date">
        <select class="form-input" v-model="taskPayload.status">
          <option value="pending">Pending</option>
          <option value="in progress">In progress</option>
          <option value="completed">Completed</option>
        </select>
      </InputWrapper>
    </div>
    <InputWrapper forInput="description" label="Description">
      <textarea v-model="taskPayload.description" rows="4" class="form-input" name="description" id="description"
        placeholder="In next week...">
    </textarea>
    </InputWrapper>
    <button type="submit"
      class="w-fit max-w-sm mx-auto block mt-6 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
      Save
    </button>
  </form>
</template>

<script lang="ts">
import InputWrapper from "./InputWrapper.vue";
import {createTask, updateTask} from "../../api/tasks";
import router from "../../router";
export default {
  name: "TaskForm",
  components: { InputWrapper },
  props: {
    isEditMode: Boolean,
    task: Object
  },
  data() {
    return {
      taskPayload: {
        title: '',
        description: '',
        due_date: '',
        status: 'pending'
      }
    }
  },
  methods: {
    async handleNewTask() {
      const created = await createTask({...this.taskPayload});
      if(created){
        router.back();
      }else{
        alert(`Oops! We couldn't created the task`);
      }
    },
    async handleUpdateTask() {
      const updated = await updateTask({...this.taskPayload}, this.task.id);
      if(updated){
        router.back();
      }else{
        alert(`Oops! We couldn't update the task`);
      }
    }
  },
  mounted() {
    console.log(this.task)
    if (this.isEditMode) {
      this.taskPayload = this.task
    }
  }
}
</script>

<style scoped></style>