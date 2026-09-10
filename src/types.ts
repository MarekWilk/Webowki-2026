export interface Project {
  id: number
  nazwa: string
  opis: string
}
export interface User {
  id: number
  imie: string
  nazwisko: string
}
export interface Story {
  id: number
  nazwa: string
  opis: string
  priorytet: 'niski' | 'średni' | 'wysoki'
  projekt: number
  dataUtworzenia: string
  stan: 'todo' | 'doing' | 'done'
  wlasciciel: number
}