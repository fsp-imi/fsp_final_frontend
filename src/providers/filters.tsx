import Loader from "@/components/ui/loader"

import { ICity } from "@/interfaces/city"
import { IContestType } from "@/interfaces/contest-type"
import { IDatePicker } from "@/interfaces/date-picker"
import { IDiscipline } from "@/interfaces/discipline"
import { IDistrict } from "@/interfaces/district"
import { IRegion } from "@/interfaces/region"
import { ISportType } from "@/interfaces/sport-type"
import { ContestTypeService } from "@/services/contest/contest-type.service"
import { DisciplineService } from "@/services/contest/discipline.service"
import { SportTypeService } from "@/services/contest/sport-type.service"
import { CityService } from "@/services/country/city.service"
import { DistrictService } from "@/services/country/district.service"
import { RegionService } from "@/services/country/region.service"
import { createContext, ReactNode, useCallback } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { formatDate } from "@/utils/format-date"
import { IGetAllContests } from "@/interfaces/contest"
import { ContestService } from "@/services/contest/contest.service"

interface IFiltersContext {
  contests: IGetAllContests | undefined
  sporttypes: ISportType[]
  disciplines: IDiscipline[]
  contesttypes: IContestType[]
  regions: IRegion[]
  cities: ICity[]
  districts: IDistrict[]
  toggleFilter: (filterName: string, value: string) => void
  handleFilterChange: (name: string, value: string) => void
  handleDateRangeFilters: (date: IDatePicker) => void
  handleGenderClear: () => void
  handleClearFilter: (name: string) => void
  isActive: (filterName: string, value: string) => boolean
  setCurPage: (value: string) => void
  clearAllFilters: () => void
  hasActiveFilters: () => boolean
  handleAgeGroups: (sex: boolean, agestart?: number, ageend?: number) => void
  activeSportTypes: string[]
  activeDisciplines: string[]
  activeContestTypes: string[]
  dateend: string
  datestart: string
  agestart: string
  ageend: string
  male: string
  female: string
  mincontestant: string
  maxcontestant: string
  isSportTypesLoading: boolean
  isDisciplinesLoading: boolean
  isContestTypesLoading: boolean
  isRegionsLoading: boolean
  isCitiesLoading: boolean
  isDistrictsLoading: boolean
  isContestsLoading: Boolean
  cur_page: string
}

export const FiltersContext = createContext<IFiltersContext>({
  contests: undefined,
  sporttypes: [],
  disciplines: [],
  contesttypes: [],
  regions: [],
  districts: [],
  cities: [],
  isSportTypesLoading: true,
  isDisciplinesLoading: true,
  isContestTypesLoading: true,
  isCitiesLoading: true,
  isDistrictsLoading: true,
  isRegionsLoading: true,
  isContestsLoading: true,
  toggleFilter: () => {},
  handleGenderClear: () => {},
  handleFilterChange: () => {},
  handleDateRangeFilters: () => {},
  handleClearFilter: () => {},
  setCurPage: () => {},
  isActive: () => false,
  clearAllFilters: () => {},
  hasActiveFilters: () => false,
  handleAgeGroups: () => {},
  activeSportTypes: [],
  activeDisciplines: [],
  activeContestTypes: [],
  dateend: "",
  datestart: "",
  agestart: "",
  ageend: "",
  male: "",
  female: "",
  mincontestant: "",
  maxcontestant: "",
  cur_page: "",
})

const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { pathname } = useLocation()

  // Получение данных из searchParams
  const activeSportTypes = searchParams.getAll("sporttype")
  const activeDisciplines = searchParams.getAll("discipline")
  const activeContestTypes = searchParams.getAll("contesttype")
  const agestart = searchParams.get("agestart") || ""
  const ageend = searchParams.get("ageend") || ""
  const male = searchParams.get("male") || ""
  const female = searchParams.get("female") || ""
  const mincontestant = searchParams.get("mincontestant") || ""
  const maxcontestant = searchParams.get("maxcontestant") || ""
  const datestart = searchParams.get("datestart") || ""
  const dateend = searchParams.get("dateend") || ""
  const cur_page = searchParams.get("cur_page") || ""

  const getAllContests = useCallback(() => {
    return ContestService.getAll(searchParams.toString())
  }, [searchParams])

  const { data: contests, isLoading: isContestsLoading } = useQuery({
    queryKey: ["contests", searchParams.toString()],
    queryFn: getAllContests,
    placeholderData: keepPreviousData,
  })

  const { data: sporttypes, isLoading: isSportTypesLoading } = useQuery({
    queryKey: ["sporttypes"],
    queryFn: SportTypeService.getAll,
  })

  const { data: disciplines, isLoading: isDisciplinesLoading } = useQuery({
    queryKey: ["disciplines", activeSportTypes],
    queryFn: () => DisciplineService.getBySportTypes(activeSportTypes),
  })

  const { data: contesttypes, isLoading: isContestTypesLoading } = useQuery({
    queryKey: ["contesttypes"],
    queryFn: ContestTypeService.getAll,
  })

  const { data: regions, isLoading: isRegionsLoading } = useQuery({
    queryKey: ["regions"],
    queryFn: RegionService.getAll,
  })

  const { data: districts, isLoading: isDistrictsLoading } = useQuery({
    queryKey: ["districts"],
    queryFn: DistrictService.getAll,
  })

  const { data: cities, isLoading: isCitiesLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: CityService.getAll,
  })

  // Функции
  const isActive = (filterName: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams)

    const values = currentParams.getAll(filterName)

    return values.includes(value)
  }

  const toggleFilter = useCallback(
    (filterName: string, value: string) => {
      const currentParams = new URLSearchParams(searchParams)

      const values = currentParams.getAll(filterName)
      if (values.includes(value)) {
        const nextValues = values.filter((v) => v !== value)
        currentParams.delete(filterName)
        if (nextValues.length > 0) {
          nextValues.forEach((v) => currentParams.append(filterName, v))
        }
      } else {
        currentParams.append(filterName, value)
      }

      setSearchParams(currentParams)
      // window.history.replaceState(null, "", `?${currentParams.toString()}`)
    },
    [searchParams, pathname]
  )

  const updateSearchParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }

      return params
    },
    [searchParams, pathname]
  )

  const handleClearFilter = (name: string) => {
    const params = new URLSearchParams(searchParams)

    params.delete(name)

    setSearchParams(params)
  }

  const handleFilterChange = (name: string, value: string) => {
    const newUrl = updateSearchParam(name, value)
    setSearchParams(newUrl)
  }

  const handleDateRangeFilters = (date: IDatePicker) => {
    const params = new URLSearchParams(searchParams.toString())

    if (date.from && date.to) {
      params.set("datestart", formatDate(date.from))
      params.set("dateend", formatDate(date.to))
    } else {
      params.delete("datestart")
      params.delete("dateend")
    }

    setSearchParams(params)
  }

  const handleAgeGroups = (sex: boolean, start: number, end?: number) => {
    const params = new URLSearchParams(searchParams.toString())

    if (sex) params.set("male", "Мужской")
    if (!sex) params.set("female", "Женский")

    if (male && sex) params.delete("male")
    if (female && !sex) params.delete("female")

    if (start) params.set("agestart", start.toString())
    else params.delete("agestart")

    if (end) params.set("ageend", end.toString())
    else params.delete("ageend")

    setSearchParams(params)
  }

  const handleGenderClear = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete("male")
    params.delete("female")

    setSearchParams(params)
  }

  const setCurPage = (value: string) => {
    handleFilterChange("cur_page", value)
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams()
    setSearchParams(params)
  }

  const hasActiveFilters = () => {
    for (const value of searchParams.values()) {
      if (value) return true
    }
    return false
  }

  if (isRegionsLoading) return <Loader />

  return (
    <FiltersContext.Provider
      value={{
        contests,
        sporttypes: sporttypes || [],
        disciplines: disciplines || [],
        contesttypes: contesttypes || [],
        regions: regions || [],
        districts: districts || [],
        cities: cities || [],
        isSportTypesLoading,
        isDisciplinesLoading,
        isContestTypesLoading,
        isCitiesLoading,
        isDistrictsLoading,
        isRegionsLoading,
        isContestsLoading,
        toggleFilter,
        handleFilterChange,
        handleDateRangeFilters,
        handleGenderClear,
        handleClearFilter,
        isActive,
        clearAllFilters,
        hasActiveFilters,
        handleAgeGroups,
        activeSportTypes,
        activeDisciplines,
        activeContestTypes,
        dateend,
        datestart,
        agestart,
        ageend,
        male,
        female,
        mincontestant,
        maxcontestant,
        setCurPage,
        cur_page,
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

export default FiltersProvider
