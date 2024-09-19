import Category from "@/models/Category";

export async function GET() {
  const categories = await Category.find().sort({ name: 1 })
  return Response.json(categories)
}

export async function POST(request) {
  const body = await request.json()
  const category = new Category(body)
  await category.save()
  return Response.json(category)
}



// for V2
export async function PUT(request) {
  const body = await request.json()
  const category = await Category.findByIdAndUpdate(body._id, body) 
  return Response.json(category)
}