import { recommendedReadingData } from '../data/recommendedReadingData';
import { ExternalLink, FileText, BookText, GraduationCap, MonitorPlay } from 'lucide-react';

export function RecommendedReading() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Whitepaper':
        return <FileText className="w-5 h-5" />;
      case 'Documentation':
        return <BookText className="w-5 h-5" />;
      case 'Course':
        return <GraduationCap className="w-5 h-5" />;
      case 'Blog':
        return <MonitorPlay className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <div className="mb-16">
        <span className="text-[10px] tracking-[0.2em] font-semibold text-[#FF9900] uppercase mb-2 block">Curation</span>
        <h1 className="text-5xl md:text-7xl font-serif italic font-bold tracking-tight leading-[0.85] text-[#1A1A1A]">
          Recommended Reading.
        </h1>
        <p className="mt-8 text-sm leading-relaxed opacity-70 italic border-l-2 border-[#FF9900] pl-6 max-w-xl font-serif">
          Official AWS whitepapers, documentation, and guides to deepen your understanding of AI/ML concepts and prepare for the AIF-C01 exam.
        </p>
      </div>

      <div className="space-y-6">
        {recommendedReadingData.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white border border-[#1A1A1A] p-6 hover:shadow-[8px_8px_0_0_#FF9900] transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 flex items-start gap-4">
                <div className="mt-1 p-3 bg-[#1A1A1A]/5 text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
                  {getIcon(resource.type)}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#FF9900] font-bold">
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-[#1A1A1A] group-hover:underline underline-offset-4 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-[#1A1A1A]/70 leading-relaxed max-w-2xl">
                    {resource.description}
                  </p>
                </div>
              </div>
              <div className="sm:pl-4 sm:border-l border-[#1A1A1A]/10 flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 text-sm">
                <span className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-1 group-hover:text-[#FF9900] transition-colors">
                  Read <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
