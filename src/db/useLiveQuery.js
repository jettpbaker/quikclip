import { ref, onUnmounted } from 'vue'
import { liveQuery } from 'dexie'

export function useLiveQuery(queryFn) {
  const data = ref(null)
  const error = ref(null)

  const subscription = liveQuery(queryFn).subscribe({
    next: (result) => {
      data.value = result
      error.value = null
    },
    error: (err) => {
      error.value = err
    },
  })

  onUnmounted(() => {
    subscription.unsubscribe()
  })

  return { data, error }
}
