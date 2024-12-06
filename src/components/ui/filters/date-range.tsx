import { useContext, useState } from "react"
import { Popover, PopoverTrigger } from "../popover"
import { Button } from "../button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { PopoverContent } from "@radix-ui/react-popover"
import { Calendar } from "../calendar"
import { ru } from "date-fns/locale"
import { FiltersContext } from "@/providers/filters"

const DateRangeFilter = () => {
  const { handleDateRangeFilters, datestart, dateend } =
    useContext(FiltersContext)

  const [date, setDate] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(datestart),
    to: new Date(dateend),
  })

  return (
    <div className="min-w-[300px]">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date && date.from && format(date.from, "dd-MM-yyyy")} -{" "}
            {date && date.to && format(date.to, "dd-MM-yyyy")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            className="bg-white"
            locale={ru}
            mode="range"
            selected={date}
            onSelect={(e) => {
              const newDate = {
                from: e?.from || undefined,
                to: e?.to || undefined,
              }
              handleDateRangeFilters(newDate)
              setDate(newDate)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateRangeFilter
