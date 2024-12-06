import Loader from "../loader"

import { useQuery } from "@tanstack/react-query"
import { AgeGroupService } from "@/services/contest/age-group.service"
import { Checkbox } from "../checkbox"

const AgeGroupFilter = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["age groups"],
    queryFn: AgeGroupService.getAll,
  })

  return (
    <div className="flex flex-col gap-1">
      {isLoading ? (
        <Loader />
      ) : data && data.length > 0 ? (
        data.map((agegroup) => (
          <div key={agegroup.id} className="flex items-center space-x-2">
            <Checkbox id={`agegroup-${agegroup.id}`} />
            <label
              htmlFor={`agegroup-${agegroup.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              от {agegroup.start} лет до {agegroup.end} лет
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
