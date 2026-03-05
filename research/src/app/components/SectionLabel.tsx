interface SectionLabelProps {
  number: string;
  label: string;
  color?: string;
}

export function SectionLabel({ number, label, color = "violet" }: SectionLabelProps) {
  const colorMap: Record<string, string> = {
    violet: "bg-violet-100 text-violet-600 border-violet-200",
    blue: "bg-blue-100 text-blue-600 border-blue-200",
    amber: "bg-amber-100 text-amber-700 border-amber-200",
    emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
    rose: "bg-rose-100 text-rose-600 border-rose-200",
    indigo: "bg-indigo-100 text-indigo-600 border-indigo-200",
    teal: "bg-teal-100 text-teal-700 border-teal-200",
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs tracking-widest uppercase border ${colorMap[color] || colorMap.violet}`}
      >
        <span className="opacity-60">{number}</span>
        {label}
      </span>
    </div>
  );
}
