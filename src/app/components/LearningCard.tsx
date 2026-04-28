import { LucideIcon } from 'lucide-react';

interface LearningCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor?: string;
  iconColor?: string;
  href?: string;
}

export function LearningCard({
  icon: Icon,
  title,
  description,
  bgColor = 'bg-white',
  iconColor = 'text-primary',
  href,
}: LearningCardProps) {
  const content = (
    <div className="flex flex-col gap-4">
      <div className={`w-14 h-14 rounded-2xl bg-secondary/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-7 h-7 ${iconColor}`} />
      </div>

      <div>
        <h3 className="text-xl mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>

      <div className="pt-2">
        <div className="inline-flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform">
          Start Learning →
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${bgColor} rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-border/50 hover:border-primary/30 block`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={`${bgColor} rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-border/50 hover:border-primary/30`}>
      {content}
    </div>
  );
}
