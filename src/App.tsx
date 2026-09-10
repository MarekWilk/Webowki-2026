import { useEffect, useState } from 'react'
import type { Project, Story } from './types'
import { getLoggedUser } from './user'
import {
  getProjects,
  saveProjects,
  getStories,
  saveStories,
  getActiveProjectId,
  saveActiveProjectId,
} from './storage'
import './App.css'

function App() {
  const user = getLoggedUser()
  const [projects, setProjects] = useState<Project[]>([])
  const [activeProjectId, setActiveProjectId] =
    useState<number | null>(() => getActiveProjectId())
  const [stories, setStories] = useState<Story[]>([])
  const [storyNazwa, setStoryNazwa] = useState('')
  const [storyOpis, setStoryOpis] = useState('')
  const [storyPriorytet, setStoryPriorytet] =
  useState<Story['priorytet']>('średni')
  const [storyStan, setStoryStan] =
  useState<Story['stan']>('todo')
  const [nazwa, setNazwa] = useState('')
  const [opis, setOpis] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    setProjects(getProjects())
  }, [])

  useEffect(() => {
  setStories(getStories())
}, [])

  useEffect(() => {
  saveActiveProjectId(activeProjectId)
}, [activeProjectId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nazwa.trim() || !opis.trim()) {
      alert('Wypełnij nazwę i opis projektu.')
      return
    }

    if (editingId !== null) {
      const updatedProjects = projects.map((project) =>
        project.id === editingId
          ? { ...project, nazwa, opis }
          : project
      )

      setProjects(updatedProjects)
      saveProjects(updatedProjects)
      setEditingId(null)
    } else {
      const newProject: Project = {
        id: Date.now(),
        nazwa,
        opis,
      }

      const updatedProjects = [...projects, newProject]

      setProjects(updatedProjects)
      saveProjects(updatedProjects)
    }

    setNazwa('')
    setOpis('')
  }
  const handleStorySubmit = (e: React.FormEvent) => {
  e.preventDefault()

  if (!activeProjectId) {
    alert('Najpierw wybierz aktywny projekt.')
    return
  }

  if (!storyNazwa.trim() || !storyOpis.trim()) {
    alert('Wypełnij nazwę i opis historyjki.')
    return
  }

  const newStory: Story = {
    id: Date.now(),
    nazwa: storyNazwa,
    opis: storyOpis,
    priorytet: storyPriorytet,
    projekt: activeProjectId,
    dataUtworzenia: new Date().toISOString(),
    stan: storyStan,
    wlasciciel: user.id,
  }

  const updatedStories = [...stories, newStory]

  setStories(updatedStories)
  saveStories(updatedStories)

  setStoryNazwa('')
  setStoryOpis('')
  setStoryPriorytet('średni')
  setStoryStan('todo')
  }
  const handleStoryDelete = (storyId: number) => {
  const updatedStories = stories.filter(
    (story) => story.id !== storyId
  )

  setStories(updatedStories)
  saveStories(updatedStories)
}

  const handleStoryEdit = (story: Story) => {
  const nowaNazwa = prompt('Nazwa historyjki:', story.nazwa)

  if (nowaNazwa === null) {
    return
  }

  const nowyOpis = prompt('Opis historyjki:', story.opis)

  if (nowyOpis === null) {
    return
  }

  const stan = prompt(
  'Stan historyjki (todo/doing/done):',
  story.stan
) as Story['stan'] | null

  if (
    stan !== 'todo' &&
    stan !== 'doing' &&
    stan !== 'done'
  ) {
    alert('Nieprawidłowy stan. Użyj: todo, doing lub done.')
    return
  }

  const updatedStories = stories.map((item) =>
    item.id === story.id
      ? {
          ...item,
          nazwa: nowaNazwa,
          opis: nowyOpis,
          stan: stan,
        }
      : item
  )

  setStories(updatedStories)
  saveStories(updatedStories)
}


  const handleEdit = (project: Project) => {
    setNazwa(project.nazwa)
    setOpis(project.opis)
    setEditingId(project.id)
  }

  const handleDelete = (id: number) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== id
    )

    setProjects(updatedProjects)
    saveProjects(updatedProjects)
  }

  const handleCancel = () => {
    setNazwa('')
    setOpis('')
    setEditingId(null)
  }

  return (
    <main className="container">
      <h1>ManageMe</h1>

      <p>
      Zalogowany użytkownik: {user.imie} {user.nazwisko}
      </p>

      <div className="active-project">
        <label htmlFor="project-select">
          Aktywny projekt:
        </label>

        <select
          id="project-select"
          value={activeProjectId ?? ''}
          onChange={(e) =>
            setActiveProjectId(
              e.target.value ? Number(e.target.value) : null
            )
          }
        >
          <option value="">Wybierz projekt</option>

          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.nazwa}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="project-form">
        <h2>
          {editingId !== null ? 'Edytuj projekt' : 'Dodaj projekt'}
        </h2>

        <input
          type="text"
          placeholder="Nazwa projektu"
          value={nazwa}
          onChange={(e) => setNazwa(e.target.value)}
        />

        <textarea
          placeholder="Opis projektu"
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
        />

        <button type="submit">
          {editingId !== null ? 'Zapisz zmiany' : 'Dodaj projekt'}
        </button>

        {editingId !== null && (
          <button type="button" onClick={handleCancel}>
            Anuluj
          </button>
        )}
      </form>

      {activeProjectId !== null && (
  <section className="stories">
    <h2>Dodaj historyjkę</h2>

    <form onSubmit={handleStorySubmit}>
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
)}

      {activeProjectId !== null && (
  <section className="stories-list">
    <h2>Historyjki projektu</h2>

    <h3>TODO</h3>

    {stories
      .filter(
        (story) =>
          story.projekt === activeProjectId &&
          story.stan === 'todo'
      )
      .map((story) => (
        <article key={story.id} className="story-card">
          <h4>{story.nazwa}</h4>
          <p>{story.opis}</p>

          <p>
            <strong>Priorytet:</strong> {story.priorytet}
          </p>

          <p>
            <strong>Data utworzenia:</strong>{' '}
            {new Date(story.dataUtworzenia).toLocaleString()}
          </p>

          <button onClick={() => handleStoryEdit(story)}>
            Edytuj
          </button>

          <button onClick={() => handleStoryDelete(story.id)}>
            Usuń
          </button>
        </article>
      ))}

    <h3>DOING</h3>

    {stories
      .filter(
        (story) =>
          story.projekt === activeProjectId &&
          story.stan === 'doing'
      )
      .map((story) => (
        <article key={story.id} className="story-card">
          <h4>{story.nazwa}</h4>
          <p>{story.opis}</p>

          <p>
            <strong>Priorytet:</strong> {story.priorytet}
          </p>

          <p>
            <strong>Data utworzenia:</strong>{' '}
            {new Date(story.dataUtworzenia).toLocaleString()}
          </p>

          <button onClick={() => handleStoryEdit(story)}>
            Edytuj
          </button>

          <button onClick={() => handleStoryDelete(story.id)}>
            Usuń
          </button>
        </article>
      ))}

    <h3>DONE</h3>

    {stories
      .filter(
        (story) =>
          story.projekt === activeProjectId &&
          story.stan === 'done'
      )
      .map((story) => (
        <article key={story.id} className="story-card">
          <h4>{story.nazwa}</h4>
          <p>{story.opis}</p>

          <p>
            <strong>Priorytet:</strong> {story.priorytet}
          </p>

          <p>
            <strong>Data utworzenia:</strong>{' '}
            {new Date(story.dataUtworzenia).toLocaleString()}
          </p>

          <button onClick={() => handleStoryEdit(story)}>
            Edytuj
          </button>

          <button onClick={() => handleStoryDelete(story.id)}>
            Usuń
          </button>
        </article>
      ))}
  </section>
)}

      <section className="projects">
        <h2>Lista projektów</h2>

        {projects.length === 0 ? (
          <p>Brak projektów.</p>
        ) : (
          projects.map((project) => (
            <article key={project.id} className="project-card">
              <h3>{project.nazwa}</h3>
              <p>{project.opis}</p>

              <button onClick={() => handleEdit(project)}>
                Edytuj
              </button>

              <button onClick={() => handleDelete(project.id)}>
                Usuń
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  )
}

export default App
