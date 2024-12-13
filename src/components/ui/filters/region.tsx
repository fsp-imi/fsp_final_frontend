import { useContext } from "react"
import { ScrollArea } from "../scroll-area"
import { FiltersContext } from "@/providers/filters"
import Loader from "../loader"
import { Checkbox } from "../checkbox"

const RegionFilter = () => {
  const { regions, isRegionsLoading, toggleFilter, isActive } =
    useContext(FiltersContext)

  return (
    <ScrollArea className="h-[100px]">
      <div className="flex flex-col gap-1">
        {isRegionsLoading ? (
          <Loader />
        ) : regions.length > 0 ? (
          regions.map((region) => (
            <div key={region.id} className="flex items-center space-x-2">
              <Checkbox
                onClick={() => toggleFilter("region", region.id.toString())}
                checked={isActive("region", region.id.toString())}
                id={`region-${region.id}`}
              />
              <label
                htmlFor={`region-${region.id}`}
                onClick={() => toggleFilter("region", region.id.toString())}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {region.name}
              </label>
            </div>
          ))
        ) : (
          <div className="text-xs">Регионов нет</div>
        )}
      </div>
    </ScrollArea>
  )
}

export default RegionFilter
