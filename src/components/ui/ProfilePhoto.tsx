import { User } from "lucide-react";

type ProfilePhotoProps = {
  imageUrl: string | null;
  name: string;
};

/*
 * Foto profil bila URL tersedia; bila kosong tampilkan siluet netral yang
 * jelas sebagai placeholder (bukan foto orang lain). Nanti foto asli cukup
 * diisi via CMS tanpa ubah kode.
 */
export function ProfilePhoto({ imageUrl, name }: ProfilePhotoProps) {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={`Foto ${name}`}
        className="aspect-square w-full max-w-xs rounded-card border border-border object-cover"
      />
    );
  }
  return (
    <div
      role="img"
      aria-label="Foto profil belum tersedia"
      className="flex aspect-square w-full max-w-xs items-center justify-center rounded-card border border-dashed border-border bg-surface text-muted"
    >
      <User aria-hidden="true" className="h-16 w-16" strokeWidth={1.25} />
    </div>
  );
}
