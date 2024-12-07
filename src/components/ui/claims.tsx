import { Badge } from "./badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

const Claims = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Название</TableHead>
          <TableHead>Сроки проведения</TableHead>
          <TableHead>Формат</TableHead>
          <TableHead>Статус</TableHead>
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
          <TableCell>Ждет отправки</TableCell>
          <TableCell>Чечня</TableCell>
          <TableCell>Шахматы, рапид</TableCell>
          <TableCell>
            <div className="flex flex-col gap-1">
              <Badge className="w-[120px] bg-yellow-400">Редактировать</Badge>
              <Badge className="w-[120px] bg-green-400">Отправить</Badge>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Шахмат</TableCell>
          <TableCell>11.11.2025</TableCell>
          <TableCell>Онлайн</TableCell>
          <TableCell>Ждет отправки</TableCell>
          <TableCell>Чечня</TableCell>
          <TableCell>Шахматы, рапид</TableCell>
          <TableCell>
            <div className="flex flex-col gap-1">
              <Badge className="w-[120px] bg-yellow-400">Редактировать</Badge>
              <Badge className="w-[120px] bg-green-400">Отправить</Badge>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Шахмат</TableCell>
          <TableCell>11.11.2025</TableCell>
          <TableCell>Онлайн</TableCell>
          <TableCell>Ждет отправки</TableCell>
          <TableCell>Чечня</TableCell>
          <TableCell>Шахматы, рапид</TableCell>
          <TableCell>
            <div className="flex flex-col gap-1">
              <Badge className="w-[120px] bg-yellow-400">Редактировать</Badge>
              <Badge className="w-[120px] bg-green-400">Отправить</Badge>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Шахмат</TableCell>
          <TableCell>11.11.2025</TableCell>
          <TableCell>Онлайн</TableCell>
          <TableCell>Ждет отправки</TableCell>
          <TableCell>Чечня</TableCell>
          <TableCell>Шахматы, рапид</TableCell>
          <TableCell>
            <div className="flex flex-col gap-1">
              <Badge className="w-[120px] bg-yellow-400">Редактировать</Badge>
              <Badge className="w-[120px] bg-green-400">Отправить</Badge>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Шахмат</TableCell>
          <TableCell>11.11.2025</TableCell>
          <TableCell>Онлайн</TableCell>
          <TableCell>Ждет отправки</TableCell>
          <TableCell>Чечня</TableCell>
          <TableCell>Шахматы, рапид</TableCell>
          <TableCell>
            <div className="flex flex-col gap-1">
              <Badge className="w-[120px] bg-yellow-400">Редактировать</Badge>
              <Badge className="w-[120px] bg-green-400">Отправить</Badge>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Шахмат</TableCell>
          <TableCell>11.11.2025</TableCell>
          <TableCell>Онлайн</TableCell>
          <TableCell>Ждет отправки</TableCell>
          <TableCell>Чечня</TableCell>
          <TableCell>Шахматы, рапид</TableCell>
          <TableCell>
            <div className="flex flex-col gap-1">
              <Badge className="w-[120px] bg-yellow-400">Редактировать</Badge>
              <Badge className="w-[120px] bg-green-400">Отправить</Badge>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Шахмат</TableCell>
          <TableCell>11.11.2025</TableCell>
          <TableCell>Онлайн</TableCell>
          <TableCell>Ждет отправки</TableCell>
          <TableCell>Чечня</TableCell>
          <TableCell>Шахматы, рапид</TableCell>
          <TableCell>
            <div className="flex flex-col gap-1">
              <Badge className="w-[120px] bg-yellow-400">Редактировать</Badge>
              <Badge className="w-[120px] bg-green-400">Отправить</Badge>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Шахмат</TableCell>
          <TableCell>11.11.2025</TableCell>
          <TableCell>Онлайн</TableCell>
          <TableCell>Ждет отправки</TableCell>
          <TableCell>Чечня</TableCell>
          <TableCell>Шахматы, рапид</TableCell>
          <TableCell>
            <div className="flex flex-col gap-1">
              <Badge className="w-[120px] bg-yellow-400">Редактировать</Badge>
              <Badge className="w-[120px] bg-green-400">Отправить</Badge>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default Claims
