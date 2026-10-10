import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { getPublishedArticles } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Artikel — Fairuz.dev",
  description:
    "Catatan pembelajaran dan dokumentasi Alfairuz Atthariq Satria.",
};

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            level={1}
            eyebrow="Catatan"
            title="Artikel"
            description="Pembelajaran dan dokumentasi yang ditulis selama berproses."
          />
        </Reveal>
        {articles.length === 0 ? (
          <div className="mt-8">
            <Reveal>
              <EmptyState title="Belum ada artikel yang dipublikasikan." />
            </Reveal>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {articles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 80}>
                <article className="flex h-full flex-col gap-3 rounded-card border border-border bg-surface p-5 transition-colors duration-200 hover:bg-elevated sm:p-6">
                <p className="text-xs text-muted">{article.publishedLabel}</p>
                <h2 className="text-lg font-semibold leading-snug text-foreground">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="hover:text-accent-hover"
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="text-sm leading-relaxed text-muted">
                  {article.excerpt}
                </p>
                <div className="mt-auto pt-2">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="text-sm font-medium text-accent hover:text-accent-hover"
                  >
                    Baca selengkapnya
                  </Link>
                </div>
              </article>
            </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
