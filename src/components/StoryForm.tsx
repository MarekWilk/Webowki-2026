import type { FormEvent } from 'react'
import type { Story } from '../types'

interface StoryFormProps {
  activeProjectId: number | null
  storyNazwa: string
  setStoryNazwa: (value: string) => void
  storyOpis: string
  setStoryOpis: (value: string) => void
  storyPriorytet: Story['priorytet']
  setStoryPriorytet: (value: Story['priorytet']) => void
  storyStan: Story['stan']
  setStoryStan: (value: Story['stan']) => void
  onSubmit: (e: FormEvent) => void
}

function StoryForm({
  activeProjectId,
  storyNazwa,
  setStoryNazwa,
  storyOpis,
  setStoryOpis,
  storyPriorytet,
  setStoryPriorytet,
  storyStan,
  setStoryStan,
  onSubmit,
}: StoryFormProps) {
  if (activeProjectId === null) {
    return null
  }

  return (
    <section className="stories">
      <h2>Dodaj historyjkę</h2>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Nazwa historyjki"
          value={storyNazwa}
          onChange={(e) => setStoryNazwa(e.target.value)}
        />

        <textarea
          placeholder="Opis historyjki"
          value={storyOpis}
          onChange={(e) => setStoryOpis(e.target.value)}
        />

        <label>
          Priorytet:
          <select
            value={storyPriorytet}
            onChange={(e) =>
              setStoryPriorytet(
                e.target.value as Story['priorytet']
              )
            }
          >
            <option value="niski">Niski</option>
            <option value="średni">Średni</option>
            <option value="wysoki">Wysoki</option>
          </select>
        </label>

        <label>
          Stan:
          <select
            value={storyStan}
            onChange={(e) =>
              setStoryStan(e.target.value as Story['stan'])
            }
          >
            <option value="todo">TODO</option>
            <option value="doing">DOING</option>
            <option value="done">DONE</option>
          </select>
        </label>

        <button type="submit">
          Dodaj historyjkę
        </button>
      </form>
    </section>
  )
}

export default StoryForm