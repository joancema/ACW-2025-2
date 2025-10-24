// PASO 1️⃣: IMPORTS Y TIPOS
import './style.css'
import { supabase } from './supabase'
import type { Pet } from './supabase'

// PASO 2️⃣: ESTADO Y REFERENCIAS AL DOM
let editingPet: Pet | null = null
const form = document.getElementById('pet-form') as HTMLFormElement
const petsList = document.getElementById('pets-list') as HTMLDivElement
const cancelBtn = document.getElementById('cancel-btn') as HTMLButtonElement

// PASO 3️⃣: ARRANQUE DEL CRUD (CARGA INICIAL)
loadPets()

// PASO 4️⃣: EVENT LISTENERS PRINCIPALES
form.addEventListener('submit', handleSubmit)
cancelBtn.addEventListener('click', resetForm)

// -----------------------------------------------------------
// FUNCIONES PRINCIPALES DEL CRUD
// -----------------------------------------------------------

// PASO 5️⃣: READ → LEER MASCOTAS DESDE SUPABASE
async function loadPets() {
  console.log('Cargando mascotas...')
  
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error:', error)
    petsList.innerHTML = '<p class="empty">Error al cargar mascotas</p>'
    return
  }
  
  console.log('Mascotas cargadas:', data)
  displayPets(data || [])
}

// PASO 6️⃣: RENDER → MOSTRAR MASCOTAS EN PANTALLA
function displayPets(pets: Pet[]) {
  if (pets.length === 0) {
    petsList.innerHTML = '<p class="empty">No hay mascotas registradas</p>'
    return
  }
  
  petsList.innerHTML = pets.map(pet => `
    <div class="pet-item">
      <div>
        <strong>${pet.name}</strong>
        ${pet.breed ? ` - ${pet.breed}` : ''}
        ${pet.age ? ` (${pet.age} años)` : ''}
      </div>
      <div class="pet-actions">
        <button class="btn-edit" onclick="editPet('${pet.id}')">Editar</button>
        <button class="btn-delete" onclick="deletePet('${pet.id}')">Eliminar</button>
      </div>
    </div>
  `).join('')
}

// PASO 7️⃣: PREPARAR DATOS DEL FORMULARIO
async function handleSubmit(e: Event) {
  e.preventDefault()
  
  const name = (document.getElementById('name') as HTMLInputElement).value
  const breed = (document.getElementById('breed') as HTMLInputElement).value
  const ageInput = (document.getElementById('age') as HTMLInputElement).value
  const age = ageInput ? parseInt(ageInput) : undefined
  
  const petData: Pet = { 
    name, 
    breed: breed || undefined,
    age
  }
  
  console.log('Guardando mascota:', petData)
  
  let result
  
  // PASO 8️⃣: CREATE vs UPDATE SEGÚN editingPet
  if (editingPet?.id) {
    // Actualizar mascota existente
    result = await supabase
      .from('pets')
      .update(petData)
      .eq('id', editingPet.id)
    
    console.log('Mascota actualizada')
  } else {
    // Crear nueva mascota
    result = await supabase
      .from('pets')
      .insert([petData])
    
    console.log('Mascota creada')
  }
  
  if (result.error) {
    console.error('Error:', result.error)
    alert('Error al guardar la mascota')
    return
  }
  
  // PASO 9️⃣: RESETEAR FORMULARIO Y RECARGAR LISTA
  resetForm()
  loadPets()
}

// RESET DEL FORMULARIO
function resetForm() {
  form.reset()
  editingPet = null
  ;(document.getElementById('pet-id') as HTMLInputElement).value = ''
  console.log('Formulario reseteado')
}

// -----------------------------------------------------------
// PASO 🔟: EDITAR Y ELIMINAR MASCOTAS
// -----------------------------------------------------------

// EDITAR UNA MASCOTA EXISTENTE
(window as any).editPet = async (id: string) => {
  console.log('Editando mascota:', id)
  
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error:', error)
    alert('Error al cargar la mascota')
    return
  }
  
  editingPet = data
  ;(document.getElementById('pet-id') as HTMLInputElement).value = id
  ;(document.getElementById('name') as HTMLInputElement).value = data.name
  ;(document.getElementById('breed') as HTMLInputElement).value = data.breed || ''
  ;(document.getElementById('age') as HTMLInputElement).value = data.age?.toString() || ''
  
  // Scroll al formulario
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ELIMINAR UNA MASCOTA
(window as any).deletePet = async (id: string) => {
  if (!confirm('¿Eliminar esta mascota?')) return
  
  console.log('Eliminando mascota:', id)
  
  const { error } = await supabase
    .from('pets')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error:', error)
    alert('Error al eliminar la mascota')
    return
  }
  
  console.log('Mascota eliminada')
  loadPets()
}