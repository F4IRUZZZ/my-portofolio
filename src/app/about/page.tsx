import type { Metadata } from "next";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnologyTag } from "@/components/ui/TechnologyTag";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { Reveal } from "@/components/ui/Reveal";
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
          <Reveal>
            <SectionHeading level={1} eyebrow="Profil" title="Tentang Saya" />
            <div className="mt-8 max-w-xs">
              <ProfilePhoto
                imageUrl={profile.profileImageUrl}
                name={profile.fullName}
              />
            </div>
            <div className="mt-6 flex max-w-3xl flex-col gap-4 leading-relaxed text-muted">
              {profile.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="pendidikan-heading" className="py-8">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Latar" title="Pendidikan" />
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">
              {profile.education}
            </p>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="minat-heading" className="py-8">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Fokus" title="Area Minat" />
            <ul className="mt-4 flex max-w-3xl flex-wrap gap-2">
              {interests.map((interest) => (
                <li key={interest}>
                  <TechnologyTag name={interest} />
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="techstack-heading" className="py-8">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Kemampuan"
              title="TechStack"
              description="Dikelompokkan berdasarkan pengalaman nyata, tanpa persentase kemampuan."
            />
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Reveal delay={0}>
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
            </Reveal>
            <Reveal delay={80}>
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
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <Reveal>
            <div className="flex flex-wrap gap-3">
              <PrimaryButton href="/projects">Lihat Proyek</PrimaryButton>
              <SecondaryButton href="/contact">Hubungi Saya</SecondaryButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
