import type { User } from './types'

const loggedUser: User = {
  id: 1,
  imie: 'Marek',
  nazwisko: 'Wilk',
}

export function getLoggedUser(): User {
  return loggedUser
}