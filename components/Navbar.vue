<script setup>
  const { signOut } = useAuth()
</script>

<template>
    <div class="h-24 fixed w-full bg-[#204076] text-white flex justify-between items-center py-2 px-4">
      <div class="flex justify-evenly items-center">
        <NuxtLink to="/" class="mx-2">Home</NuxtLink>
        <button
            @click="signOut({ callbackUrl: '/auth/login' })"
          class="mx-2 bg-white hover:scale-125 delay-300 text-black rounded-lg py-2 px-4"
          >Sign out
        </button>
      </div>
    </div>
</template>