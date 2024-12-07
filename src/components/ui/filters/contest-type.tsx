import Loader from "../loader"

import { FiltersContext } from "@/providers/filters"
import { useContext } from "react"
import { Checkbox } from "../checkbox"

const ContestTypeFilter = () => {
  const { contesttypes, isContestTypesLoading, toggleFilter, isActive } =
    useContext(FiltersContext)

  return (
    <div className="flex flex-col gap-1">
      {isContestTypesLoading ? (
        <Loader />
      ) : contesttypes.length > 0 ? (
        contesttypes.map((contesttype) => (
          <div key={contesttype.id} className="flex items-center space-x-2">
            <Checkbox
              checked={isActive("contesttype", contesttype.id.toString())}
              id={`contesttype-${contesttype.id}`}
            />
            <label
              htmlFor={`contesttype-${contesttype.id}`}
              onClick={() =>
                toggleFilter("contesttype", contesttype.id.toString())
              }
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {contesttype.name}
            </label>
          </div>
        ))
      ) : (
        <div className="text-xs">Типов соревнования нет</div>
      )}
    </div>
  )
}

export default ContestTypeFilter
