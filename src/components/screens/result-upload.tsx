import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Form, FormLabel } from "../ui/form"
import { useMutation } from "@tanstack/react-query"
import { ResultService } from "@/services/result/result"
import { Button } from "../ui/button"
import { useParams } from "react-router-dom"

const ResultUploadScreen = () => {
  const { id } = useParams()
  const form = useForm()
  const [file, setFile] = useState<File | null>(null)
  const [fields, setFields] = useState<any>({
    district: "",
    region: "",
    participants: "",
    points: "",
    place: "",
  })

  const [debouncedField, setDebouncedField] = useState<{
    name: string
    value: string
  } | null>(null)

  const [results, setResults] = useState<{ [key: string]: string[] | null }>({})
  const [sendingQueue, setSendingQueue] = useState<string[]>([])

  const { mutate } = useMutation({
    mutationKey: ["result upload"],
    mutationFn: ResultService.previewColumn,
    onSuccess: (res, variables) => {
      const header = variables.get("header") as string
      setResults((prev) => ({ ...prev, [header]: res[header] || null }))
    },
  })

  // Обработка выбора файла
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])

      // Добавляем все заполненные поля в очередь отправки
      const filledFields = Object.keys(fields).filter((key) => fields[key])
      setSendingQueue(filledFields)
    }
  }

  // Общий обработчик изменения значений
  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const newValue = event.target.value

    // Обновляем локальное состояние
    setFields((prev: any) => ({
      ...prev,
      [fieldName]: newValue,
    }))

    // Устанавливаем значение для debounce
    setDebouncedField({ name: fieldName, value: newValue })
  }

  // Debounce эффект для отправки данных при изменении поля
  useEffect(() => {
    if (!debouncedField || !file) return

    const handler = setTimeout(() => {
      try {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("header", debouncedField.name)
        formData.append("column_range", debouncedField.value)

        mutate(formData)
      } catch (error) {
        console.error(
          `Ошибка при загрузке для поля ${debouncedField.name}:`,
          error
        )
      }
    }, 1000) // Задержка в 1 секунду

    return () => {
      clearTimeout(handler) // Очищаем таймер при новых изменениях
    }
  }, [debouncedField, file])

  // Эффект для последовательной отправки данных из очереди после загрузки файла
  useEffect(() => {
    if (!file || sendingQueue.length === 0) return

    const currentField = sendingQueue[0]
    const formData = new FormData()
    formData.append("file", file)
    formData.append("header", currentField)
    formData.append("column_range", fields[currentField])

    mutate(formData, {
      onSuccess: () => {
        setSendingQueue((prev) => prev.slice(1)) // Удаляем отправленное поле из очереди
      },
    })
  }, [sendingQueue, file, fields, mutate])

  const handleSubmitAll = (e: any) => {
    e.preventDefault()
    if (!id) return
    if (!file) {
      alert("Пожалуйста, выберите файл.")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    // Добавляем значения всех полей в FormData
    Object.entries(fields).forEach(([key, value]) => {
      if (value) {
        formData.append("columns[]", JSON.stringify({ key, value }))
      }
    })

    console.log("Отправка всех данных:", { ...fields, contest_id: id })
  }

  if (id)
    return (
      <div className="w-full h-full flex flex-col justify-center items-center text-3xl font-medium bg-white rounded-3xl p-10">
        <div className="w-full flex flex-col gap-4">
          <div className="text-2xl">Загрузка результатов</div>
          <Form {...form}>
            <form
              onSubmit={handleSubmitAll}
              className="w-auto h-auto flex flex-col gap-6"
            >
              {/* Поле для выбора файла */}
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="file" className="text-lg">
                  Результаты
                  <span className="text-slate-400">
                    (&nbsp;.csv&nbsp;|&nbsp;.xls&nbsp;|&nbsp;.xlsx&nbsp;)
                  </span>
                </label>
                <Input
                  required
                  id="file"
                  type="file"
                  accept=".csv, .xls, .xlsx"
                  onChange={handleFileChange}
                />
              </div>

              <h1 className="text-xl">Столбцы с данными</h1>
              <div className="flex flex-row gap-4">
                {[
                  { label: "Округ", name: "district" },
                  { label: "Регион", name: "region" },
                  { label: "Участники", name: "participants" },
                  { label: "Баллы", name: "points" },
                  { label: "Место", name: "place" },
                ].map((field) => (
                  <div
                    key={field.name}
                    className="flex flex-col w-full justify-start gap-1.5"
                  >
                    <FormLabel htmlFor={field.name}>
                      {field.label}
                      <span className="text-slate-400">( номер столбца )</span>
                    </FormLabel>
                    <Input
                      id={field.name}
                      type="text"
                      className="placeholder:text-slate-400"
                      placeholder="1, 3-5, 7, 9"
                      value={fields[field.name as keyof typeof fields]}
                      onChange={(e) => handleFieldChange(e, field.name)}
                    />
                    {/* Отображение результата */}
                    {results[field.name] && (
                      <div className="mt-2 text-sm text-gray-500">
                        <p>Результат:</p>
                        <ul className="overflow-hidden relative divide-y">
                          {results[field.name]!.map((item, index) => (
                            <li className="whitespace-nowrap p-2" key={index}>
                              {item ? (item === "None" ? "-" : item) : "-"}
                            </li>
                          ))}
                          <li className="p-2">...</li>
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Button type="submit">Отправить результаты</Button>
            </form>
          </Form>
        </div>
      </div>
    )
}

export default ResultUploadScreen
