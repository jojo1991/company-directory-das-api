<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import useAPI from '../composables/useAPI'
import { faker } from '@faker-js/faker'

const route = useRoute()
const { fetchEmployee, currentEmployee } = useAPI()

onMounted(async () => {
  await fetchEmployee(route.params.id)
})

onUnmounted(() => {
  currentEmployee.value = null
})
</script>

<template>
  <main>
    <div
      v-if="currentEmployee"
      class="flex flex-col items-center justify-center gap-6 p-8"
    >
      <h1 class="text-6xl font-bold p-5">
        {{ currentEmployee.first_name }} {{ currentEmployee.last_name }}
      </h1>

      <h2 class="text-3xl p-5">
        {{ currentEmployee.title }}
      </h2>

      <p class="text-2xl p-5">
        {{ currentEmployee.username }}@southtexascollege.edu
      </p>

      <p class="text-2xl p-5">
        {{ currentEmployee.quote }}
      </p>

      <img
        class="p-8"
        :src="faker.image.urlLoremFlickr({ category: 'cats' })"
        alt="profile"
      />
    </div>
  </main>
</template>
