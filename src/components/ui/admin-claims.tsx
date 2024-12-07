import { Badge } from "./badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"

const AdminClaims = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Название</TableHead>
          <TableHead>Сроки проведения</TableHead>
          <TableHead>Формат</TableHead>
          <TableHead>Место проведения</TableHead>
          <TableHead>Вид спорта, дисциплина</TableHead>
          <TableHead>Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Шахмат</TableCell>
          <TableCell>11.11.2025</TableCell>
          <TableCell>Онлайн</TableCell>
          <TableCell>Чечня</TableCell>
          <TableCell>Шахматы, рапид</TableCell>
          <TableCell>
            <div className="flex flex-col gap-1">
              <Badge className="w-[120px] bg-green-600">Принять</Badge>
              <Badge className="w-[120px] bg-red-600">Отклонить</Badge>
              <Badge className="w-[120px] bg-yellow-400">На доработку</Badge>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Шахмат</TableCell>
          <TableCell>11.11.2025</TableCell>
          <TableCell>Онлайн</TableCell>
          <TableCell>Чечня</TableCell>
          <TableCell>Шахматы, рапид</TableCell>
          <TableCell>
            <div className="flex flex-col gap-1">
              <Badge className="w-[120px] bg-green-600">Принять</Badge>
              <Badge className="w-[120px] bg-red-600">Отклонить</Badge>
              <Badge className="w-[120px] bg-yellow-400">На доработку</Badge>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Шахмат</TableCell>
          <TableCell>11.11.2025</TableCell>
          <TableCell>Онлайн</TableCell>
          <TableCell>Чечня</TableCell>
          <TableCell>Шахматы, рапид</TableCell>
          <TableCell>
            <div className="flex flex-col gap-1">
              <Badge className="w-[120px] bg-green-600">Принять</Badge>
              <Badge className="w-[120px] bg-red-600">Отклонить</Badge>
              <Badge className="w-[120px] bg-yellow-400">На доработку</Badge>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Шахмат</TableCell>
          <TableCell>11.11.2025</TableCell>
          <TableCell>Онлайн</TableCell>
          <TableCell>Чечня</TableCell>
          <TableCell>Шахматы, рапид</TableCell>
          <TableCell>
            <div className="flex flex-col gap-1">
              <Badge className="w-[120px] bg-green-400">Принять</Badge>
              <Badge className="w-[120px] bg-red-400">Отклонить</Badge>
              <Badge className="w-[120px] bg-yellow-400">На доработку</Badge>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default AdminClaims
