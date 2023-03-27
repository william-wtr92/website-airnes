import Return from "@/components/app/ui/Return"

const EditCategory = () => {
  return (
    <div className="p-10 absolute top-10 left-0 z-0 lg:top-0 lg:left-64">
      <Return name="categories" back={"/admin/categories/all"} />
    </div>
  )
}

export default EditCategory
