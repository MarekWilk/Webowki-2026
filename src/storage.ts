import type { Project } from './types'

const STORAGE_KEY = 'manageme-projects'

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