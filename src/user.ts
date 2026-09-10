import type { User } from './types'

const users: User[] = [
  {
    id: 1,
    imie: 'Marek',
    nazwisko: 'Wilk',
    rola: 'admin',
  },
  {
    id: 2,
    imie: 'Jan',
    nazwisko: 'Kowalski',
    rola: 'developer',
  },
  {
    id: 3,
    imie: 'Adam',
    nazwisko: 'Nowak',
    rola: 'devops',
  },
]

export function getLoggedUser(): User {
  return users[0]
}

export function getUsers(): User[] {
  return users
}