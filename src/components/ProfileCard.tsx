interface ProfileCardProps {
  imageUrl: string;
  name: string;
  title: string;
  badges?: Array<{ label: string; bgColor: string }>;
  metadata?: {
    topLeft?: string[];
    bottomRight?: string[];
  };
  alt?: string;
}

const ProfileCard = ({ 
  imageUrl, 
  name, 
  title, 
  badges = [],
  metadata,
  alt = "Profile"
}: ProfileCardProps) => {
  return (
    <div className="relative group perspective-1000">
      {/* Animated Glow Aura */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-primary-500/20 via-accent-ai/20 to-accent-mobile/20 rounded-full blur-[80px] group-hover:opacity-100 transition-opacity opacity-40 animate-pulse"></div>
      
      <div className="relative aspect-[4/5] rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl transition-all duration-700 group-hover:rotate-1 group-hover:scale-[1.02]">
        
        {/* HUD Corner Accents */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-primary-500 z-20"></div>
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-primary-500 z-20"></div>
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-primary-500 z-20"></div>
        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-primary-500 z-20"></div>

        {/* AI Scanning Line */}
        <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent shadow-[0_0_15px_rgba(14,165,233,0.8)] z-30 animate-scan pointer-events-none"></div>

        {/* Image Wrapper with Filter */}
        <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700">
          <img 
            src={imageUrl} 
            alt={alt} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </div>

        {/* Technical Metadata Overlays */}
        {metadata?.topLeft && (
          <div className="absolute top-8 left-8 z-20 pointer-events-none hidden lg:block">
            <div className="text-[10px] font-mono text-primary-400 opacity-60 flex flex-col gap-1">
              {metadata.topLeft.map((item, idx) => (
                <span key={idx}>{item}</span>
              ))}
            </div>
          </div>
        )}

        {metadata?.bottomRight && (
          <div className="absolute bottom-20 right-8 z-20 pointer-events-none hidden lg:block text-right">
            <div className="text-[10px] font-mono text-accent-ai opacity-60 flex flex-col gap-1">
              {metadata.bottomRight.map((item, idx) => (
                <span key={idx} className={idx === metadata.bottomRight!.length - 1 ? "animate-pulse" : ""}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom ID Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 glass border-t border-slate-800/50 z-20">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight">{name}</h3>
              <p className="text-primary-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">{title}</p>
            </div>
            {badges.length > 0 && (
              <div className="flex -space-x-1 sm:-space-x-2">
                {badges.map((badge, idx) => (
                  <div 
                    key={idx}
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-slate-950 ${badge.bgColor} flex items-center justify-center text-[10px] sm:text-xs`}
                  >
                    {badge.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
