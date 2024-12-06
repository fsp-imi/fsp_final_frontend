import { IFilter } from "@/interfaces/filter"
import SportTypeFilter from "./sport-type"
import DisciplineFilter from "./discipline"
import ProgramFilter from "./program"
import ContestmentsFilter from "./contestments"
import GenderGroupFilter from "./gender-group"
import AgeGroupFilter from "./age-group"
import DateRangeFilter from "./date-range"
import ContestTypeFilter from "./contest-type"
import { useContext, useState } from "react"
import { FiltersContext } from "@/providers/filters"
import { Badge } from "../badge"
import { convertDate } from "@/utils/format-date"
import FilterItem from "../filter-item"

const allFilters: IFilter[] = [
  { id: 0, label: "Вид спорта", isOpen: false, children: <SportTypeFilter /> },
  { id: 1, label: "Дисциплина", isOpen: false, children: <DisciplineFilter /> },
  { id: 2, label: "Программа", isOpen: false, children: <ProgramFilter /> },
  {
    id: 3,
    label: "Количество участников",
    isOpen: false,
    children: <ContestmentsFilter />,
  },
  { id: 4, label: "Пол", isOpen: false, children: <GenderGroupFilter /> },
  {
    id: 5,
    label: "Возрастная группа",
    isOpen: false,
    children: <AgeGroupFilter />,
  },
  {
    id: 6,
    label: "Сроки проведения",
    isOpen: false,
    children: <DateRangeFilter />,
  },
  {
    id: 7,
    label: "Тип соревнования",
    isOpen: false,
    children: <ContestTypeFilter />,
  },
  // {
  //   id: 8,
  //   label: "Место проведения",
  //   isOpen: false,
  //   children: <PlaceFilter />,
  // },
]

const Filters = () => {
  const [filters, setFilters] = useState<IFilter[]>(allFilters)

  const {
    sporttypes,
    disciplines,
    contesttypes,
    activeSportTypes,
    activeDisciplines,
    activeContestTypes,
    handleFilterChange,
    handleGenderClear,
    handleClearFilter,
    dateend,
    datestart,
    male,
    female,
    mincontestant,
    maxcontestant,
  } = useContext(FiltersContext)

  return (
    <div className="flex flex-col gap-2">
      {/* Облако включенных фильтров */}
      <div className="flex flex-row gap-2 flex-wrap">
        {activeSportTypes.length > 0 && (
          <Badge onClick={() => handleFilterChange("sporttype", "")}>
            {"Вид спорта: " +
              sporttypes
                .map((item, index) => {
                  if (activeSportTypes.includes(item.id.toString()))
                    if (index === activeSportTypes.length - 1) return item.name
                    else return item.name + " "
                })
                .join("")}
          </Badge>
        )}
        {activeDisciplines.length > 0 && activeSportTypes && (
          <Badge onClick={() => handleFilterChange("discipline", "")}>
            {"Дисциплина: " +
              disciplines
                .map((item, index) => {
                  if (activeDisciplines.includes(item.id.toString()))
                    if (index === activeDisciplines.length - 1) return item.name
                    else return item.name + " "
                })
                .join("")}
          </Badge>
        )}
        {datestart && (
          <Badge onClick={() => handleFilterChange("datestart", "")}>
            {"Дата начала: " + convertDate(datestart)}
          </Badge>
        )}
        {dateend && (
          <Badge onClick={() => handleFilterChange("dateend", "")}>
            {"Дата конца: " + convertDate(dateend)}
          </Badge>
        )}
        {(male || female) && (
          <Badge
            onClick={() => {
              handleGenderClear()
            }}
          >
            {"Пол: " + [male, female].join(" ")}
          </Badge>
        )}
        {activeContestTypes.length > 0 && (
          <Badge
            onClick={() => {
              handleClearFilter("contesttype")
            }}
          >
            {"Тип соревнования: " +
              contesttypes
                .map((item) =>
                  activeContestTypes.includes(item.id.toString())
                    ? item.name
                    : null
                )
                .join(" ")}
          </Badge>
        )}
        {mincontestant && (
          <Badge
            onClick={() => {
              handleClearFilter("mincontestant")
            }}
          >
            {"Минимальное количество участников: " + mincontestant}
          </Badge>
        )}
        {maxcontestant && (
          <Badge
            onClick={() => {
              handleClearFilter("maxcontestant")
            }}
          >
            {"Максимальное количество участников: " + maxcontestant}
          </Badge>
        )}
        <Badge>Удалить все</Badge>
        <Badge>Сохранить</Badge>
      </div>

      {/* Фильтры */}
      <div className="flex flex-row gap-2 flex-wrap">
        {/* Фильтры */}
        {filters.map((filter) => (
          <div key={filter.id} className="relative">
            <FilterItem
              setIsOpen={(isOpen: boolean) =>
                setFilters((prev) =>
                  prev.map((item) =>
                    item.id === filter.id
                      ? { ...item, isOpen: isOpen }
                      : { ...item, isOpen: false }
                  )
                )
              }
              filter={filter}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filters
