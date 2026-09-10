import { useEffect, useState } from 'react'
import type { Project } from './types'
import { getProjects, saveProjects } from './storage'
import './App.css'

function App() {
  const [projects, setProjects] = useState<Project[]>([])
  const [nazwa, setNazwa] = useState('')
  const [opis, setOpis] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    setProjects(getProjects())
  }, [])

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