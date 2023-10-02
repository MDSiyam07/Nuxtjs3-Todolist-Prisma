<script setup>
  const { signIn } = useAuth()

  definePageMeta({
    layout: "auth",
    auth: {
      unauthenticatedOnly: true,
      navigateAuthenticatedTo: '/',
    }
  })

  const username = ref('')
  const password = ref('')

  const form = ref(false)
  const rules = ref({
    required: value => !!value || 'Field is required',
  })

  const login = async (username, password) => {
    const response = await signIn('credentials', { redirect: false, username, password })

    if (response.error) {
      console.error("Invalid username or password")
      return
    }

    await navigateTo('/')
  }
</script>

<template>
  <div class="bg-[#a2dafd] h-screen w-full flex items-center justify-center">
      <div class="bg-white w-96 p-4 rounded-md shadow-lg z-10">
        <h1 class="text-3xl font-bold text-center">Login</h1>
        <v-form v-model="form" @submit.prevent="login(username, password)" class="flex flex-col space-y-4 mt-4">
          <input v-model="username" placeholder="Username" :rules="[rules.required]" class="border border-gray-300 p-2 rounded-md">

          <input type="password" v-model="password" placeholder="Password" :rules="[rules.required]" class="border border-gray-300 p-2 rounded-md">

          <v-btn type="submit" color="#a2dafd" block class="bg-[#204076] text-blue p-2 rounded-md">Sign In</v-btn>
        </v-form>
        <v-btn color="#204076" block class="mt-2 bg-[#204076] text-white p-2 rounded-md" to="/auth/register" nuxt>Sign up</v-btn>
      </div>
    </div>
</template>