import type { Metadata } from "next";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnologyTag } from "@/components/ui/TechnologyTag";
import { getProfile, interests, techStacks } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Tentang Saya — Fairuz.dev",
  description:
    "Bio, pendidikan, perjalanan belajar, dan TechStack Alfairuz Atthariq Satria.",
};

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <>
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading level={1} eyebrow="Profil" title="Tentang Saya" />
          <div className="mt-6 flex max-w-3xl flex-col gap-4 leading-relaxed text-muted">
            {profile.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="pendidikan-heading" className="py-8">
        <Container>
          <SectionHeading eyebrow="Latar" title="Pendidikan" />
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            {profile.education}
          </p>
        </Container>
      </section>

      <section aria-labelledby="minat-heading" className="py-8">
        <Container>
          <SectionHeading eyebrow="Fokus" title="Area Minat" />
          <ul className="mt-4 flex max-w-3xl flex-wrap gap-2">
            {interests.map((interest) => (
              <li key={interest}>
                <TechnologyTag name={interest} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="techstack-heading" className="py-8">
        <Container>
          <SectionHeading
            eyebrow="Kemampuan"
            title="TechStack"
            description="Dikelompokkan berdasarkan pengalaman nyata, tanpa persentase kemampuan."
          />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-card border border-border bg-surface p-5 sm:p-6">
              <h3 className="font-semibold text-foreground">
                Pernah digunakan
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {techStacks.used.map((tech) => (
                  <li key={tech}>
                    <TechnologyTag name={tech} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-card border border-border bg-surface p-5 sm:p-6">
              <h3 className="font-semibold text-foreground">
                Sedang dikembangkan
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {techStacks.developing.map((tech) => (
                  <li key={tech}>
                    <TechnologyTag name={tech} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton href="/projects">Lihat Proyek</PrimaryButton>
            <SecondaryButton href="/contact">Hubungi Saya</SecondaryButton>
          </div>
        </Container>
      </section>
    </>
  );
}
