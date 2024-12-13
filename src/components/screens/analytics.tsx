import Loader from "../ui/loader"

import { useQuery } from "@tanstack/react-query"
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
import { FiltersContext } from "@/providers/filters"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"

const AnalyticsScreen = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: AnalyticService.getAll,
  })

  const { setCurPage } = useContext(FiltersContext)

  return (
    <div className="w-full p-8 relative bg-white rounded-3xl flex flex-col gap-8">
      <div className="text-3xl font-medium">Аналитика</div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Район</TableHead>
            <TableHead>Среднее количество очков</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell>
                <Loader />
              </TableCell>
            </TableRow>
          ) : data ? (
            Object.entries(data).map(([region, points], index) => (
              <TableRow key={index}>
                <TableCell>{region}</TableCell>
                <TableCell>{points}</TableCell>
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

export default AnalyticsScreen
