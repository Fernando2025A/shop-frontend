
type Props = {
  title: string;
}

function EditCard({ title }: Props) {
  return (
    <form>
      <h1>{title}</h1>
    </form>
  )
}

export default EditCard