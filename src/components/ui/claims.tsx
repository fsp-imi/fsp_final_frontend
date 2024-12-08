import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Badge } from "./badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import { ClaimService } from "@/services/claim/claim"
import Loader from "./loader"
import { format } from "date-fns"
import { Link } from "react-router-dom"

const Claims = () => {
  const queryClient = useQueryClient()

  const { data, isLoading: isClaimsLoading } = useQuery({
    queryKey: ["claims"],
    queryFn: ClaimService.getAll,
  })

  const { mutate: changeStatus, isPending: isChangeStatusLoading } =
    useMutation({
      mutationKey: ["change status"],
      mutationFn: ClaimService.change,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["claims"] })
        // navigate("/lk")
      },
    })

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Название</TableHead>
          <TableHead>Сроки проведения</TableHead>
          <TableHead>Формат</TableHead>
          <TableHead>Место проведения</TableHead>
          <TableHead>Вид спорта, дисциплины</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isClaimsLoading || isChangeStatusLoading ? (
          <TableRow>
            <TableCell>
              <Loader />
            </TableCell>
          </TableRow>
        ) : data && data.length > 0 ? (
          data.map((claim) => (
            <TableRow key={claim.id}>
              <TableCell>{claim.name}</TableCell>
              <TableCell>
                {format(claim.start_time, "dd.MM.yyyy")}-
                {claim.end_time && format(claim.end_time, "dd.MM.yyyy")}
              </TableCell>
              <TableCell>{claim.format}</TableCell>
              <TableCell>{claim.place}</TableCell>
              <TableCell>
                {claim.contest_discipline.map((discipline) => discipline)}
              </TableCell>
              <TableCell>{claim.status}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {claim.status === "ACCEPTED" && (
                    <Link className="w-full" to={`/result-upload/${claim.id}`}>
                      <Badge className="w-full bg-green-700">
                        Загрузить результаты
                      </Badge>
                    </Link>
                  )}
                  {claim.status === "ONPROGRESS" && (
                    <Link className="w-full" to={`/claim/${claim.id}`}>
                      <Badge
                        onClick={async () => {
                          await changeStatus({
                            status: "ONPROGRESS",
                            id: claim.id,
                          })
                        }}
                        className="w-full bg-green-700"
                      >
                        Посмотреть
                      </Badge>
                    </Link>
                  )}
                  {claim.status === "NEW" && (
                    <Badge
                      onClick={async () => {
                        await changeStatus({
                          status: "ONPROGRESS",
                          id: claim.id,
                        })
                      }}
                      className="bg-green-700"
                    >
                      Отправить
                    </Badge>
                  )}

                  {claim.status === "NEW" ||
                    (claim.status === "MODERATE" && (
                      <Link className="w-full" to={`/claim/${claim.id}`}>
                        <Badge
                          onClick={async () => {
                            await changeStatus({
                              status: "ONPROGRESS",
                              id: claim.id,
                            })
                          }}
                          className="w-full bg-green-700"
                        >
                          Редактировать
                        </Badge>
                      </Link>
                    ))}
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <div className="">Заявок нет</div>
        )}
      </TableBody>
    </Table>
  )
}

export default Claims
