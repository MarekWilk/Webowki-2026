import type { Notification } from '../types'

interface NotificationListProps {
  notifications: Notification[]
  onMarkAsRead: (notification: Notification) => void
  onSelect: (notification: Notification) => void
}

function NotificationList({
  notifications,
  onMarkAsRead,
  onSelect,
}: NotificationListProps) {
  return (
    <section className="mb-4">
      <h2>Powiadomienia</h2>

      {notifications.length === 0 ? (
        <p>Brak powiadomień.</p>
      ) : (
        notifications.map((notification) => (
          <article
            key={notification.title + notification.date}
            className={`card mb-2 p-3 ${
                notification.isRead ? 'opacity-75' : ''
            }`}
          >
            <h5>{notification.title}</h5>
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

            <p>{notification.message}</p>

            <small>
                {new Date(notification.date).toLocaleString()}
            </small>

            <button
                className="btn btn-info mt-2 me-2"
                onClick={() => onSelect(notification)}
            >
                Otwórz
            </button>

            {!notification.isRead && (
            <button
                className="btn btn-success mt-2"
                onClick={() => onMarkAsRead(notification)}
            >
                Oznacz jako przeczytane
            </button>
            )}
          </article>
        ))
      )}
    </section>
  )
}

export default NotificationList