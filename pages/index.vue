<script setup lang="ts">
  const { data } = useAuth()

  import { ref, onMounted } from 'vue';
  import { useTodoStore } from "../store/store";
  import { useUserStore } from '~/store/user';

  const userStore = useUserStore();
  const todoStore = useTodoStore();
  const newTodo = ref('');
  const todos: Ref<Todo[]> = computed(() => todoStore.leftTasks)

  type Todo = {
      _id: number;
      content: string;
      isFinished: boolean;
      isEditing: boolean;
  };

  function addTodo(): void {
    if (newTodo.value.trim() !== '') {
      todoStore.addTask(newTodo.value);
      newTodo.value = '';
    }
  }

  const deleteTodo = (todoID: number): void => {
    todoStore.removeTask(todoID);
  };

  const updateTodo = (index: number): void => {
    todos.value[index].isEditing = true;
  };

  const saveEditedTask = async (item: Todo, index: number): Promise<void> => {
    item.isEditing = false;
    const updatedTasks = todos.value.slice();
    updatedTasks[index] = item;
    todoStore.update(updatedTasks);
  };
</script>

<template>
  <div class="bg-white w-96 p-4 rounded-md shadow-lg z-10 mt-4">
    <h1 class="text-3xl font-bold text-center">Hello {{ data?.user?.name }} !</h1>
    <div class="flex">
      <input class="border border-gray-300 p-2 rounded-md flex-grow mr-2" v-model="newTodo" type="text" @keyup.enter="addTodo" placeholder="New task">
      <button class="flex items-center justify-center bg-[#204076] text-white p-2 rounded-md" @click="addTodo">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      </button>
    </div>
  </div>
  <div class="bg-white w-96 p-4 rounded-md shadow-lg z-10 mb-4">
    <h2 class="text-3xl font-bold text-center">Task List</h2>
    <h5 v-if="todos.length === 0" class="text-2xl font-bold text-center">Empty list</h5>
    <ul>
      <li v-for="(todo, index) in todos" :key="todo._id" class="flex items-center justify-between">
        <template v-if="!todo.isEditing">
          <span class="text-2xl">{{ todo.content }}</span>
          <div class="flex space-x-2">
            <button class="flex items-center text-green-500 hover:text-green-700" @click="updateTodo(index)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </button>
            <button class="flex items-center text-red-500 hover:text-red-700 ml-2" @click="deleteTodo(todo._id)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </template>
        <template v-else>
          <input v-model="todo.content" class="text-2xl border rounded-md px-2 py-1" @keyup.enter="saveEditedTask(todo, index)">
          <div class="flex space-x-2">
            <button @click="saveEditedTask(todo, index)" class="text-blue-500 ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
              </svg>
            </button>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<style>
  .mb-4 {
    margin-left: 1rem;
  }
</style>
