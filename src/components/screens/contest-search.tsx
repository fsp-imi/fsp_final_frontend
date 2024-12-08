import Filters from "../ui/filters/filters"
import Loader from "../ui/loader"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { format } from "date-fns"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"
import { useContext } from "react"
import { FiltersContext } from "@/providers/filters"
import { Link } from "react-router-dom"

const ContestSearch = () => {
  const {
    contests: data,
    isContestsLoading,
    setCurPage,
  } = useContext(FiltersContext)

  return (
    <div className="w-full p-8 relative bg-white rounded-3xl flex flex-col gap-8">
      <Filters />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Наименование спортивного мероприятия (пол, возрастная группа)
              (дисциплина, группа)
            </TableHead>
            <TableHead>Сроки проведения</TableHead>
            <TableHead>
              Место проведения (страна (-ы), субъект РФ, город) (спортивная
              база, центр)
            </TableHead>
            <TableHead>Формат</TableHead>
            <TableHead>Результаты</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isContestsLoading ? (
            <TableRow>
              <TableCell>
                <Loader />
              </TableCell>
            </TableRow>
          ) : data && data.data.contests && data.data.contests.length > 0 ? (
            data.data.contests.map((contest) => {
              return (
                <TableRow key={contest.id}>
                  <TableCell>
                    {contest.name}{" "}
                    {data.data.disciplines[contest.id.toString()].map(
                      (discipline, index) => (
                        <span key={index} className="">
                          {discipline}{" "}
                        </span>
                      )
                    )}
                    {data.data.ages[contest.id.toString()].map((age, index) => (
                      <span key={index}>{age} </span>
                    ))}
                  </TableCell>
                  <TableCell>
                    {format(contest.start_time, "dd.MM.yyyy")}
                    {contest.end_time &&
                      "-" + format(contest.end_time, "dd.MM.yyyy")}
                  </TableCell>
                  <TableCell>{contest.place}</TableCell>
                  <TableCell>{contest.format}</TableCell>
                  <TableCell>
                    {contest.file ? (
                      <Link to={contest.file}>Скачать</Link>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell>
                <div className="font-medium">
                  К сожалению подходящих по фильтрам мероприятий нет
                </div>
              </TableCell>
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

export default ContestSearch
