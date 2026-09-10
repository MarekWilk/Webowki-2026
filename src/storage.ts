import type { Project, Story, Task } from './types'

const STORAGE_KEY = 'manageme-projects'
const STORY_STORAGE_KEY = 'manageme-stories'
const ACTIVE_PROJECT_STORAGE_KEY = 'manageme-active-project'
export function getProjects(): Project[] {
  const data = localStorage.getItem(STORAGE_KEY)
  
  if (!data) {
    return []
  }

  return JSON.parse(data)
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

export function getStories(): Story[] {
  const data = localStorage.getItem(STORY_STORAGE_KEY)

  if (!data) {
    return []
  }

  return JSON.parse(data)
}

export function saveStories(stories: Story[]): void {
  localStorage.setItem(STORY_STORAGE_KEY, JSON.stringify(stories))
}

export function getActiveProjectId(): number | null {
  const data = localStorage.getItem(ACTIVE_PROJECT_STORAGE_KEY)

  if (!data) {
    return null
  }

  return Number(data)
}

export function getTasks(): Task[] {
  const data = localStorage.getItem('manageme-tasks')

  if (!data) {
    return []
  }

  return JSON.parse(data)
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem('manageme-tasks', JSON.stringify(tasks))
}

export function saveActiveProjectId(projectId: number | null): void {
  if (projectId === null) {
    localStorage.removeItem(ACTIVE_PROJECT_STORAGE_KEY)
    return
  }

  localStorage.setItem(
    ACTIVE_PROJECT_STORAGE_KEY,
    String(projectId)
  )
}