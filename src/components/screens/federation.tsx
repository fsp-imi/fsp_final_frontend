import Loader from "../ui/loader"

import { FederationService } from "@/services/federation/federation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { UserService } from "@/services/user/user"
import FederationForm from "../ui/forms/federation"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useState } from "react"
import { Button } from "../ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { cn } from "@/lib/utils"

const FederationScreen = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")

  const queryClient = useQueryClient()

  const { id } = useParams()

  const { data: federation, isLoading } = useQuery({
    queryKey: ["get federation"],
    queryFn: async () => id && (await FederationService.get(id)),
    enabled: !!id,
  })

  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ["get users"],
    queryFn: UserService.getAll,
  })

  const { mutate, isPending: isUserChangePendging } = useMutation({
    mutationKey: ["change federation"],
    mutationFn: FederationService.changeProfile,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["get federation"],
      }),
  })

  const { data: agent, isLoading: isAgentLoading } = useQuery({
    queryKey: ["get agent"],
    queryFn: async () => {
      return federation && federation.agent
        ? await UserService.getUser(federation.agent)
        : null
    },
    enabled: !!federation,
  })

  if (isLoading || isAgentLoading || isUserChangePendging) return <Loader />

  if (federation)
    return (
      <div className="w-full flex flex-col gap-6 bg-white px-8 py-8 rounded-3xl">
        <div className="text-3xl font-medium">Федерация {federation.name}</div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-min justify-between"
            >
              {value
                ? users &&
                  users.find(
                    (user) =>
                      user.username +
                        " " +
                        user.first_name +
                        " " +
                        user.last_name ===
                      value
                  )?.username +
                    " " +
                    users.find(
                      (user) =>
                        user.username +
                          " " +
                          user.first_name +
                          " " +
                          user.last_name ===
                        value
                    )?.first_name +
                    " " +
                    users.find(
                      (user) =>
                        user.username +
                          " " +
                          user.first_name +
                          " " +
                          user.last_name ===
                        value
                    )?.last_name
                : agent
                ? agent?.username +
                  " " +
                  agent?.first_name +
                  " " +
                  agent?.last_name
                : "Выберите представитель"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className=" p-0">
            {isUsersLoading ? (
              <Loader />
            ) : (
              <Command>
                <CommandInput placeholder="Поиск пользователя..." />
                <CommandList>
                  <CommandEmpty>Пользователей нет.</CommandEmpty>
                  <CommandGroup>
                    {users &&
                      users.map((user) => (
                        <CommandItem
                          key={user.id}
                          value={
                            user.username +
                            " " +
                            user.first_name +
                            " " +
                            user.last_name
                          }
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue)
                            mutate({
                              id: federation.id,
                              name: federation.name,
                              agent: Number(user.id),
                            })
                            setOpen(false)
                          }}
                        >
                          {user.username +
                            ": " +
                            user.first_name +
                            " " +
                            user.last_name}
                          <Check
                            className={cn(
                              "ml-auto",
                              value ===
                                user.username +
                                  " " +
                                  user.first_name +
                                  " " +
                                  user.last_name
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            )}
          </PopoverContent>
        </Popover>

        {federation.agent && agent && (
          <div className="flex flex-col gap-1.5">
            <div className="text-2xl">Представитель</div>
            <div className="">Имя: {agent.first_name}</div>
            <div className="">Фамилия: {agent.last_name}</div>
            <div className="">Электронная почта: {agent.email}</div>
          </div>
        )}

        <FederationForm federation={federation} />
      </div>
    )
}

export default FederationScreen
