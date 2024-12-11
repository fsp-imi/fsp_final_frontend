import SportTypeFilter from "./sport-type"
import DisciplineFilter from "./discipline"
import ContestmentsFilter from "./contestments"
import AgeGroupFilter from "./age-group"
import DateRangeFilter from "./date-range"
import ContestTypeFilter from "./contest-type"
import FilterItem from "../filter-item"

import { IFilter } from "@/interfaces/filter"
import { useContext } from "react"
import { FiltersContext } from "@/providers/filters"
import { Badge } from "../badge"
import { convertDate } from "@/utils/format-date"

const allFilters: IFilter[] = [
  { id: 0, label: "Вид спорта", isOpen: false, children: <SportTypeFilter /> },
  { id: 1, label: "Дисциплина", isOpen: false, children: <DisciplineFilter /> },
  {
    id: 3,
    label: "Количество участников",
    isOpen: false,
    children: <ContestmentsFilter />,
  },
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
  const {
    sporttypes,
    disciplines,
    contesttypes,
    activeSportTypes,
    activeDisciplines,
    activeContestTypes,
    handleFilterChange,
    handleClearFilter,
    clearAllFilters,
    hasActiveFilters,
    dateend,
    datestart,
    agegroups,
    activeAgeGroups,
    mincontestant,
    maxcontestant,
  } = useContext(FiltersContext)

  return (
    <div className="w-full flex flex-col gap-2">
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
        {activeAgeGroups.length > 0 && (
          <Badge
            onClick={() => {
              handleClearFilter("agegroup")
            }}
          >
            {agegroups.map((agegroup) => {
              if (activeAgeGroups.includes(agegroup.id.toString()))
                return `${agegroup.gender === 1 ? "Мужчины" : "Женщины"} от ${
                  agegroup.start
                } лет ${agegroup.end ? `до ${agegroup.end} лет ` : ""}`
            })}
          </Badge>
        )}
        {maxcontestant && (
          <Badge
            onClick={() => {
              handleClearFilter("ageend")
            }}
          >
            {"Максимальное количество участников: " + maxcontestant}
          </Badge>
        )}
        {hasActiveFilters() ? (
          <Badge
            onClick={() => {
              clearAllFilters()
            }}
          >
            Удалить все
          </Badge>
        ) : null}
      </div>

      {/* Фильтры */}
      <div className="flex flex-row gap-2 flex-wrap">
        {/* Фильтры */}
        {allFilters.map((filter) => (
          <FilterItem key={filter.id} filter={filter} />
        ))}
      </div>
    </div>
  )
}

export default Filters
