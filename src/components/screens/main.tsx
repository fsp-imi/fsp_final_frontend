// import { useState } from "react"
// import { Calendar } from "../ui/calendar"
// import { Popover, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
// import { cn } from "@/lib/utils"
// import { CalendarIcon } from "lucide-react"
// import { PopoverClose, PopoverContent } from "@radix-ui/react-popover"
// import { ru } from "date-fns/locale"
// import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
// import DateRangeFilter from "../ui/filters/date-range"
// import AgeGroupFilter from "../ui/filters/age-group"

const MainScreen = () => {
  // const [date, setDate] = useState<{
  //   from: Date | undefined
  //   to: Date | undefined
  // }>()

  const { toast } = useToast()

  return (
    <div className="bg-blue">
      <Button
        onClick={() => {
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
          })
        }}
      >
        Show Toast
      </Button>
      <Button
        onClick={() => {
          toast({
            title: "Scheduled: Catch up1",
            description: "Friday, February 10, 2023 at 5:57 PM",
          })
        }}
      >
        Show Toast
      </Button>
      {/* <AgeGroupFilter /> */}
    </div>
  )
}

export default MainScreen
