import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'purple' | 'green' | 'blue' | 'orange' | 'red'
}

const colorClasses = {
  purple: {
    bg: 'bg-purple-500/10',
    icon: 'text-purple-600',
    trend: 'text-purple-600'
  },
  green: {
    bg: 'bg-green-500/10',
    icon: 'text-green-600',
    trend: 'text-green-600'
  },
  blue: {
    bg: 'bg-blue-500/10',
    icon: 'text-blue-600',
    trend: 'text-blue-600'
  },
  orange: {
    bg: 'bg-orange-500/10',
    icon: 'text-orange-600',
    trend: 'text-orange-600'
  },
  red: {
    bg: 'bg-red-500/10',
    icon: 'text-red-600',
    trend: 'text-red-600'
  }
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  color = 'purple'
}: StatsCardProps) {
  const colors = colorClasses[color]

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-neutral-900">{value}</p>

          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-sm text-neutral-500">vs last period</span>
            </div>
          )}
        </div>

        <div className={`p-3 rounded-lg ${colors.bg}`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
      </div>
    </div>
  )
}
