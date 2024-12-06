import { Input } from "../input"

const ProgramFilter = () => {
  return (
    <div className="flex flex-col gap-1">
      <Input
        placeholder="Поиск..."
        className="text-sm py-2 px-4 min-w-52 h-min placeholder:text-sm"
      />
    </div>
  )
}

export default ProgramFilter
