import { FiltersContext } from "@/providers/filters"
import { useContext } from "react"
import { Checkbox } from "../checkbox"

const GenderGroupFilter = () => {
  const { toggleFilter, isActive } = useContext(FiltersContext)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          onClick={() => {
            toggleFilter("male", "Мужской")
          }}
          checked={isActive("male", "Мужской")}
          id={`man`}
        />
        <label
          htmlFor={`man`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Мужской
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          onClick={() => {
            toggleFilter("female", "Женский")
          }}
          checked={isActive("female", "Женский")}
          id={`woman`}
        />
        <label
          htmlFor={`woman`}
          onClick={() => toggleFilter("female", "Женский")}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Женский
        </label>
      </div>
    </div>
  )
}

export default GenderGroupFilter
