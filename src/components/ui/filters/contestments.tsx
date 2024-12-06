import { FiltersContext } from "@/providers/filters"
import { useContext } from "react"
import { Input } from "../input"

const ContestmentsFilter = () => {
  const { handleFilterChange, mincontestant, maxcontestant } =
    useContext(FiltersContext)

  return (
    <div className="flex flex-row gap-2 text-xs">
      <div className="flex flex-col gap-1">
        <div className="">От</div>
        <Input
          value={mincontestant}
          onChange={(e) => {
            console.log("sldfjks")
            handleFilterChange("mincontestant", e.target.value)
          }}
          className="py-2 px-4 text-xs placeholder:text-xs"
          placeholder="1"
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="">До</div>
        <Input
          value={maxcontestant}
          onChange={(e) => {
            handleFilterChange("maxcontestant", e.target.value)
          }}
          className="py-2 px-4 text-xs placeholder:text-xs"
          placeholder="1000"
        />
      </div>
    </div>
  )
}

export default ContestmentsFilter
