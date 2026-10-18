import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'blue' }) {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50 text-blue-600',
      border: 'border-blue-100',
      gradient: 'from-blue-500/10 to-transparent',
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-600',
      border: 'border-emerald-100',
      gradient: 'from-emerald-500/10 to-transparent',
    },
    amber: {
      bg: 'bg-amber-50 text-amber-600',
      border: 'border-amber-100',
      gradient: 'from-amber-500/10 to-transparent',
    },
    purple: {
      bg: 'bg-purple-50 text-purple-600',
      border: 'border-purple-100',
      gradient: 'from-purple-500/10 to-transparent',
    },
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition duration-200">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${scheme.gradient} rounded-bl-full pointer-events-none`} />
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</p>
          <h4 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">{value}</h4>
          {subtitle && (
            <p className="mt-1.5 text-xs text-slate-500 font-medium flex items-center gap-1.5">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-3.5 rounded-2xl ${scheme.bg} shadow-inner shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
