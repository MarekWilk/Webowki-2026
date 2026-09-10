import type { FormEvent } from 'react'
import type { Story, Task } from '../types'

interface TaskFormProps {
  activeProjectId: number | null
  stories: Story[]
  taskNazwa: string
  setTaskNazwa: (value: string) => void
  taskOpis: string
  setTaskOpis: (value: string) => void
  taskPriorytet: Task['priorytet']
  setTaskPriorytet: (value: Task['priorytet']) => void
  taskCzas: string
  setTaskCzas: (value: string) => void
  taskHistoryjka: number | null
  setTaskHistoryjka: (value: number | null) => void
  onSubmit: (e: FormEvent) => void
}

function TaskForm({
  activeProjectId,
  stories,
  taskNazwa,
  setTaskNazwa,
  taskOpis,
  setTaskOpis,
  taskPriorytet,
  setTaskPriorytet,
  taskCzas,
  setTaskCzas,
  taskHistoryjka,
  setTaskHistoryjka,
  onSubmit,
}: TaskFormProps) {
  if (activeProjectId === null) {
    return null
  }

  return (
    <section className="task-form">
      <h2>Dodaj zadanie</h2>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Nazwa zadania"
          value={taskNazwa}
          onChange={(e) => setTaskNazwa(e.target.value)}
        />

        <textarea
          placeholder="Opis zadania"
          value={taskOpis}
          onChange={(e) => setTaskOpis(e.target.value)}
        />

        <select
          value={taskPriorytet}
          onChange={(e) =>
            setTaskPriorytet(
              e.target.value as Task['priorytet']
            )
          }
        >
          <option value="niski">Niski</option>
          <option value="średni">Średni</option>
          <option value="wysoki">Wysoki</option>
        </select>

        <input
          type="number"
          min="1"
          placeholder="Przewidywany czas (godziny)"
          value={taskCzas}
          onChange={(e) => setTaskCzas(e.target.value)}
        />

        <select
          value={taskHistoryjka ?? ''}
          onChange={(e) =>
            setTaskHistoryjka(
              e.target.value ? Number(e.target.value) : null
            )
          }
        >
          <option value="">Wybierz historyjkę</option>

          {stories
            .filter((story) => story.projekt === activeProjectId)
            .map((story) => (
              <option key={story.id} value={story.id}>
                {story.nazwa}
              </option>
            ))}
        </select>

        <button type="submit">
          Dodaj zadanie
        </button>
      </form>
    </section>
  )
}

export default TaskForm