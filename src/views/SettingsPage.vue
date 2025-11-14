<script setup>
import { ref } from 'vue'
import useAuth from '../composables/useAuth'
import useAPI from '../composables/useAPI'

const { user } = useAuth()
const { instance, getEmployees } = useAPI()

const impUsername = ref('')
const impFirstName = ref('')
const impLastName = ref('')
const impTitle = ref('')
const impQuote = ref('')

async function addEmployee() {
  try {
    await instance.post('/api/employees/create', {
      username: impUsername.value,
      first_name: impFirstName.value,
      last_name: impLastName.value,
      title: impTitle.value,
      quote: impQuote.value
    })
    await getEmployees()
  } catch (error) {
    console.error('Error creating employee:', error)
  } finally {
    impUsername.value = ''
    impFirstName.value = ''
    impLastName.value = ''
    impTitle.value = ''
    impQuote.value = ''

    const inputs = document.querySelectorAll('input')
    inputs.forEach((input) => (input.value = ''))
  }
}
</script>

<template>
  <main class="p-6">
    <h1 class="text-2xl font-bold mb-2">Settings</h1>
    <p class="mb-4">Welcome {{ user?.email }}</p>

    <form
      class="mx-auto mt-10 flex max-w-md flex-col gap-4 rounded-md bg-white p-8 shadow-lg"
      @submit.prevent="addEmployee"
    >
      <input
        type="text"
        placeholder="Username"
        v-model="impUsername"
        class="rounded-md px-4 py-2 text-xl ring-1 ring-slate-300"
      />
      <input
        type="text"
        placeholder="First Name"
        v-model="impFirstName"
        class="rounded-md px-4 py-2 text-xl ring-1 ring-slate-300"
      />
      <input
        type="text"
        placeholder="Last Name"
        v-model="impLastName"
        class="rounded-md px-4 py-2 text-xl ring-1 ring-slate-300"
      />
      <input
        type="text"
        placeholder="Title"
        v-model="impTitle"
        class="rounded-md px-4 py-2 text-xl ring-1 ring-slate-300"
      />
      <input
        type="text"
        placeholder="Quote"
        v-model="impQuote"
        class="rounded-md px-4 py-2 text-xl ring-1 ring-slate-300"
      />

      <button
        type="submit"
        class="bg-green-500 px-4 py-2 text-white font-semibold rounded-md"
      >
        Submit
      </button>
    </form>
  </main>
</template>
