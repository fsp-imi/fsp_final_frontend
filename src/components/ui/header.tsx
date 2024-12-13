import Loader from "./loader"
import Logo from "./logo"

import { Avatar } from "@/components/ui//avatar"
import { Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { FlagIcon, LogOut, MenuIcon, User, UserRoundPen } from "lucide-react"
import { useUserStore } from "@/store/user"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./navigation-menu"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./sheet"
import { Button } from "./button"

const Header = () => {
  const { user, isLoading, logout } = useUserStore()

  return (
    <div className="w-full h-16 px-8 py-3 border-b-[1px] border-gray rounded-b-3xl flex flex-row justify-between items-center bg-white">
      {/* Логотип */}
      <Logo />

      {/* Мобильное меню */}
      <Sheet>
        <SheetTrigger asChild className="sm:hidden">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent>
          {/* Пункты меню */}
          <div className="flex flex-col gap-2">
            <SheetClose asChild>
              <Link to="/">Главная</Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to="/analytics">Аналитика по среднему баллу</Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to="/analytics/team">Аналитика по командам</Link>
            </SheetClose>
            {isLoading ? (
              <Loader />
            ) : user ? (
              <>
                {user.is_staff ? (
                  <SheetClose asChild>
                    <Link to="/federations">Федерации</Link>
                  </SheetClose>
                ) : null}
                <SheetClose asChild>
                  <Link to="/lk" className="">
                    Личный кабинет
                    {user.is_staff}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/profile" className="">
                    Профиль
                  </Link>
                </SheetClose>
                {!user.is_staff ? (
                  <SheetClose asChild>
                    <Link to="/profile/federation" className="">
                      Профиль федерации
                    </Link>
                  </SheetClose>
                ) : null}
                <SheetClose asChild>
                  <div onClick={() => logout()} className="cursor-pointer">
                    Выйти
                  </div>
                </SheetClose>
              </>
            ) : (
              <Link to="/login">
                <Button>Войти</Button>
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Пункты меню с аватаром */}
      <div className="w-full hidden sm:flex flex-row justify-end gap-6">
        {/* Пункты меню */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className={navigationMenuTriggerStyle()}>
                Главная
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/analytics" className={navigationMenuTriggerStyle()}>
                Аналитика по среднему баллу
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/analytics/team"
                className={navigationMenuTriggerStyle()}
              >
                Аналитика по командам
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Аватар */}
        {isLoading ? (
          <Loader />
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="flex justify-center items-center bg-gray">
                {user
                  ? (user.first_name
                      ? user.first_name[0]?.toUpperCase()
                      : "A") +
                    (user.last_name ? user?.last_name[0]?.toUpperCase() : "V")
                  : "AV"}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-8">
              <Link to="/lk">
                <DropdownMenuItem>
                  <User />
                  Личный кабинет
                </DropdownMenuItem>
              </Link>
              {user.is_staff ? (
                <Link to="/federations">
                  <DropdownMenuItem>
                    <FlagIcon />
                    Федерации
                  </DropdownMenuItem>
                </Link>
              ) : null}
              <Link to="/profile">
                <DropdownMenuItem>
                  <UserRoundPen />
                  Профиль
                </DropdownMenuItem>
              </Link>
              <Link to="/profile/federation">
                <DropdownMenuItem>
                  <UserRoundPen />
                  Профиль федерации
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => logout()}>
                <LogOut />
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/login">
            <Button>Войти</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
