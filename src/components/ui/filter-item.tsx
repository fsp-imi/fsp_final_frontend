import { FC } from "react"
import { IFilter } from "@/interfaces/filter"
import { ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface IFilterItemProps {
  filter: IFilter
  setIsOpen: (isOpen: boolean) => void
}

const FilterItem: FC<IFilterItemProps> = ({ filter, setIsOpen }) => {
  const { children, isOpen, label } = filter

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        className="relative select-none p-3 flex flex-row gap-1 justify-center items-center border-[1px] border-black rounded-lg cursor-pointer z-[1]"
      >
        <div className="text-xs">{label}</div>

        <div className={isOpen ? "rotate-180" : "rotate-0"}>
          <ArrowDown />
        </div>
      </div>
      <div
        className={cn(
          isOpen ? "flex" : "hidden",
          "absolute left-0 top-12 shadow-lg py-4 px-3 bg-white rounded-xl z-[2]"
        )}
      >
        {children}
      </div>
    </>
  )
}

export default FilterItem
