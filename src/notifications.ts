import type { Notification } from './types'

export const initialNotifications: Notification[] = [
    {
    title: 'Nowy projekt',
    message: 'Utworzono nowy projekt.',
    date: new Date().toISOString(),
    prority: 'high',
    isRead: false,
    recipientId: '1',
    },

    {
    title: 'Przypisano osobę',
    message: 'Przypisano osobę do historyjki lub zadania.',
    date: new Date().toISOString(),
    prority: 'high',
    isRead: false,
    recipientId: '1',
    },

    {
    title: 'Nowe zadanie w historyjce',
    message: 'Dodano nowe zadanie do historyjki.',
    date: new Date().toISOString(),
    prority: 'medium',
    isRead: false,
    recipientId: '1',
    },

    {
    title: 'Usunięto zadanie',
    message: 'Usunięto zadanie z historyjki.',
    date: new Date().toISOString(),
    prority: 'medium',
    isRead: false,
    recipientId: '1',
    },

    {
    title: 'Zadanie w realizacji',
    message: 'Zadanie zmieniło status na doing.',
    date: new Date().toISOString(),
    prority: 'low',
    isRead: false,
    recipientId: '1',
    },
    
    {
    title: 'Zadanie zakończone',
    message: 'Zadanie zmieniło status na done.',
    date: new Date().toISOString(),
    prority: 'medium',
    isRead: false,
    recipientId: '1',
    },
]