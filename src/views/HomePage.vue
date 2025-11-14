<script setup>
import { onMounted } from 'vue'
import MainCards from '../components/MainCards.vue'
import MainPagination from '../components/MainPagination.vue'
import useAPI from '../composables/useAPI'

const { getEmployees, loading } = useAPI()

onMounted(async () => {
  await getEmployees()
})
</script>

<template>
  <p v-if="loading" class="p-10 text-2xl">Loading...</p>
  <div v-else>
    <MainCards />
    <MainPagination />
  </div>
</template>
