<script setup>
import { ref } from 'vue'
import { faker } from '@faker-js/faker'

const props = defineProps({
  employee: {
    type: Object,
    required: true,
    default: () => ({
      _id: '',
      username: '',
      first_name: '',
      last_name: '',
      title: '',
      quote: ''
    })
  }
})

const imgSrc = ref(
  faker.image.urlLoremFlickr({ category: 'cats' })
)

const fallbacks = [
  'https://placekitten.com/960/480',
  `https://picsum.photos/seed/${encodeURIComponent(props.employee.username || 'user')}/960/480`,
  'https://placehold.co/960x480?text=Cat'
]
let fbIdx = 0

function onImgErr() {
  if (fbIdx < fallbacks.length) {
    imgSrc.value = fallbacks[fbIdx++]
  }
}
</script>

<template>
  <router-link
    :to="{ name: 'CardDetails', params: { id: props.employee._id } }"
    class="block"
  >
    <div class="border border-gray-400 rounded-xl shadow hover:shadow-lg transition p-4">
      <img
        class="object-fill w-[960px] h-[480px] rounded-t-xl"
        :src="imgSrc"
        @error="onImgErr"
        alt="profile"
      />
      <p class="mb-2 text-2xl font-bold mt-3">
        {{ props.employee.first_name }} {{ props.employee.last_name }}
      </p>
      <p class="mb-3 font-normal text-gray-700">
        {{ props.employee.title }}
      </p>
      <p class="mb-3 font-normal text-gray-700">
        {{ props.employee.quote }}
      </p>
    </div>
  </router-link>
</template>
