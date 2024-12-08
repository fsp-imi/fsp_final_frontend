import Loader from "../ui/loader"

import { useForm, useWatch } from "react-hook-form"
import { Card } from "../ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { claimSchema } from "@/schemes/claim"
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "../ui/calendar"
import { PopoverClose } from "@radix-ui/react-popover"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ClaimService } from "@/services/claim/claim"
import { SportTypeService } from "@/services/contest/sport-type.service"
import { ContestTypeService } from "@/services/contest/contest-type.service"
import { Checkbox } from "../ui/checkbox"
import { DisciplineService } from "@/services/contest/discipline.service"
import { AgeGroupService } from "@/services/contest/age-group.service"
import { useNavigate } from "react-router-dom"

const CreateClaim = () => {
  const form = useForm<z.infer<typeof claimSchema>>({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      name: "",
      start_time: undefined,
      end_time: undefined,
      place: "",
      format: undefined,
      contest_type: undefined,
      sporttype: [],
      contest_discipline: [],
      contest_age_group: [],
    },
  })

  const navigate = useNavigate()

  const sporttype = useWatch({ control: form.control, name: "sporttype" })

  const { data: sporttypes, isLoading: isSportTypesLoading } = useQuery({
    queryKey: ["sporttypes"],
    queryFn: SportTypeService.getAll,
  })

  const { data: disciplines, isLoading: isDisciplinesLoading } = useQuery({
    queryKey: ["disciplines", sporttype],
    queryFn: () => DisciplineService.getBySportTypes(sporttype),
  })

  const { data: contesttypes, isLoading: isContestTypesLoading } = useQuery({
    queryKey: ["contesttypes"],
    queryFn: ContestTypeService.getAll,
  })

  const { data: agegroups, isLoading: isAgeGroupsLoading } = useQuery({
    queryKey: ["age groups"],
    queryFn: AgeGroupService.getAll,
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ["create claim"],
    mutationFn: ClaimService.create,
    onSuccess: () => navigate("/lk"),
  })

  const onSubmit = (values: z.infer<typeof claimSchema>) => {
    mutate({
      sender_federation: 1,
      ...values,
    })
  }

  return (
    <div className="w-full px-10 py-8 bg-white rounded-3xl flex flex-col gap-8">
      <div className="text-3xl font-semibold">Создание заявки</div>

      {isPending ? (
        <Loader />
      ) : (
        <Card className="py-8 px-10 rounded-3xl flex flex-col w-auto bg-white gap-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-auto h-auto flex flex-col gap-6"
            >
              {/* Название */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название</FormLabel>
                    <FormControl>
                      <Input placeholder="Чемпионат по шахматам" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Сроки проведения */}
              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Время начала</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-min",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd-MM-yyyy")
                            ) : (
                              <span>Выберите время начала</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={field.onChange}
                        />
                        <PopoverClose className="w-full px-4 pb-4">
                          Выбрать
                        </PopoverClose>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_time"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Время окончания</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-min",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd-MM-yyyy")
                            ) : (
                              <span>Выберите время окончания</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={field.onChange}
                        />
                        <PopoverClose className="w-full px-4 pb-4">
                          Выбрать
                        </PopoverClose>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Место проведения */}
              <FormField
                control={form.control}
                name="place"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Место проведения</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Москва ул. Земляной Вал д. 33"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Формат */}
              <FormField
                control={form.control}
                name="format"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Формат проведения</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Выберите формат проведения соревнования" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="OFFLINE">Офлайн</SelectItem>
                          <SelectItem value="ONLINE">Онлайн</SelectItem>
                          <SelectItem value="ONLINE/OFFLINE">
                            Смешанно
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Уровень */}
              <FormField
                control={form.control}
                name="contest_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Уровень соревнования</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value ? field.value.toString() : ""}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Выберите уровень соревнования" />
                        </SelectTrigger>
                        <SelectContent>
                          {isContestTypesLoading ? (
                            <Loader />
                          ) : (
                            contesttypes &&
                            contesttypes.map((contesttype) => (
                              <SelectItem
                                key={contesttype.id}
                                value={contesttype.id.toString()}
                              >
                                {contesttype.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Характер соревнования */}
              <FormField
                control={form.control}
                name="contest_char"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Характер соревнования</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value ? field.value : ""}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Выберите характер соревнования" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"Личная"}>Личная</SelectItem>
                          <SelectItem value={"Командная"}>Командная</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Виды спорта */}
              <FormField
                control={form.control}
                name="sporttype"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Виды спорта</FormLabel>
                    <br />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button>
                          {field.value.length > 0
                            ? field.value.map(
                                (value) =>
                                  sporttypes?.find((item) => item.id === value)
                                    ?.name + " "
                              )
                            : "Выбрать вид спорта"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="flex flex-col gap-1.5"
                        align="start"
                      >
                        {isSportTypesLoading ? (
                          <Loader />
                        ) : (
                          sporttypes &&
                          sporttypes.map((sporttype) => (
                            <FormField
                              key={sporttype.id}
                              control={form.control}
                              name="sporttype"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={sporttype.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value.includes(
                                          sporttype.id
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                sporttype.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== sporttype.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {sporttype.name}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))
                        )}
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Дисциплина */}
              <FormField
                control={form.control}
                name="contest_discipline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дисциплины</FormLabel>
                    <br />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button>
                          {field.value.length > 0
                            ? field.value.map(
                                (value) =>
                                  disciplines?.find((item) => item.id === value)
                                    ?.name + " "
                              )
                            : "Выбрать дисциплины"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="flex flex-col gap-1.5"
                        align="start"
                      >
                        {isDisciplinesLoading ? (
                          <Loader />
                        ) : disciplines && disciplines.length > 0 ? (
                          disciplines.map((discipline) => (
                            <FormField
                              key={discipline.id}
                              control={form.control}
                              name="contest_discipline"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={discipline.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <div className="flex flex-row space-x-3 items-center">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value.includes(
                                            discipline.id
                                          )}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  discipline.id,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) =>
                                                      value !== discipline.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {discipline.name}
                                      </FormLabel>
                                    </div>
                                  </FormItem>
                                )
                              }}
                            />
                          ))
                        ) : (
                          <div className="">Дисциплин нет, выберите спорт</div>
                        )}
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Возрастная группа */}
              <FormField
                control={form.control}
                name="contest_age_group"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Возрастная группа</FormLabel>
                    <br />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button>
                          {field.value.length > 0
                            ? field.value.map((value) => {
                                let agegroup = agegroups?.find(
                                  (item) => item.id === value
                                )

                                if (agegroup)
                                  return `${
                                    !agegroup.gender ? "женщины" : "мужчины"
                                  } от ${agegroup.start} лет ${
                                    agegroup.end
                                      ? "до " + agegroup.end + " лет"
                                      : ""
                                  }`
                              })
                            : "Выбрать возрастные группы"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="flex flex-col gap-1.5"
                        align="start"
                      >
                        {isAgeGroupsLoading ? (
                          <Loader />
                        ) : agegroups && agegroups.length > 0 ? (
                          agegroups.map((agegroup) => (
                            <FormField
                              key={agegroup.id}
                              control={form.control}
                              name="contest_age_group"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={agegroup.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value.includes(
                                          agegroup.id
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                agegroup.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== agegroup.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {!agegroup.gender ? "женщины" : "мужчины"}{" "}
                                      {`от ${agegroup.start}`} лет{" "}
                                      {agegroup.end && `до ${agegroup.end} лет`}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))
                        ) : (
                          <div className="">Дисциплин нет, выберите спорт</div>
                        )}
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Создать</Button>
            </form>
          </Form>
        </Card>
      )}
    </div>
  )
}

export default CreateClaim
