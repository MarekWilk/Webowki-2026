import type { Task, Story, User } from '../types'

interface TaskCardProps {
  task: Task
  stories: Story[]
  users: User[]
  onAssign: (task: Task, userId: number) => void
  onEdit: (task: Task) => void
  onDelete: (taskId: number) => void
  onComplete: (task: Task) => void
  selectedTaskId: number | null
  onSelect: (taskId: number | null) => void
}

function TaskCard({
  task,
  stories,
  users,
  onAssign,
  onEdit,
  onDelete,
  onComplete,
  selectedTaskId,
  onSelect,
}: TaskCardProps) {
  const story = stories.find(
    (item) => item.id === task.historyjka
  )

  const owner = users.find(
    (user) => user.id === task.wlasciciel
  )

  return (
    <article className="task-card card mb-3 p-3">
      <h4>{task.nazwa}</h4>

      {selectedTaskId === task.id && (
        <div className="task-details">
          <h5>Szczegóły zadania</h5>

          <p>
            <strong>Historyjka:</strong>{' '}
            {story?.nazwa ?? 'Brak'}
          </p>

          <p>
            <strong>Odpowiedzialny:</strong>{' '}
            {owner
              ? `${owner.imie} ${owner.nazwisko}`
              : 'Nieprzypisany'}
          </p>

          <p>
            <strong>Opis:</strong> {task.opis}
          </p>

          <p>
            <strong>Przewidywany czas:</strong>{' '}
            {task.przewidywanyCzas} h
          </p>

          <p>
            <strong>Data rozpoczęcia:</strong>{' '}
            {task.dataStartu
              ? new Date(task.dataStartu).toLocaleString()
              : 'Brak'}
          </p>

          <p>
            <strong>Data zakończenia:</strong>{' '}
            {task.dataZakonczenia
              ? new Date(task.dataZakonczenia).toLocaleString()
              : 'Brak'}
          </p>

          <p>
            <strong>Zrealizowane roboczogodziny:</strong>{' '}
            {task.zrealizowaneRoboczogodziny ?? 'Brak'}
          </p>
        </div>
      )}

      <p>{task.opis}</p>

      <p>
        <strong>Priorytet:</strong> {task.priorytet}
      </p>

      <p>
        <strong>Czas:</strong> {task.przewidywanyCzas} h
      </p>

      <p>
        <strong>Stan:</strong> {task.stan}
      </p>

      <label>
        Odpowiedzialny:

        <select
          value={task.wlasciciel ?? ''}
          onChange={(e) =>
            onAssign(task, Number(e.target.value))
          }
        >
          <option value="">Wybierz użytkownika</option>

          {users
            .filter(
              (user) =>
                user.rola === 'developer' ||
                user.rola === 'devops'
            )
            .map((user) => (
              <option key={user.id} value={user.id}>
                {user.imie} {user.nazwisko} ({user.rola})
              </option>
            ))}
        </select>
      </label>

      <div className="d-flex gap-2 flex-wrap">
      <button
        className="btn btn-info me-2"
        onClick={() =>
            onSelect(
            selectedTaskId === task.id ? null : task.id
            )
        }
        >
          Szczegóły
      </button>

      <button onClick={() => onEdit(task)} className="btn btn-warning me-2">
        Edytuj
      </button>

      {task.stan === 'doing' && (
        <button onClick={() => onComplete(task)} className="btn btn-success me-2">
          Zakończ
        </button>
      )}

      <button onClick={() => onDelete(task.id)} className="btn btn-danger">
        Usuń
      </button>
      </div>
    </article>
  )
}

export default TaskCard