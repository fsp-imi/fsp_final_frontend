import Logo from "./logo"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui//avatar"
import { Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { LogOut, MenuIcon, User } from "lucide-react"
import { useUserStore } from "@/store/user"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./navigation-menu"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./sheet"

const Header = () => {
  const logout = useUserStore((state) => state.logout)

  return (
    <div className="w-full h-16 px-8 py-3 border-b-[1px] border-gray rounded-b-3xl flex flex-row justify-between items-center bg-white">
      {/* Логотип */}
      <Logo />

      {/* Мобильное меню */}
      <Sheet>
        <SheetTrigger className="sm:hidden">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent>
          {/* Пункты меню */}
          <div className="flex flex-col gap-2">
            <SheetClose asChild>
              <Link to="/">Главная</Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to="/contacts" className="">
                Контакты
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to="/about-us" className="">
                О нас
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to="/profile" className="">
                Профиль
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <div onClick={() => logout()} className="cursor-pointer">
                Выйти
              </div>
            </SheetClose>
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
              <Link to="/contacts" className={navigationMenuTriggerStyle()}>
                Контакты
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about-us" className={navigationMenuTriggerStyle()}>
                О нас
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/contest-search"
                className={navigationMenuTriggerStyle()}
              >
                Мероприятия
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Аватар */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-8">
            <Link to="/profile">
              <DropdownMenuItem>
                <User />
                Профиль
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => logout()}>
              <LogOut />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Header
