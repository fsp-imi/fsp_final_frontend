import { useContext, useState } from "react"
import { Calendar } from "../calendar"
import { ru } from "date-fns/locale"
import { FiltersContext } from "@/providers/filters"

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
  )
}

export default DateRangeFilter
