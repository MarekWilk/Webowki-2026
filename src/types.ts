export interface Project {
  id: number
  nazwa: string
  opis: string
}
export interface User {
  id: number
  imie: string
  nazwisko: string
  rola: 'admin' | 'developer' | 'devops'
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
export interface Task {
  id: number
  nazwa: string
  opis: string
  priorytet: 'niski' | 'średni' | 'wysoki'
  historyjka: number
  przewidywanyCzas: number
  stan: 'todo' | 'doing' | 'done'
  dataDodania: string
  dataStartu: string | null
  dataZakonczenia: string | null
  wlasciciel: number | null
}