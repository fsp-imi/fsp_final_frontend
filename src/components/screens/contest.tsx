import { ContestService } from "@/services/contest/contest.service"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../ui/loader"
import { format } from "date-fns"
import { ResultService } from "@/services/result/result"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Button } from "../ui/button"
import { ContestTypeService } from "@/services/contest/contest-type.service"

const ContestScreen = () => {
  const { id } = useParams()

  const { data: contesttypes, isLoading: isContestTypesLoading } = useQuery({
    queryKey: ["contesttypes"],
    queryFn: ContestTypeService.getAll,
  })
  const { data, isLoading } = useQuery({
    queryKey: ["contest"],
    queryFn: async () => await ContestService.getById(id!),
    enabled: !!id,
  })

  const { data: result, isLoading: isResultLoading } = useQuery({
    queryKey: ["contest result"],
    queryFn: async () => await ResultService.getByContestId(id!),
    enabled: !!id,
  })

  const navigate = useNavigate()

  if (isLoading || isContestTypesLoading) return <Loader />

  if (data)
    return (
      <div className="w-full p-8 relative bg-white rounded-3xl flex flex-col gap-8">
        <div className="text-3xl font-medium">{data.data.contest.name}</div>

        <div className="flex flex-col gap-1">
          <div className="text-2xl">Даты проведения</div>
          <div className="text-xl">
            {format(data.data.contest.start_time, "dd.MM.yyyy")}
            {data.data.contest.end_time &&
              "-" + format(data.data.contest.end_time, "dd.MM.yyyy")}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-2xl">Место проведения</div>
          <div className="text-xl">{data.data.contest.place}</div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-2xl">Тип соревнования</div>
          <div className="text-xl">
            {contesttypes?.find(
              (item) => item.id === data.data.contest.contest_type
            )?.name || "-"}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-2xl">Вид спорта</div>
          <div className="text-xl">
            {data.data.sport_types[data.data.contest.id.toString()]}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-2xl">Дисциплины</div>
          <div className="text-xl">
            {data.data.disciplines[data.data.contest.id.toString()].map(
              (discipline) => discipline
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-2xl">Возрастная группа</div>
          <div className="text-xl">
            {data.data.age_group[data.data.contest.id.toString()].map(
              (age) => age
            )}
          </div>
        </div>

        {data.data.contest.status === "CLOSED" ? (
          isResultLoading ? (
            <Loader />
          ) : (
            result &&
            result.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                  <div id="contest" className="text-2xl">
                    Результаты
                  </div>
                  {data.data.contest.file ? (
                    <Button
                      onClick={() => {
                        navigate(data.data.contest.file)
                      }}
                    >
                      Скачать файл
                    </Button>
                  ) : null}
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Команда</TableHead>
                      <TableHead>Очки</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell>
                          <Loader />
                        </TableCell>
                      </TableRow>
                    ) : result && result.length > 0 ? (
                      result.map((resultitem) => {
                        return (
                          <TableRow key={resultitem.id}>
                            <TableCell>{resultitem.team.name}</TableCell>
                            <TableCell>{resultitem.score}</TableCell>
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
              </div>
            )
          )
        ) : null}
      </div>
    )
}

export default ContestScreen
