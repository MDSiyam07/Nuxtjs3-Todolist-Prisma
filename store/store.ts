import { defineStore } from 'pinia';
import { useUserStore } from './user'

type Todo = {
  _id: number;
  content: string;
  isFinished: boolean;
  isEditing: boolean;
  userId?: number;
};

export type RootState = {
  tasks: Todo[];
  lastId: number;
};

export const useTodoStore = defineStore('todoStore', {
  state: (): RootState => ({
    tasks: [],
    lastId: 0,
  }),

  getters: {
    completedTasks(): Todo[] {
      return this.tasks.filter((task) => task.isFinished);
    },
    leftTasks(): Todo[] {
      return this.tasks.filter((task) => !task.isFinished);
    },
  },

  actions: {
    getTasks() {
      const user = useUserStore()
      this.tasks = this.tasks.filter(task => task.userId === user.id)
    },

    // addTask(content: string) {
    //   const user = useUserStore()

    //   if (!this.currentUser) {
    //     throw new Error('User is not logged in');
    //   }
    //   this.tasks.push({
    //     _id: this.lastId++,
    //     content: content,
    //     isFinished: false,
    //     isEditing: false,
    //     userId: user.id
    //   })
    // },

    /* Fonctionn addTask simple store*/
    addTask(content: string){
      this.tasks.push({
        _id: ++this.lastId, content: content, isFinished: false,
        isEditing: false,
        userId: 0
      })
    },

    removeTask(id: number): void{
      this.tasks = this.tasks.filter((t) => t._id !== id);
    },

    update(tasks: Todo[]) {
      this.tasks = tasks;
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      localStorage.setItem("lastId", this.lastId.toString());
    },

    loadFromLocalStorage() {
      const tasks = localStorage.getItem("tasks");
      const lastId = localStorage.getItem("lastId");
      if (tasks) this.tasks = JSON.parse(tasks);
      if (lastId) this.lastId = Number(lastId);
    },

    startEditing(id: number) {
      const task = this.tasks.find(t => t._id === id);
      if (task) task.isEditing = true;
    },

    stopEditing(id: number) {
      const task = this.tasks.find(t => t._id === id);
      if (task) task.isEditing = false;
    },
  }
});
