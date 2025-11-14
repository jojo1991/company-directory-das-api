import axios from 'axios'
import { ref } from 'vue'

const instance = axios.create({
  baseURL: 'https://employeeapi-ghlf.onrender.com/'
})

const employees = ref([])
const loading = ref(false)
const currentEmployee = ref(null)

async function getEmployees() {
  loading.value = true
  try {
    const response = await instance.get('/api/employees/fetch')
    employees.value = response.data
  } catch (error) {
    console.error('Error fetching employees:', error)
  } finally {
    loading.value = false
  }
}

async function fetchEmployee(id) {
  try {
    const response = await instance.get(`/api/employees/fetch/${id}`)
    currentEmployee.value = response.data
  } catch (error) {
    console.error('Error fetching employee:', error)
  }
}

export default function useAPI() {
  return {
    instance,
    employees,
    loading,
    getEmployees,
    currentEmployee,
    fetchEmployee
  }
}
