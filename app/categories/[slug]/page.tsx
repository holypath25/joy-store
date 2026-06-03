import { notFound } from 'next/navigation'
import { getCategoryBySlug, getAllCategories } from '@/lib/categories'

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return {}
  return {
    title: category.seoTitle,
    description: category.seoDescription,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) notFound()

  return (
    <main className="container-page py-12">
      <h1 className="text-3xl font-bold">{category.name}</h1>
      <p className="mt-4 text-slate-600">{category.description}</p>
    </main>
  )
}
