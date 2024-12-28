interface PregnancyStat {
    icon: React.ReactNode;
    label: string;
    value: string;
    subtext: string;
  }
  
  interface PregnancyStatsProps {
    stats: PregnancyStat[];
  }
  
  const PregnancyStats: React.FC<PregnancyStatsProps> = ({ stats }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3">
              {stat.icon}
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.subtext}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default PregnancyStats;
  