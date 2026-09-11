import { useEffect, useState } from 'react'
import type { Project, Story, Task, Notification } from './types'
import { getLoggedUser, getUsers } from './user'
import {
  getProjects,
  saveProjects,
  getStories,
  saveStories,
  getActiveProjectId,
  saveActiveProjectId,
  getTasks,
  saveTasks,
  getNotifications,
  saveNotifications,
} from './storage'
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import StoryList from './components/StoryList'
import StoryForm from './components/StoryForm'
import NotificationList from './components/NotificationList'
import NotificationDetails from './components/NotificationDetails'
import { initialNotifications } from './notifications'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const user = getLoggedUser()
  
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)

    useEffect(() => {
    const savedNotifications = getNotifications()

    if (savedNotifications.length === 0) {
      saveNotifications(initialNotifications)
      setNotifications(initialNotifications)
    } else {
      setNotifications(savedNotifications)
    }
  }, [])

  const unreadNotifications = notifications.filter(
    (notification) => !notification.isRead
  ).length

  const addNotification = (
    title: string,
    message: string,
    prority: Notification['prority'],
    recipientId: string
  ) => {
    if (prority === 'medium' || prority === 'high') {
      window.alert(
        `Nowe powiadomienie (${prority})\n\n${title}\n${message}`
      )
}
  const newNotification: Notification = {
    title,
    message,
    date: new Date().toISOString(),
    prority,
    isRead: false,
    recipientId,
  }

  const updatedNotifications = [
    newNotification,
    ...notifications,
  ]

  setNotifications(updatedNotifications)
  saveNotifications(updatedNotifications)
  }

  const handleMarkNotificationAsRead = (notification: Notification) => {
  const updatedNotifications = notifications.map((item) =>
    item === notification
      ? {
          ...item,
          isRead: true,
        }
      : item
  )

  setNotifications(updatedNotifications)
  saveNotifications(updatedNotifications)
  }

  const handleSelectNotification = (notification: Notification) => {
    handleMarkNotificationAsRead(notification)

    setSelectedNotification({
      ...notification,
      isRead: true,
    })
  }

  const users = getUsers()
  const [projects, setProjects] = useState<Project[]>([])
  const [activeProjectId, setActiveProjectId] =
    useState<number | null>(() => getActiveProjectId())

  const [stories, setStories] = useState<Story[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)

  const [taskNazwa, setTaskNazwa] = useState('')
  const [taskOpis, setTaskOpis] = useState('')
  const [taskPriorytet, setTaskPriorytet] =
    useState<Task['priorytet']>('średni')

  const [taskCzas, setTaskCzas] = useState('')
  const [taskHistoryjka, setTaskHistoryjka] = useState<number | null>(null)
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
  setTasks(getTasks())
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
      addNotification(
        'Nowy projekt',
        `Utworzono projekt: ${nazwa}`,
        'high',
        String(user.id)
      )
    }

    setNazwa('')
    setOpis('')
  }

  const handleTaskSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  if (!activeProjectId) {
    alert('Najpierw wybierz aktywny projekt.')
    return
  }

  if (!taskHistoryjka) {
    alert('Wybierz historyjkę.')
    return
  }

  if (!taskNazwa.trim() || !taskOpis.trim()) {
    alert('Wypełnij nazwę i opis zadania.')
    return
  }

  if (!taskCzas || Number(taskCzas) <= 0) {
    alert('Podaj przewidywany czas wykonania.')
    return
  }

  const newTask: Task = {
    id: Date.now(),
    nazwa: taskNazwa,
    opis: taskOpis,
    priorytet: taskPriorytet,
    historyjka: taskHistoryjka,
    przewidywanyCzas: Number(taskCzas),
    zrealizowaneRoboczogodziny: null,
    stan: 'todo',
    dataDodania: new Date().toISOString(),
    dataStartu: null,
    dataZakonczenia: null,
    wlasciciel: null,
  }

  const updatedTasks = [...tasks, newTask]

  setTasks(updatedTasks)
  saveTasks(updatedTasks)
  const story = stories.find(
  (item) => item.id === taskHistoryjka
  )

  if (story) {
    addNotification(
      'Nowe zadanie',
      `Dodano zadanie: ${taskNazwa}`,
      'medium',
      String(story.wlasciciel)
    )
  }


  setTaskNazwa('')
  setTaskOpis('')
  setTaskPriorytet('średni')
  setTaskCzas('')
  setTaskHistoryjka(null)
}

  const handleTaskDelete = (taskId: number) => {
  const task = tasks.find(
    (item) => item.id === taskId
  )

  const updatedTasks = tasks.filter(
    (item) => item.id !== taskId
  )

  setTasks(updatedTasks)
  saveTasks(updatedTasks)

  if (task) {
    const story = stories.find(
      (item) => item.id === task.historyjka
    )

    if (story) {
      addNotification(
        'Usunięto zadanie',
        `Zadanie "${task.nazwa}" zostało usunięte z historyjki.`,
        'medium',
        String(story.wlasciciel)
      )
    }
  }
}

const handleTaskEdit = (task: Task) => {
  const nowaNazwa = prompt('Nazwa zadania:', task.nazwa)

  if (nowaNazwa === null) {
    return
  }

  const nowyOpis = prompt('Opis zadania:', task.opis)

  if (nowyOpis === null) {
    return
  }

  const priorytet = prompt(
    'Priorytet (niski/średni/wysoki):',
    task.priorytet
  ) as Task['priorytet'] | null

  if (
    priorytet !== 'niski' &&
    priorytet !== 'średni' &&
    priorytet !== 'wysoki'
  ) {
    alert('Nieprawidłowy priorytet.')
    return
  }

  const czas = prompt(
    'Przewidywany czas wykonania (godziny):',
    String(task.przewidywanyCzas)
  )

  if (czas === null || Number(czas) <= 0) {
    alert('Nieprawidłowy czas.')
    return
  }

  const stan = prompt(
    'Stan (todo/doing/done):',
    task.stan
  ) as Task['stan'] | null

  if (
    stan !== 'todo' &&
    stan !== 'doing' &&
    stan !== 'done'
  ) {
    alert('Nieprawidłowy stan.')
    return
  }

  const updatedTasks = tasks.map((item) =>
    item.id === task.id
      ? {
          ...item,
          nazwa: nowaNazwa,
          opis: nowyOpis,
          priorytet: priorytet,
          przewidywanyCzas: Number(czas),
          stan: stan,
        }
      : item
  )

  setTasks(updatedTasks)
  saveTasks(updatedTasks)
}

  const handleTaskAssign = (task: Task, userId: number) => {
  const selectedUser = users.find(
    (user) => user.id === userId
  )

  if (!selectedUser) {
    return
  }

  if (
    selectedUser.rola !== 'developer' &&
    selectedUser.rola !== 'devops'
  ) {
    alert('Zadanie można przypisać tylko developerowi lub devopsowi.')
    return
  }

  const updatedTasks = tasks.map((item) =>
    item.id === task.id
      ? {
          ...item,
          wlasciciel: userId,
          stan: 'doing' as Task['stan'],
          dataStartu: new Date().toISOString(),
        }
      : item
  )

  setTasks(updatedTasks)
  saveTasks(updatedTasks)

  addNotification(
    'Przypisano zadanie',
    `Zadanie "${task.nazwa}" zostało Ci przypisane.`,
    'high',
    String(userId)
  )

  const updatedStories = stories.map((story) =>
    story.id === task.historyjka && story.stan === 'todo'
      ? {
          ...story,
          stan: 'doing' as Story['stan'],
        }
      : story
  )

  setStories(updatedStories)
  saveStories(updatedStories)

  const story = stories.find(
    (item) => item.id === task.historyjka
  )

  if (story) {
    addNotification(
      'Zmiana statusu zadania',
      `Zadanie "${task.nazwa}" zmieniło status na doing.`,
      'low',
      String(story.wlasciciel)
    )
  }
  }

  const handleTaskComplete = (task: Task) => {
  const czas = prompt(
    'Ile godzin zajęło wykonanie zadania?',
    String(task.przewidywanyCzas)
  )

  if (czas === null || Number(czas) <= 0) {
    alert('Podaj prawidłową liczbę godzin.')
    return
  }

  const dataZakonczenia = new Date().toISOString()

  const updatedTasks = tasks.map((item) =>
    item.id === task.id
      ? {
          ...item,
          stan: 'done' as Task['stan'],
          dataZakonczenia,
          zrealizowaneRoboczogodziny: Number(czas),
        }
      : item
  )

  setTasks(updatedTasks)
  saveTasks(updatedTasks)


  const story = stories.find(
  (item) => item.id === task.historyjka
  )

  if (story) {
    addNotification(
      'Zadanie zakończone',
      `Zadanie "${task.nazwa}" zmieniło status na done.`,
      'medium',
      String(story.wlasciciel)
    )
  }

  const storyTasks = updatedTasks.filter(
    (item) => item.historyjka === task.historyjka
  )

  const allTasksDone = storyTasks.every(
    (item) => item.stan === 'done'
  )

  if (allTasksDone) {
    const updatedStories = stories.map((story) =>
      story.id === task.historyjka
        ? {
            ...story,
            stan: 'done' as Story['stan'],
          }
        : story
    )

    setStories(updatedStories)
    saveStories(updatedStories)
  }
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
    <main className={`container py-4 ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="mb-4">ManageMe</h1>
      <button
        className="btn btn-secondary mb-3"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? '☀️ Tryb jasny' : '🌙 Tryb ciemny'}
      </button>

      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        🔔 Powiadomienia ({unreadNotifications})
      </button>
      <button
        className="btn btn-link mb-3"
        onClick={() => {
          setShowNotifications(true)
          setSelectedNotification(null)
        }}
      >
        Wszystkie powiadomienia
      </button>
      {showNotifications && !selectedNotification && (
        <NotificationList
          notifications={notifications.filter(
            (notification) => notification.recipientId === String(user.id)
          )}
          onMarkAsRead={handleMarkNotificationAsRead}
          onSelect={handleSelectNotification}
        />
      )}

      {selectedNotification && (
        <NotificationDetails
          notification={selectedNotification}
          onBack={() => setSelectedNotification(null)}
        />
      )}
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

      <form onSubmit={handleSubmit} className="project-form mb-4">
        <h2>
          {editingId !== null ? 'Edytuj projekt' : 'Dodaj projekt'}
        </h2>

        <input
          className="form-control mb-2"
          type="text"
          placeholder="Nazwa projektu"
          value={nazwa}
          onChange={(e) => setNazwa(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Opis projektu"
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
        />

        <button type="submit" className="btn btn-primary me-2">
          {editingId !== null ? 'Zapisz zmiany' : 'Dodaj projekt'}
        </button>

        {editingId !== null && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Anuluj
          </button>
        )}
      </form>

      <StoryForm
        activeProjectId={activeProjectId}
        storyNazwa={storyNazwa}
        setStoryNazwa={setStoryNazwa}
        storyOpis={storyOpis}
        setStoryOpis={setStoryOpis}
        storyPriorytet={storyPriorytet}
        setStoryPriorytet={setStoryPriorytet}
        storyStan={storyStan}
        setStoryStan={setStoryStan}
        onSubmit={handleStorySubmit}
      />

      <TaskForm
        activeProjectId={activeProjectId}
        stories={stories}
        taskNazwa={taskNazwa}
        setTaskNazwa={setTaskNazwa}
        taskOpis={taskOpis}
        setTaskOpis={setTaskOpis}
        taskPriorytet={taskPriorytet}
        setTaskPriorytet={setTaskPriorytet}
        taskCzas={taskCzas}
        setTaskCzas={setTaskCzas}
        taskHistoryjka={taskHistoryjka}
        setTaskHistoryjka={setTaskHistoryjka}
        onSubmit={handleTaskSubmit}
      />

      {activeProjectId !== null && (
  <section className="stories-list">
    <h2>Historyjki projektu</h2>

    <h3>TODO</h3>

    <StoryList
      stories={stories}
      activeProjectId={activeProjectId}
      stan="todo"
      onEdit={handleStoryEdit}
      onDelete={handleStoryDelete}
    />

    <h3>DOING</h3>

    <StoryList
      stories={stories}
      activeProjectId={activeProjectId}
      stan="doing"
      onEdit={handleStoryEdit}
      onDelete={handleStoryDelete}
    />

    <h3>DONE</h3>

    <StoryList
      stories={stories}
      activeProjectId={activeProjectId}
      stan="done"
      onEdit={handleStoryEdit}
      onDelete={handleStoryDelete}
    />
  </section>
)}

  {activeProjectId !== null && (
  <section className="tasks-list">
    <h2>Zadania projektu</h2>

    <h3>TODO</h3>

    <TaskList
      tasks={tasks}
      stories={stories}
      users={users}
      activeProjectId={activeProjectId}
      stan="todo"
      selectedTaskId={selectedTaskId}
      onAssign={handleTaskAssign}
      onEdit={handleTaskEdit}
      onDelete={handleTaskDelete}
      onComplete={handleTaskComplete}
      onSelect={setSelectedTaskId}
    />

    <h3>DOING</h3>

    <TaskList
      tasks={tasks}
      stories={stories}
      users={users}
      activeProjectId={activeProjectId}
      stan="doing"
      selectedTaskId={selectedTaskId}
      onAssign={handleTaskAssign}
      onEdit={handleTaskEdit}
      onDelete={handleTaskDelete}
      onComplete={handleTaskComplete}
      onSelect={setSelectedTaskId}
    />

    <h3>DONE</h3>

    <TaskList
      tasks={tasks}
      stories={stories}
      users={users}
      activeProjectId={activeProjectId}
      stan="done"
      selectedTaskId={selectedTaskId}
      onAssign={handleTaskAssign}
      onEdit={handleTaskEdit}
      onDelete={handleTaskDelete}
      onComplete={handleTaskComplete}
      onSelect={setSelectedTaskId}
    />
  </section>
)}
      <section className="projects">
        <h2>Lista projektów</h2>

        {projects.length === 0 ? (
          <p>Brak projektów.</p>
        ) : (
          projects.map((project) => (
            <article key={project.id}  className="project-card card mb-3 p-3">
              <h3>{project.nazwa}</h3>
              <p>{project.opis}</p>

              <button onClick={() => handleEdit(project)} className="btn btn-warning me-2">
                Edytuj
              </button>

              <button onClick={() => handleDelete(project.id)} className="btn btn-danger">
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
