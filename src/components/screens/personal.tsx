import PersonalForm from "../ui/forms/personal"

const Personal = () => {
  return (
    <div className="bg-white rounded-3xl px-10 py-8 flex flex-col gap-8">
      <div className="text-3xl">Профиль федерации</div>

      <PersonalForm />
    </div>
  )
}

export default Personal
