import ReactMarkdown from "react-markdown";

/*
 * Render Markdown penulis. react-markdown meng-escape HTML mentah secara
 * default sehingga skrip tidak bisa dieksekusi dari isi artikel.
 */
export function Markdown({ content }: { content: string }) {
  return (
    <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-muted [&>h2]:mt-4 [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:text-foreground [&>h3]:mt-2 [&>h3]:font-semibold [&>h3]:text-foreground [&>ol]:flex [&>ol]:list-decimal [&>ol]:flex-col [&>ol]:gap-1.5 [&>ol]:pl-5 [&>ul]:flex [&>ul]:list-disc [&>ul]:flex-col [&>ul]:gap-1.5 [&>ul]:pl-5 [&>blockquote]:border-l-2 [&>blockquote]:border-accent [&>blockquote]:pl-4 [&>blockquote]:italic [&>code]:rounded [&>code]:bg-elevated [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:text-sm [&>code]:text-foreground [&>pre]:overflow-x-auto [&>pre]:rounded-card [&>pre]:border [&>pre]:border-border [&>pre]:bg-elevated [&>pre]:p-4 [&>pre>code]:bg-transparent [&>pre>code]:p-0 [&>p>a]:font-medium [&>p>a]:text-accent [&>p>a]:hover:text-accent-hover">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
