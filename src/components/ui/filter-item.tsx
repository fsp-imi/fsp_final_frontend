import { FC } from "react"
import { IFilter } from "@/interfaces/filter"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export interface IFilterItemProps {
  filter: IFilter
}

const FilterItem: FC<IFilterItemProps> = ({ filter }) => {
  const { children, label } = filter

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="">
            {label} <ChevronsUpDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="">
          {children}
        </PopoverContent>
      </Popover>
    </>
  )
}

export default FilterItem
