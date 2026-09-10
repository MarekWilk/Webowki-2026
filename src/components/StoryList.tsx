import type { Story } from '../types'

interface StoryListProps {
  stories: Story[]
  activeProjectId: number | null
  stan: Story['stan']
  onEdit: (story: Story) => void
  onDelete: (storyId: number) => void
}

function StoryList({
  stories,
  activeProjectId,
  stan,
  onEdit,
  onDelete,
}: StoryListProps) {
  const filteredStories = stories.filter(
    (story) =>
      story.projekt === activeProjectId &&
      story.stan === stan
  )

  return (
    <>
      {filteredStories.map((story) => (
        <article key={story.id} className="story-card">
          <h4>{story.nazwa}</h4>

          <p>{story.opis}</p>

          <p>
            <strong>Priorytet:</strong> {story.priorytet}
          </p>

          <p>
            <strong>Data utworzenia:</strong>{' '}
            {new Date(story.dataUtworzenia).toLocaleString()}
          </p>

          <button onClick={() => onEdit(story)}>
            Edytuj
          </button>

          <button onClick={() => onDelete(story.id)}>
            Usuń
          </button>
        </article>
      ))}
    </>
  )
}

export default StoryList