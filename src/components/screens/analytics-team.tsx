import Loader from "../ui/loader"

import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { AnalyticService } from "@/services/analytic/analytic"
import { useContext } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"

import { FiltersContext } from "@/providers/filters"
import { Checkbox } from "../ui/checkbox"
import { ChevronsUpDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { useSearchParams } from "react-router-dom"
import { ScrollArea } from "../ui/scroll-area"

const AnalyticsTeamScreen = () => {
  const [searchParams] = useSearchParams()

  const { data, isLoading } = useQuery({
    queryKey: ["analytics", searchParams.toString()],
    queryFn: async () =>
      await AnalyticService.getAllForTeams(searchParams.toString()),
    placeholderData: keepPreviousData,
  })

  const { setCurPage, regions, isRegionsLoading, toggleFilter, isActive } =
    useContext(FiltersContext)

  return (
    <div className="w-full p-8 relative bg-white rounded-3xl flex flex-col gap-8">
      <div className="text-3xl font-medium">Аналитика по командам</div>

      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-min">
            Регионы <ChevronsUpDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="">
          <ScrollArea className="h-[100px]">
            <div className="flex flex-col gap-1">
              {isRegionsLoading ? (
                <Loader />
              ) : regions.length > 0 ? (
                regions.map((region) => (
                  <div key={region.id} className="flex items-center space-x-2">
                    <Checkbox
                      onClick={() =>
                        toggleFilter("region", region.id.toString())
                      }
                      checked={isActive("region", region.id.toString())}
                      id={`region-${region.id}`}
                    />
                    <label
                      htmlFor={`region-${region.id}`}
                      onClick={() =>
                        toggleFilter("region", region.id.toString())
                      }
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
        </PopoverContent>
      </Popover>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Район</TableHead>
            <TableHead>Количество команд</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell>
                <Loader />
              </TableCell>
            </TableRow>
          ) : data && data.data.length > 0 ? (
            data.data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{Object.entries(item)[0][0]}</TableCell>
                <TableCell>{Object.entries(item)[0][1]}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>Аналитик нет</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {data && data.pages && (
        <Pagination>
          <PaginationContent>
            <PaginationItem
              onClick={() => {
                if (data.pages.cur_page !== 1)
                  setCurPage((Number(data.pages.cur_page) - 1).toString())
              }}
            >
              <PaginationPrevious />
            </PaginationItem>

            {data.pages.total > 10 ? (
              <>
                {Array.from({ length: 10 }, (_, index) => (
                  <PaginationItem
                    key={index}
                    onClick={() => setCurPage((index + 1).toString())}
                  >
                    <PaginationLink
                      isActive={index + 1 === data.pages.cur_page}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                {Array.from({ length: 10 }, (_, index) => (
                  <PaginationItem
                    key={index}
                    onClick={() =>
                      setCurPage((data.pages.total - index).toString())
                    }
                  >
                    <PaginationLink
                      isActive={index + 1 === data.pages.cur_page}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </>
            ) : (
              Array.from({ length: data.pages.total }, (_, index) => (
                <PaginationItem
                  key={index}
                  onClick={() => setCurPage((index + 1).toString())}
                >
                  <PaginationLink isActive={index + 1 === data.pages.cur_page}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))
            )}

            <PaginationItem
              onClick={() => {
                if (data.pages.cur_page !== data.pages.total)
                  setCurPage((Number(data.pages.cur_page) + 1).toString())
              }}
            >
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

export default AnalyticsTeamScreen
