import { FileText, Github } from "lucide-react";
import { ReactBitsButton, TiltedCard, GlassSurface, ReactBitsText, SplitText } from "@/components/reactbits";
import { heroData } from "@/constants/data";

const HeroSection = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden pt-24 md:pt-32"
      aria-label="Hero section"
    >
      <div className="text-center space-y-12 relative z-10 max-w-5xl mx-auto">
        {/* Profile Image with Floating Animation */}
        <div className="relative inline-block animate-float" aria-label="Profile picture">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl scale-150"></div>
          <TiltedCard intensity={15}>
            <GlassSurface className="p-1 rounded-full">
              <div className="relative">
                <img
                  src={heroData.profileImage}
                  alt={`${heroData.name} profile`}
                  className="h-32 w-32 md:h-36 md:w-36 rounded-full object-cover ring-4 ring-white/10"
                  width={144}
                  height={144}
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
              </div>
            </GlassSurface>
          </TiltedCard>
        </div>

        {/* Name and Title with Better Hierarchy */}
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-slate-400 font-light tracking-wider uppercase">
              {heroData.greeting}
            </p>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight">
              <SplitText
                delay={0.3}
                duration={0.8}
                stagger={0.03}
                gradient={true}
                gradientColors={['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4']}
              >
                {heroData.name}
              </SplitText>
            </h1>
          </div>

          <div className="space-y-6">
            <p className="text-xl md:text-2xl lg:text-3xl text-slate-200 font-medium tracking-wide">
              {heroData.roles.join(" • ")}
            </p>

            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {heroData.description}
            </p>
          </div>
        </div>

        {/* CTA Buttons with Better Design */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
          <ReactBitsButton
            variant="gradient"
            size="lg"
            onClick={() => window.open(heroData.resumeUrl, '_blank')}
            aria-label="Download resume"
            className="group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl scale-150"></span>
            <span className="relative z-10 flex items-center">
              <FileText className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
              Download Resume
            </span>
          </ReactBitsButton>

          <ReactBitsButton
            variant="outline"
            size="lg"
            onClick={() => window.open('https://github.com/afiqezio', '_blank')}
            aria-label="Visit GitHub profile"
            className="group backdrop-blur-xl bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30"
          >
            <span className="flex items-center">
              <Github className="mr-3 h-5 w-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" aria-hidden="true" />
              View GitHub
            </span>
          </ReactBitsButton>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

