import { claimSchema } from "@/schemes/claim"
import { ClaimService } from "@/services/claim/claim"
import { AgeGroupService } from "@/services/contest/age-group.service"
import { ContestTypeService } from "@/services/contest/contest-type.service"
import { DisciplineService } from "@/services/contest/discipline.service"
import { SportTypeService } from "@/services/contest/sport-type.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm, useWatch } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { z } from "zod"
import Loader from "../ui/loader"
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { PopoverClose } from "@radix-ui/react-popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import { useEffect } from "react"
import { useUserStore } from "@/store/user"

const ClaimScreen = () => {
  const { id } = useParams()

  const { user } = useUserStore()

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

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const sporttypevalue = useWatch({ control: form.control, name: "sporttype" })

  const { data: claim, isLoading: isClaimLoading } = useQuery({
    queryKey: ["get claim"],
    queryFn: async () => id && (await ClaimService.get(id)),
    enabled: !!id,
  })

  const { data: sporttypes, isLoading: isSportTypesLoading } = useQuery({
    queryKey: ["sporttypes"],
    queryFn: SportTypeService.getAll,
  })

  const { data: disciplines, isLoading: isDisciplinesLoading } = useQuery({
    queryKey: ["disciplines", sporttypevalue],
    queryFn: () => DisciplineService.getBySportTypes(sporttypevalue),
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
    mutationKey: ["change claim"],
    mutationFn: ClaimService.change,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["get claim"],
      }),
  })

  const { mutate: changeStatus, isPending: isChangeStatusLoading } =
    useMutation({
      mutationKey: ["change status"],
      mutationFn: ClaimService.change,
      onSuccess: () => {
        navigate("/lk")
      },
    })

  const onSubmit = (values: z.infer<typeof claimSchema>) => {
    if (claim) mutate({ id: claim.id, ...values })
  }

  useEffect(() => {
    if (claim && sporttypes) {
      const sporttypesbydisciplines = [
        ...new Set(
          claim.contest_discipline.map((discipline) => {
            const sport = sporttypes.find((item) => item.id === discipline)

            if (sport && sport.id) return sport.id
          })
        ),
      ]

      form.reset({
        ...claim,
        start_time: new Date(claim.start_time),
        end_time: new Date(claim.end_time),
        sporttype: sporttypesbydisciplines.filter((item) => item !== undefined),
      })
    }
  }, [claim, isClaimLoading])

  if (
    isClaimLoading ||
    isSportTypesLoading ||
    isContestTypesLoading ||
    isDisciplinesLoading ||
    isAgeGroupsLoading ||
    isChangeStatusLoading
  ) {
    return <Loader />
  }

  if (user && claim)
    return (
      <div className="w-full bg-white rounded-3xl px-10 py-8 flex flex-col gap-8">
        <div className="text-3xl font-semibold">Заявка</div>

        {isPending || isClaimLoading ? (
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
                  disabled={user.is_staff}
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
                  disabled={user.is_staff}
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
                            disabled={user.is_staff}
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
                  disabled={user.is_staff}
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
                            disabled={user.is_staff}
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
                  disabled={user.is_staff}
                  control={form.control}
                  name="place"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Место проведения</FormLabel>
                      <FormControl>
                        <Input
                          disabled={user.is_staff}
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
                  disabled={user.is_staff}
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Формат проведения</FormLabel>
                      <FormControl>
                        <Select
                          disabled={user.is_staff}
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

                {/* Статус */}
                {/* 
                <FormItem>
                  <FormLabel>Статус</FormLabel>
                  <FormControl>
                    <Select disabled>
                      <SelectTrigger className="">
                        <SelectValue defaultValue={claim.status} />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="OFFLINE">Офлайн</SelectItem> 
                        <SelectItem value="ONLINE">Онлайн</SelectItem>
                        <SelectItem value="ONLINE/OFFLINE">Смешанно</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem> */}

                {/* Уровень */}
                <FormField
                  disabled={user.is_staff}
                  control={form.control}
                  name="contest_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Уровень соревнования</FormLabel>
                      <FormControl>
                        <Select
                          disabled={user.is_staff}
                          onValueChange={field.onChange}
                          defaultValue={
                            field.value ? field.value.toString() : ""
                          }
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
                  disabled={user.is_staff}
                  control={form.control}
                  name="contest_char"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Характер соревнования</FormLabel>
                      <FormControl>
                        <Select
                          disabled={user.is_staff}
                          onValueChange={field.onChange}
                          defaultValue={
                            field.value ? field.value.toString() : ""
                          }
                        >
                          <SelectTrigger disabled={user.is_staff} className="">
                            <SelectValue placeholder="Выберите характер соревнования" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              disabled={user.is_staff}
                              value={"Личная"}
                            >
                              Личная
                            </SelectItem>
                            <SelectItem
                              disabled={user.is_staff}
                              value={"Командная"}
                            >
                              Командная
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Виды спорта */}
                <FormField
                  disabled={user.is_staff}
                  control={form.control}
                  name="sporttype"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Виды спорта</FormLabel>
                      <br />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button className="h-auto whitespace-pre-wrap text-left">
                            {field.value.length > 0
                              ? field.value.map(
                                  (value) =>
                                    sporttypes?.find(
                                      (item) => item.id === value
                                    )?.name + " "
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
                                          disabled={user.is_staff}
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
                  disabled={user.is_staff}
                  control={form.control}
                  name="contest_discipline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Дисциплины</FormLabel>
                      <br />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button className="h-auto whitespace-pre-wrap text-left">
                            {field.value &&
                            disciplines &&
                            sporttypevalue &&
                            field.value.length > 0
                              ? field.value.map(
                                  (value) =>
                                    disciplines.find(
                                      (item) => item.id === value
                                    )?.name + " "
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
                                            disabled={user.is_staff}
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
                            <div className="">
                              Дисциплин нет, выберите спорт
                            </div>
                          )}
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Возрастная группа */}
                <FormField
                  disabled={user.is_staff}
                  control={form.control}
                  name="contest_age_group"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Возрастная группа</FormLabel>
                      <br />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button className="h-auto whitespace-pre text-left">
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
                                          disabled={user.is_staff}
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
                                        {!agegroup.gender
                                          ? "женщины"
                                          : "мужчины"}{" "}
                                        {`от ${agegroup.start}`} лет{" "}
                                        {agegroup.end &&
                                          `до ${agegroup.end} лет`}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))
                          ) : (
                            <div className="">
                              Дисциплин нет, выберите спорт
                            </div>
                          )}
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!user.is_staff ? (
                  <div className="flex flex-row gap-2">
                    <Button
                      disabled={claim.status === "ONPROGRESS"}
                      className="w-[280px]"
                      type="submit"
                    >
                      {claim.status === "ONPROGRESS"
                        ? "На проверке"
                        : "Сохранить"}
                    </Button>
                    {claim.status !== "ONPROGRESS" &&
                      claim.status !== "ACCEPTED" && (
                        <Button
                          onClick={async () => {
                            await changeStatus({
                              status: "ONPROGRESS",
                              id: claim.id,
                            })
                          }}
                          className="bg-green-700"
                        >
                          Отправить на проверку
                        </Button>
                      )}
                  </div>
                ) : (
                  <div className="flex flex-row gap-2">
                    <Button
                      type="button"
                      onClick={async () => {
                        await changeStatus({ status: "ACCEPTED", id: claim.id })
                      }}
                      className="bg-green-700"
                    >
                      Принять
                    </Button>
                    <Button
                      type="button"
                      onClick={async () => {
                        await changeStatus({ status: "REJECTED", id: claim.id })
                      }}
                      className="bg-red-700"
                    >
                      Отклонить
                    </Button>
                    <Button
                      type="button"
                      onClick={async () => {
                        await changeStatus({ status: "MODERATE", id: claim.id })
                      }}
                      className="bg-yellow-700"
                    >
                      На доработку
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </Card>
        )}
      </div>
    )
}

export default ClaimScreen
