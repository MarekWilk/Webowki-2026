import type { Notification } from '../types'

interface NotificationDetailsProps {
  notification: Notification
  onBack: () => void
}

function NotificationDetails({
  notification,
  onBack,
}: NotificationDetailsProps) {
  return (
    <section className="card mb-4 p-4">
      <button
        className="btn btn-secondary mb-3"
        onClick={onBack}
      >
        ← Wróć do powiadomień
      </button>

      <h2>{notification.title}</h2>

      <span
        className={`badge ${
          notification.prority === 'high'
            ? 'bg-danger'
            : notification.prority === 'medium'
              ? 'bg-warning text-dark'
              : 'bg-success'
        }`}
      >
        Priorytet: {notification.prority}
      </span>

      <p className="mt-3">{notification.message}</p>

      <p>
        <strong>Data utworzenia:</strong>{' '}
        {new Date(notification.date).toLocaleString()}
      </p>

      <p>
        <strong>Status:</strong>{' '}
        {notification.isRead ? 'Przeczytane' : 'Nieprzeczytane'}
      </p>
    </section>
  )
}

export default NotificationDetails