import Link from "next/link";
import { Pencil } from "lucide-react";
import type { ReactNode } from "react";

export type DataColumn<T> = {
  header: string;
  render: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  columns: DataColumn<T>[];
  rows: T[];
  keyOf: (row: T) => string | number;
  editHrefOf?: (row: T) => string;
  emptyTitle: string;
};

export function DataTable<T>({
  columns,
  rows,
  keyOf,
  editHrefOf,
  emptyTitle,
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-border bg-surface px-6 py-10 text-center">
        <p className="text-sm text-muted">{emptyTitle}</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop: tabel */}
      <div className="hidden overflow-x-auto rounded-card border border-border md:block">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-xs uppercase tracking-wide text-muted">
              {columns.map((column) => (
                <th key={column.header} scope="col" className="px-4 py-3 font-medium">
                  {column.header}
                </th>
              ))}
              {editHrefOf ? (
                <th scope="col" className="px-4 py-3 font-medium">
                  <span className="sr-only">Aksi</span>
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={keyOf(row)}
                className="border-b border-border bg-background last:border-0"
              >
                {columns.map((column) => (
                  <td key={column.header} className="px-4 py-3 text-muted">
                    {column.render(row)}
                  </td>
                ))}
                {editHrefOf ? (
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={editHrefOf(row)}
                      aria-label="Ubah"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-control border border-border text-muted transition-colors duration-200 hover:border-accent hover:text-foreground"
                    >
                      <Pencil aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: kartu */}
      <ul className="flex flex-col gap-3 md:hidden">
        {rows.map((row) => (
          <li
            key={keyOf(row)}
            className="flex items-center justify-between gap-3 rounded-card border border-border bg-surface p-4"
          >
            <div className="flex min-w-0 flex-col gap-1">
              {columns.map((column) => (
                <div key={column.header} className="truncate text-sm">
                  {column.render(row)}
                </div>
              ))}
            </div>
            {editHrefOf ? (
              <Link
                href={editHrefOf(row)}
                aria-label="Ubah"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-border text-muted transition-colors duration-200 hover:border-accent hover:text-foreground"
              >
                <Pencil aria-hidden="true" className="h-4 w-4" />
              </Link>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
}
