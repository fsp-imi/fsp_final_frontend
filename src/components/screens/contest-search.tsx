import Filters from "../ui/filters/filters"
import Loader from "../ui/loader"
import ContestCard from "../ui/contest-card"

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
import { Link, useNavigate } from "react-router-dom"

const ContestSearch = () => {
  const {
    contests: data,
    contesttypes,
    isContestsLoading,
    setCurPage,
  } = useContext(FiltersContext)

  const navigate = useNavigate()

  return (
    <div className="w-full p-8 relative bg-white rounded-3xl flex flex-col gap-8">
      <div className="text-3xl font-semibold">
        Единый календарный план Федерации спортивного программирования
      </div>

      <Filters />

      <div className="lg:hidden flex flex-col gap-2">
        {isContestsLoading ? (
          <Loader />
        ) : data && data.data.contests && data.data.contests.length > 0 ? (
          data.data.contests.map((contest) => (
            <ContestCard
              key={contest.id}
              disciplines={data.data.disciplines[contest.id.toString()].map(
                (discipline) => discipline
              )}
              agegroups={data.data.ages[contest.id.toString()].map(
                (age) => age
              )}
              contest_type={
                contesttypes.find((item) => item.id === contest.contest_type)
                  ?.name
              }
              contest={contest}
            />
          ))
        ) : (
          <div>К сожалению подходящих мероприятий нет</div>
        )}
      </div>

      <Table className="hidden lg:block">
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
            <TableHead>Уровень</TableHead>
            <TableHead>Формат</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Результаты</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isContestsLoading ? (
            <TableRow>
              <TableCell className="w-full flex justify-center items-center">
                <Loader />
              </TableCell>
            </TableRow>
          ) : data && data.data.contests && data.data.contests.length > 0 ? (
            data.data.contests.map((contest) => {
              return (
                <TableRow
                  className="cursor-pointer"
                  onClick={() => {
                    navigate(`/contest/${contest.id}`)
                  }}
                  key={contest.id}
                >
                  <TableCell>
                    {contest.name}{" "}
                    {data.data.sport_types[contest.id.toString()]}{" "}
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
                  <TableCell>
                    {contesttypes.find(
                      (item) => item.id === contest.contest_type
                    )?.name || "-"}
                  </TableCell>
                  <TableCell>
                    {contest.format === "ONLINE"
                      ? "Онлайн"
                      : contest.format === "OFFLINE"
                      ? "Оффлайн"
                      : "Смешанный"}
                  </TableCell>
                  <TableCell>
                    {contest.status === "ACTIVE"
                      ? "Активный"
                      : contest.status === "CLOSED"
                      ? "Закрыт"
                      : "Отменен"}
                  </TableCell>
                  <TableCell>
                    {contest.status === "CLOSED" ? (
                      <Link to={`/contest/${contest.id}/#result`}>
                        Посмотреть
                      </Link>
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
