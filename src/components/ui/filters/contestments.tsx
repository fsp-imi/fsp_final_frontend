import { FiltersContext } from "@/providers/filters"
import { useContext } from "react"
import { Input } from "../input"
import { Label } from "../label"

const ContestmentsFilter = () => {
  const { handleFilterChange, mincontestant, maxcontestant } =
    useContext(FiltersContext)

  return (
    <div className="flex flex-row gap-2 text-xs">
      <div>
        <Label htmlFor="mincontestant">От</Label>
        <Input
          id="mincontestant"
          value={mincontestant}
          onChange={(e) => {
            handleFilterChange("mincontestant", e.target.value)
          }}
          className="py-2 px-4 text-xs placeholder:text-xs"
          placeholder="1"
        />
      </div>

      <div>
        <Label htmlFor="maxcontestant">До</Label>
        <Input
          id="maxcontestant"
          value={maxcontestant}
          onChange={(e) => {
            handleFilterChange("maxcontestant", e.target.value)
          }}
          placeholder="1000"
        />
      </div>
    </div>
  )
}

export default ContestmentsFilter
