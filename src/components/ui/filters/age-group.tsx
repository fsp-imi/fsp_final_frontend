import Loader from "../loader"

import { Checkbox } from "../checkbox"
import { useContext } from "react"
import { FiltersContext } from "@/providers/filters"

const AgeGroupFilter = () => {
  const { agegroups, toggleFilter, isAgeGroupsLoading, isActive } =
    useContext(FiltersContext)

  return (
    <div className="flex flex-col gap-1">
      {isAgeGroupsLoading ? (
        <Loader />
      ) : agegroups && agegroups.length > 0 ? (
        agegroups.map((agegroup) => (
          <div key={agegroup.id} className="flex items-center space-x-2">
            <Checkbox
              checked={isActive("age_group", agegroup.id.toString())}
              onClick={() => {
                toggleFilter("age_group", agegroup.id.toString())
              }}
              id={`agegroup-${agegroup.id}`}
            />
            <label
              onClick={() => {
                toggleFilter("age_group", agegroup.id.toString())
              }}
              htmlFor={`agegroup-${agegroup.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {!agegroup.gender ? "женщины" : "мужчины"}{" "}
              {`от ${agegroup.start}`} лет{" "}
              {agegroup.end && `до ${agegroup.end} лет`}
            </label>
          </div>
        ))
      ) : (
        <div className="text-xs">Возрастных групп нет</div>
      )}
    </div>
  )
}

export default AgeGroupFilter
