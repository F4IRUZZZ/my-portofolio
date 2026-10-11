import { User } from "lucide-react";

type ProfilePhotoProps = {
  imageUrl: string | null;
  name: string;
  shape?: "square" | "circle";
};

/*
 * Foto profil bila URL tersedia; bila kosong tampilkan siluet netral yang
 * jelas sebagai placeholder (bukan foto orang lain). Nanti foto asli cukup
 * diisi via CMS tanpa ubah kode.
 */
export function ProfilePhoto({ imageUrl, name, shape = "square" }: ProfilePhotoProps) {
  const frame =
    shape === "circle" ? "rounded-full" : "rounded-card border border-border";
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={`Foto ${name}`}
        className={`aspect-square w-full object-cover ${frame}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label="Foto profil belum tersedia"
      className={`flex aspect-square w-full items-center justify-center bg-surface text-muted ${frame} ${
        shape === "square" ? "border-dashed" : "border border-border"
      }`}
    >
      <User aria-hidden="true" className="h-16 w-16" strokeWidth={1.25} />
    </div>
  );
}
