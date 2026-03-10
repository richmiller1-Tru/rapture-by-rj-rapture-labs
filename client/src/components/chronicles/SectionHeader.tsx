interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  children?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, badge, centered = false, children }: SectionHeaderProps) {
  return (
    <div className={`mb-8 ${centered ? "text-center" : ""}`}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-3 bg-purple-500/20 text-purple-300 border border-purple-500/30">
          {badge}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
      {subtitle && <p className="mt-2 text-muted-foreground text-sm md:text-base max-w-2xl">{subtitle}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
