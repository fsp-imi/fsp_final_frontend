import { Separator } from "./separator"

const Footer = () => {
  return (
    <div className="w-full px-8 py-8 bg-white border-t-[1px] border-gray rounded-t-3xl flex flex-col gap-4 justify-between items-center">
      {/* Спонсоры */}
      <div className="flex flex-col justify-center items-center flex-wrap gap-8 py-8">
        <div className="flex flex-row flex-wrap gap-8 justify-start sm:justify-center items-center">
          <img src="/sponsors/sport_min.svg" alt="Министерство спорта РФ" />
          <img src="/sponsors/fumo_high.svg" alt="ФУМО ВО по ИБ" />
          <img src="/sponsors/fumo_prof.svg" alt="ФУМО СПО по ИБ" />
          <img src="/sponsors/reserv.svg" alt="ФУМО СПО по ИБ" />
        </div>
        <div className="flex flex-row flex-wrap gap-8 justify-start sm:justify-center items-center">
          <img src="/sponsors/stoloto.svg" alt="СТОЛОТО" />
          <img src="/sponsors/uralhim.svg" alt="Урал Хим" />
          <img src="/sponsors/mws.svg" alt="MWS" />
        </div>
      </div>

      {/* Юридическая информация */}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center">
        {/* Логотип и адрес */}
        <div className="flex flex-col gap-6">
          <img className="max-w-[50%]" src="/logo2.svg" alt="Второй логотип" />

          <div className="font-semibold text-blacktext">
            125047, г. Москва,
            <br />
            2-я Брестская, д.8, этаж 9
          </div>
        </div>

        {/* Вопросы и почта для них */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div className="">Стать партнером мероприятий?</div>
            <a
              className="text-indigo-500 underline"
              href="mailto:partners@fsp-russia.com"
            >
              partners@fsp-russia.com
            </a>
          </div>

          <div className="flex flex-col">
            <div className="">Остались вопросы?</div>
            <a
              className="text-indigo-500 underline"
              href="mailto:events@fsp-russia.com"
            >
              events@fsp-russia.com
            </a>
          </div>

          <div className="flex flex-col">
            <div className="">Столкнулись с проблемой?</div>
            <a
              className="text-indigo-500 underline"
              href="mailto:support@fsp-russia.com"
            >
              support@fsp-russia.com
            </a>
          </div>
        </div>
      </div>

      {/* Разделительная линия */}
      <Separator />

      {/* Федерация и номер */}
      <div className="w-full flex justify-between items-center">
        <div className="text-darktext font-semibold">
          @2024 Федерация спортивного программирования России
        </div>

        <a
          href="tel:+7 (499) 678-03-05"
          className="decoration-none text-blacktext font-bold"
        >
          +7 (499) 678-03-05
        </a>
      </div>
    </div>
  )
}

export default Footer
