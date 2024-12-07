import Loader from "../loader"

import { useQuery } from "@tanstack/react-query"
import { AgeGroupService } from "@/services/contest/age-group.service"
import { Checkbox } from "../checkbox"
import { useContext } from "react"
import { FiltersContext } from "@/providers/filters"

const AgeGroupFilter = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["age groups"],
    queryFn: AgeGroupService.getAll,
  })

  const { handleAgeGroups, ageend, agestart, female, male } =
    useContext(FiltersContext)

  return (
    <div className="flex flex-col gap-1">
      {isLoading ? (
        <Loader />
      ) : data && data.length > 0 ? (
        data.map((agegroup) => {
          let isActive = false
          if (agestart === agegroup.start.toString())
            if (agegroup.end) {
              if (agegroup.end.toString() === ageend)
                if (
                  (agegroup.gender === 1 && male === "Мужской") ||
                  (agegroup.gender === 0 && female === "Женский")
                )
                  isActive = true
            } else {
              if (
                (agegroup.gender === 1 && male === "Мужской") ||
                (agegroup.gender === 0 && female === "Женский")
              )
                isActive = true
            }

          return (
            <div key={agegroup.id} className="flex items-center space-x-2">
              <Checkbox
                checked={isActive}
                onClick={() => {
                  handleAgeGroups(
                    agegroup.gender === 1 ? true : false,
                    agegroup.start,
                    agegroup.end
                  )
                }}
                id={`agegroup-${agegroup.id}`}
              />
              <label
                onClick={() => {
                  handleAgeGroups(
                    agegroup.gender === 1 ? true : false,
                    agegroup.start,
                    agegroup.end
                  )
                }}
                htmlFor={`agegroup-${agegroup.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {!agegroup.gender ? "женщины" : "мужчины"}{" "}
                {`от ${agegroup.start}`} лет{" "}
                {agegroup.end && `до ${agegroup.end} лет`}
              </label>
            </div>
          )
        })
      ) : (
        <div className="text-xs">Возрастных групп нет</div>
      )}
    </div>
  )
}

export default AgeGroupFilter
