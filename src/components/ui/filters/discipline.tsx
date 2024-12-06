import Loader from "../loader"

import { FiltersContext } from "@/providers/filters"
import { useContext } from "react"
import { Checkbox } from "../checkbox"

const DisciplineFilter = () => {
  const { disciplines, isDisciplinesLoading, toggleFilter, isActive } =
    useContext(FiltersContext)

  return (
    <div className="">
      {isDisciplinesLoading ? (
        <Loader />
      ) : disciplines && disciplines.length > 0 ? (
        <div className="cursor-pointer flex flex-col gap-1 justify-start items-start">
          {disciplines.map((discipline) => (
            <div key={discipline.id} className="flex items-center space-x-2">
              <Checkbox
                onClick={() => {
                  toggleFilter("discipline", discipline.id.toString())
                }}
                checked={isActive("discipline", discipline.id.toString())}
                id={`discipline-${discipline.id}`}
              />
              <label
                htmlFor={`discipline-${discipline.id}`}
                onClick={() =>
                  toggleFilter("contesttype", discipline.id.toString())
                }
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {discipline.name}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-xs whitespace-nowrap">
          Дисциплин нет, выберите вид спорта
        </div>
      )}
    </div>
  )
}

export default DisciplineFilter
