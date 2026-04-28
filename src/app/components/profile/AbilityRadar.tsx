import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface AbilityRadarProps {
  data: { subject: string; score: number; fullMark: number }[];
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: any[] }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-foreground text-background rounded-xl px-3 py-2 text-sm shadow-lg">
        <div className="font-medium">{payload[0].payload.subject}</div>
        <div className="text-primary">{payload[0].value} / 100</div>
      </div>
    );
  }
  return null;
}

export function AbilityRadar({ data }: AbilityRadarProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
        <PolarGrid stroke="rgba(112,112,112,0.15)" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: '#707070', fontSize: 12, fontFamily: "'Noto Sans', sans-serif" }}
        />
        <Radar
          name="Ability"
          dataKey="score"
          stroke="#F9B24E"
          fill="#F9B24E"
          fillOpacity={0.25}
          strokeWidth={2}
          dot={{ r: 4, fill: '#F9B24E', strokeWidth: 0 }}
        />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
