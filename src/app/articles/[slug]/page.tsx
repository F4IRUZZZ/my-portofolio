import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { Markdown } from "@/components/ui/Markdown";
import { getArticleBySlug } from "@/lib/queries";

// Tanpa generateStaticParams (tabel bisa kosong): akses `params` yang
// dinamis dibungkus Suspense sehingga cangkang bisa di-prerender dan isi
// streaming. Slug asing tetap 404 via notFound() di bawah.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Artikel tidak ditemukan — Fairuz.dev" };
  return {
    title: `${article.title} — Fairuz.dev`,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt },
  };
}

async function ArticleContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          <li>
            <Link href="/" className="hover:text-foreground">
              Beranda
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-4 w-4" />
          </li>
          <li>
            <Link href="/articles" className="hover:text-foreground">
              Artikel
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-4 w-4" />
          </li>
          <li aria-current="page" className="text-foreground">
            {article.title}
          </li>
        </ol>
      </nav>

      <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
        {article.title}
      </h1>
      {article.publishedLabel ? (
        <p className="mt-3 text-sm text-muted">{article.publishedLabel}</p>
      ) : null}
      <p className="mt-3 leading-relaxed text-muted">{article.excerpt}</p>

      {article.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.coverImageUrl}
          alt={`Cover ${article.title}`}
          className="mt-8 aspect-video w-full rounded-card border border-border object-cover"
        />
      ) : null}

      <div className="mt-8">
        <Markdown content={article.content} />
      </div>
    </>
  );
}

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-2xl">
          <Suspense fallback={<LoadingSkeleton lines={5} />}>
            <ArticleContent params={params} />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
