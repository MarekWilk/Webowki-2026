import type { Task, Story, User } from '../types'
import TaskCard from './TaskCard'

interface TaskListProps {
  tasks: Task[]
  stories: Story[]
  users: User[]
  activeProjectId: number | null
  stan: Task['stan']
  selectedTaskId: number | null
  onAssign: (task: Task, userId: number) => void
  onEdit: (task: Task) => void
  onDelete: (taskId: number) => void
  onComplete: (task: Task) => void
  onSelect: (taskId: number | null) => void
}

function TaskList({
  tasks,
  stories,
  users,
  activeProjectId,
  stan,
  selectedTaskId,
  onAssign,
  onEdit,
  onDelete,
  onComplete,
  onSelect,
}: TaskListProps) {
  const filteredTasks = tasks.filter((task) => {
    const story = stories.find(
      (item) => item.id === task.historyjka
    )

    return (
      story?.projekt === activeProjectId &&
      task.stan === stan
    )
  })

  return (
    <>
      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          stories={stories}
          users={users}
          onAssign={onAssign}
          onEdit={onEdit}
          onDelete={onDelete}
          onComplete={onComplete}
          selectedTaskId={selectedTaskId}
          onSelect={onSelect}
        />
      ))}
    </>
  )
}

export default TaskList