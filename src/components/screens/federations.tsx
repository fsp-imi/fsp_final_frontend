import { FederationService } from "@/services/federation/federation"
import { useQuery } from "@tanstack/react-query"
import Loader from "../ui/loader"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { useNavigate } from "react-router-dom"

const FederationsScreen = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get all federations"],
    queryFn: FederationService.getAll,
  })

  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-3xl px-10 py-8 w-full flex flex-col gap-8">
      <div className="text-3xl font-medium">Федерации</div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Почта</TableHead>
            <TableHead>Номер телефона</TableHead>
            <TableHead>Адрес</TableHead>
            {/* <TableHead>Время работы</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell>
                <Loader />
              </TableCell>
            </TableRow>
          ) : data && data.length > 0 ? (
            data.map((federation) => {
              return (
                <TableRow
                  className="cursor-pointer"
                  onClick={() => navigate(`/federations/${federation.id}`)}
                  key={federation.id}
                >
                  <TableCell>{federation.name || "-"} </TableCell>
                  <TableCell>{federation.email || "-"}</TableCell>
                  <TableCell>{federation.phone || "-"}</TableCell>
                  <TableCell>{federation.address || "-"}</TableCell>
                  {/* <TableCell>{federation.workTime || "-"}</TableCell> */}
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
}

export default FederationsScreen
