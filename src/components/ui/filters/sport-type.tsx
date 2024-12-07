import Loader from "../loader"

import { FiltersContext } from "@/providers/filters"
import { useContext } from "react"
import { Checkbox } from "../checkbox"

const SportTypeFilter = () => {
  const { sporttypes, isSportTypesLoading, toggleFilter, isActive } =
    useContext(FiltersContext)

  return (
    <>
      {isSportTypesLoading ? (
        <Loader />
      ) : sporttypes && sporttypes.length > 0 ? (
        <div className="cursor-pointer flex flex-col gap-1 justify-start items-start">
          {sporttypes.map((sporttype) => (
            <div key={sporttype.id} className="flex items-center space-x-2">
              <Checkbox
                onClick={() =>
                  toggleFilter("sporttype", sporttype.id.toString())
                }
                checked={isActive("sporttype", sporttype.id.toString())}
                id={`sporttype-${sporttype.id}`}
              />
              <label
                htmlFor={`sporttype-${sporttype.id}`}
                onClick={() =>
                  toggleFilter("sporttype", sporttype.id.toString())
                }
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {sporttype.name}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-xs">Видов спорта нет</div>
      )}
    </>
  )
}

export default SportTypeFilter
