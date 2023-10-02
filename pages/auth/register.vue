<script setup>
    definePageMeta({
        layout: "auth",
        auth: {
            unauthenticatedOnly: true,
            navigateAuthenticatedTo: '/',
        }
    })

    const username = ref('')
    const email = ref('')
    const password = ref('')

    const form = ref(false)
    const rules = ref({
        required: v => !!v || 'Field is required',
        email: v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    })

    const register = async () => {
        const { data, error } = await useFetch(`/api/auth/register`, {
            method: "POST",
            body: {
                name: username.value,
                email: email.value,
                password: password.value
            }
        })

        if (error.value) {
            console.error(error.value.statusMessage, 'error')
            return
        }
        console.error(data.value.message)
        await navigateTo('/auth/login')
    }
</script>

<template>
    <div class="bg-[#a2dafd] h-screen w-full flex items-center justify-center">
            <div class="bg-white w-96 p-4 rounded-md shadow-lg z-10">
                <h1 class="text-3xl font-bold text-center">Register</h1>
                <v-form v-model="form" @submit.prevent="register" class="flex flex-col space-y-4 mt-4">
                    <input v-model="username" placeholder="Username" 
                    :rules="[rules.required]" class="border border-gray-300 p-2 rounded-md">

                    <input type="email" v-model="email" placeholder="Email"
                        :rules="[rules.required, rules.email]" class="border border-gray-300 p-2 rounded-md">

                    <input type="password" v-model="password" placeholder="Password"
                        :rules="[rules.required]" class="border border-gray-300 p-2 rounded-md">

                    <v-btn type="submit" color="#a2dafd" block class="mt-2 bg-[#204076] text-blue p-2 rounded-md">Register</v-btn>
                </v-form>
                <v-btn color="#204076" block class="mt-2 bg-[#204076] text-white p-2 rounded-md" to="/auth/login" nuxt>Sign in</v-btn>
            </div>
    </div>
</template>