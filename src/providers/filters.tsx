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
import { IAgeGroup } from "@/interfaces/age-group"
import { AgeGroupService } from "@/services/contest/age-group.service"

interface IFiltersContext {
  contests: IGetAllContests | undefined
  sporttypes: ISportType[]
  agegroups: IAgeGroup[]
  disciplines: IDiscipline[]
  contesttypes: IContestType[]
  regions: IRegion[]
  cities: ICity[]
  districts: IDistrict[]
  toggleFilter: (filterName: string, value: string) => void
  handleFilterChange: (name: string, value: string) => void
  handleDateRangeFilters: (date: IDatePicker) => void
  handleClearFilter: (name: string) => void
  isActive: (filterName: string, value: string) => boolean
  setCurPage: (value: string) => void
  clearAllFilters: () => void
  hasActiveFilters: () => boolean
  activeSportTypes: string[]
  activeDisciplines: string[]
  activeContestTypes: string[]
  activeAgeGroups: string[]
  dateend: string
  datestart: string
  mincontestant: string
  maxcontestant: string
  isSportTypesLoading: boolean
  isDisciplinesLoading: boolean
  isContestTypesLoading: boolean
  isRegionsLoading: boolean
  isCitiesLoading: boolean
  isDistrictsLoading: boolean
  isContestsLoading: boolean
  isAgeGroupsLoading: boolean
  cur_page: string
}

export const FiltersContext = createContext<IFiltersContext>({
  contests: undefined,
  sporttypes: [],
  disciplines: [],
  contesttypes: [],
  agegroups: [],
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
  isAgeGroupsLoading: true,
  toggleFilter: () => {},
  handleFilterChange: () => {},
  handleDateRangeFilters: () => {},
  handleClearFilter: () => {},
  setCurPage: () => {},
  isActive: () => false,
  clearAllFilters: () => {},
  hasActiveFilters: () => false,
  activeSportTypes: [],
  activeDisciplines: [],
  activeContestTypes: [],
  activeAgeGroups: [],
  dateend: "",
  datestart: "",
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
  const activeAgeGroups = searchParams.getAll("agegroup")
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

  const { data: agegroups, isLoading: isAgeGroupsLoading } = useQuery({
    queryKey: ["age groups"],
    queryFn: AgeGroupService.getAll,
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
      params.set("datestart", formatDate(date.from, true))
      params.set("dateend", formatDate(date.to, true))
    } else {
      params.delete("datestart")
      params.delete("dateend")
    }

    setSearchParams(params)
  }

  const setCurPage = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set("page", value)
    params.set("per_page", "10")

    setSearchParams(params)
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams()
    setSearchParams(params)
  }

  const hasActiveFilters = () => {
    for (const [key, value] of searchParams.entries()) {
      if (key !== "page" && key !== "per_page" && value) {
        return true
      }
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
        agegroups: agegroups || [],
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
        isAgeGroupsLoading,
        toggleFilter,
        handleFilterChange,
        handleDateRangeFilters,
        handleClearFilter,
        isActive,
        clearAllFilters,
        hasActiveFilters,
        activeSportTypes,
        activeDisciplines,
        activeContestTypes,
        activeAgeGroups,
        dateend,
        datestart,
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
