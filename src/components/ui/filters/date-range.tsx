import { useContext, useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "../popover"
import { Button } from "../button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "../calendar"
import { ru } from "date-fns/locale"
import { FiltersContext } from "@/providers/filters"
import { PopoverClose } from "@radix-ui/react-popover"

function formatDateString(dateStr: string): string {
  if (dateStr.length !== 8) {
    return ""
  }

  const day = dateStr.substring(0, 2)
  const month = dateStr.substring(2, 4)
  const year = dateStr.substring(4)

  return `${day}-${month}-${year}`
}

const DateRangeFilter = () => {
  const { handleDateRangeFilters, datestart, dateend } =
    useContext(FiltersContext)

  const [date, setDate] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: datestart ? new Date(formatDateString(datestart)) : undefined,
    to: dateend ? new Date(formatDateString(dateend)) : undefined,
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[260px] justify-start text-left font-normal relative",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date && date.from && format(date.from, "dd-MM-yyyy")}
          {date && date.from && date.to && " - "}
          {date && date.to && format(date.to, "dd-MM-yyyy")}
          {!date?.from && !date?.to && "Выберите даты проведения"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 bg-white" align="start">
        <Calendar
          className=""
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

        <div className="w-full flex flex-row justify-between">
          <PopoverClose>
            <Button>Выбрать</Button>
          </PopoverClose>
          <Button
            onClick={() => {
              setDate({ from: undefined, to: undefined })
              handleDateRangeFilters({ from: undefined, to: undefined })
            }}
            variant="secondary"
          >
            Сбросить
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DateRangeFilter
