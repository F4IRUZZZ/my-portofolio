import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { Markdown } from "@/components/ui/Markdown";
import { Reveal } from "@/components/ui/Reveal";
import { getArticleBySlug } from "@/lib/queries";

// Tanpa generateStaticParams (tabel bisa kosong): akses `params` yang
// dinamis dibungkus Suspense sehingga cangkang bisa di-prerender dan isi
// streaming. Slug asing tetap 404 via notFound() di bawah.

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ t?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { t } = await searchParams;
  const article = await getArticleBySlug(slug, t);
  if (!article) return { title: "Artikel tidak ditemukan — Fairuz.dev" };
  return {
    title: `${article.title} — Fairuz.dev`,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt },
    robots: article.preview ? { index: false, follow: false } : undefined,
  };
}

async function ArticleContent({
  params,
  previewToken,
}: {
  params: Promise<{ slug: string }>;
  previewToken?: string;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug, previewToken);
  if (!article) notFound();

  return (
    <>
      {article.preview ? (
        <p
          role="status"
          className="mb-6 inline-block rounded-control border border-warning/40 bg-warning/10 px-3 py-1.5 text-xs font-medium text-warning"
        >
          Mode pratinjau — draft ini tidak publik dan tidak terindeks.
        </p>
      ) : null}
      <Reveal>
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
      </Reveal>

      <Reveal delay={60}>
        <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          {article.title}
        </h1>
        {article.publishedLabel ? (
          <p className="mt-3 text-sm text-muted">{article.publishedLabel}</p>
        ) : null}
        <p className="mt-3 leading-relaxed text-muted">{article.excerpt}</p>
      </Reveal>

      {article.coverImageUrl ? (
        <Reveal delay={100}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.coverImageUrl}
            alt={`Cover ${article.title}`}
            className="mt-8 aspect-video w-full rounded-card border border-border object-cover"
          />
        </Reveal>
      ) : null}

      <div className="mt-8">
        <Reveal delay={120}>
          <Markdown content={article.content} />
        </Reveal>
      </div>
    </>
  );
}

export default function ArticleDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ t?: string }>;
}) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-2xl">
          <Suspense fallback={<LoadingSkeleton lines={5} />}>
            <PreviewTokenLoader
              params={params}
              searchParams={searchParams}
            />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}

async function PreviewTokenLoader({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ t?: string }>;
}) {
  const { t } = await searchParams;
  return <ArticleContent params={params} previewToken={t} />;
}
