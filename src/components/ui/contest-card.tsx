import { IContest } from "@/interfaces/contest"
import { FC } from "react"
import { Badge } from "./badge"
import { format } from "date-fns"
import { Link } from "react-router-dom"

interface IContestCardProps {
  contest: IContest
  agegroups: string[]
  disciplines: string[]
  contest_type?: string
}

const ContestCard: FC<IContestCardProps> = ({
  contest,
  agegroups,
  disciplines,
  contest_type,
}) => {
  return (
    <Link
      to={`/contest/${contest.id}`}
      className="w-full bg-gray100 rounded-lg p-3 flex flex-col gap-4"
    >
      <div className="flex flex-row w-full justify-between flex-wrap">
        <div className="">{agegroups.join(", ")}</div>
        <div className="">
          {format(contest.start_time, "dd.MM.yyyy")}
          {contest.end_time && "-" + format(contest.end_time, "dd.MM.yyyy")}
        </div>
      </div>

      <div className="">{contest.place}</div>

      <div className="">{contest.name}</div>

      <div className="">
        {disciplines.join(", ")}
        {/* {disciplines.map((discipline, index) => (
          <span key={index}>{discipline} </span>
        ))} */}
      </div>

      <div className="flex flex-row flex-wrap gap-1">
        <Badge>
          {contest.status === "ACTIVE"
            ? "Активный"
            : contest.status === "CLOSED"
            ? "Закрыт"
            : "Отменен"}
        </Badge>
        {contest_type ? <Badge>{contest_type}</Badge> : null}
      </div>
    </Link>
  )
}

export default ContestCard
