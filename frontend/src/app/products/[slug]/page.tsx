import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone, Download, ChevronRight, CheckCircle } from "lucide-react";
import { COMPANY, PRODUCT_CATEGORIES } from "@/lib/constants";
import { getWhatsAppLink, buildInquiryMessage } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

// In production this would call the API. For SSG it uses the mock.
async function getProduct(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"}/products/${slug}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | Shree Bhavani Trading Corporation`,
    description: product.shortDescription || product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProduct(params.slug);

  // Show placeholder UI when API is not connected
  const mockProduct = {
    name: params.slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
    slug: params.slug,
    description: "Premium quality plumbing product manufactured to IS standards. Suitable for residential, commercial, and industrial applications. Resistant to corrosion, UV degradation, and chemical exposure.",
    shortDescription: "High-quality piping product for water supply and plumbing systems.",
    category: { name: "UPVC Pipes & Fittings", slug: "upvc-pipes-fittings", icon: "🔧" },
    brand: { name: "Supreme" },
    images: [] as string[],
    specifications: [
      { label: "Standard", value: "IS 4985:2000" },
      { label: "Pressure Class", value: "Class 4 / 6 / 10 / 16" },
      { label: "Temperature Range", value: "0°C to 60°C" },
      { label: "Joints", value: "Solvent Cement / Ring Seal" },
      { label: "Color", value: "Grey / Blue" },
      { label: "Length", value: "3m / 6m" },
    ],
    availableSizes: ["15mm", "20mm", "25mm", "32mm", "40mm", "50mm", "63mm", "75mm", "90mm", "110mm", "140mm", "160mm"],
    material: "UPVC",
    application: "Water supply, irrigation, industrial",
    isFeatured: true,
  };

  const p = product || mockProduct;

  return (
    <div className="min-h-screen bg-dark pt-28 pb-20">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-brand-orange transition-colors">Products</Link>
          <ChevronRight size={14} />
          {p.category && (
            <>
              <Link
                href={`/products?category=${p.category.slug}`}
                className="hover:text-brand-orange transition-colors"
              >
                {p.category.name}
              </Link>
              <ChevronRight size={14} />
            </>
          )}
          <span className="text-gray-300">{p.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image gallery */}
          <div>
            <div className="bg-dark-100 border border-white/10 rounded-2xl h-80 sm:h-96 flex items-center justify-center mb-4">
              {p.images?.[0] ? (
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  width={500}
                  height={400}
                  className="object-contain p-8"
                />
              ) : (
                <div className="text-center">
                  <p className="text-7xl mb-4">{p.category?.icon || "📦"}</p>
                  <p className="text-gray-600 text-sm">Product image coming soon</p>
                </div>
              )}
            </div>
            {/* Thumbnails */}
            {p.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {p.images.slice(0, 4).map((img: string, i: number) => (
                  <div key={i} className="bg-dark-100 border border-white/10 rounded-lg h-20">
                    <Image src={img} alt="" width={80} height={80} className="object-contain p-2" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            {p.isFeatured && <span className="badge-orange mb-3">Featured Product</span>}
            {p.category && (
              <p className="text-brand-orange text-sm font-semibold uppercase tracking-wider mb-2">
                {p.category.name}
              </p>
            )}
            <h1 className="heading-md text-white mb-4">{p.name}</h1>

            <div className="flex flex-wrap gap-3 mb-6">
              {p.brand && (
                <span className="badge-blue">Brand: {p.brand.name}</span>
              )}
              {p.material && (
                <span className="bg-dark-200 text-gray-400 text-xs px-3 py-1 rounded-full border border-white/10">
                  Material: {p.material}
                </span>
              )}
            </div>

            <p className="text-gray-400 leading-relaxed mb-6">{p.description}</p>

            {/* Application */}
            {p.application && (
              <div className="mb-6">
                <h3 className="text-white text-sm font-semibold mb-2">Applications</h3>
                <div className="flex flex-wrap gap-2">
                  {p.application.split(",").map((app: string) => (
                    <span key={app} className="flex items-center gap-1.5 text-xs text-gray-300 bg-dark-200 px-3 py-1.5 rounded-lg">
                      <CheckCircle size={12} className="text-brand-orange" />
                      {app.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Available sizes */}
            {p.availableSizes?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white text-sm font-semibold mb-2">Available Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {p.availableSizes.map((size: string) => (
                    <span
                      key={size}
                      className="px-3 py-1.5 bg-dark-200 border border-white/5 hover:border-brand-orange/30 text-gray-300 text-xs rounded-lg cursor-default transition-colors"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a
                href={getWhatsAppLink(buildInquiryMessage(p.name), COMPANY.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BC5A] text-white font-semibold py-3 px-6 rounded-lg transition-all"
              >
                <MessageCircle size={18} />
                WhatsApp Enquiry
              </a>
              <a
                href={`tel:+91${COMPANY.phone.primary}`}
                className="flex-1 flex items-center justify-center gap-2 btn-secondary"
              >
                <Phone size={18} />
                Call for Price
              </a>
            </div>

            <Link href="/quote" className="btn-ghost w-full justify-center mb-4">
              Add to Quote Request
            </Link>

            <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-brand-orange text-sm transition-colors">
              <Download size={14} />
              Download Technical Datasheet
            </a>
          </div>
        </div>

        {/* Specifications table */}
        {p.specifications?.length > 0 && (
          <div className="mt-12">
            <h2 className="heading-md text-white mb-6">Technical Specifications</h2>
            <div className="bg-dark-100 border border-white/10 rounded-2xl overflow-hidden">
              <table className="table-dark">
                <tbody>
                  {p.specifications.map((spec: { label: string; value: string }, i: number) => (
                    <tr key={i}>
                      <td className="font-medium text-gray-300 bg-dark-200/50 w-1/3">{spec.label}</td>
                      <td className="text-gray-400">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Related products (placeholder) */}
        <div className="mt-16">
          <h2 className="heading-md text-white mb-6">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PRODUCT_CATEGORIES.slice(0, 4).map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="card-industrial p-4 hover:border-brand-orange/30 transition-all group"
              >
                <p className="text-3xl mb-2">{cat.icon}</p>
                <p className="text-white text-xs font-semibold group-hover:text-brand-orange transition-colors">
                  {cat.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
