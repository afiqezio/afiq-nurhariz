import { TiltedCard, GlassSurface, ReactBitsText } from "@/components/reactbits";
import { aboutContent } from "@/constants/data";

const AboutSection = () => {
  return (
    <section
      className="py-24 px-4 md:px-8 lg:px-16 relative"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            id="about-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight"
          >
            <ReactBitsText
              variant="gradient"
              className="text-5xl md:text-6xl lg:text-7xl font-black"
              colors={['#3b82f6', '#8b5cf6', '#06b6d4']}
              speed={6}
            >
              About Me
            </ReactBitsText>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
            <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-slate-700">
                I'm a passionate <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">full-stack developer</span> and <span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AI enthusiast</span> with a creative approach to problem-solving.
              </p>

              <p className="text-lg md:text-xl leading-relaxed text-slate-600">
                Currently pursuing <span className="font-semibold text-slate-900">Artificial Intelligence</span> at Universiti Teknologi Mara, I specialize in creating intelligent solutions that bridge the gap between technology and real-world applications.
              </p>

              <p className="text-lg md:text-xl leading-relaxed text-slate-600">
                My journey spans from crafting elegant web applications to developing machine learning models that drive meaningful insights from complex datasets.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-2">
                  1+
                </div>
                <p className="text-sm text-slate-500 uppercase tracking-wider">
                  Years Experience
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                  5+
                </div>
                <p className="text-sm text-slate-500 uppercase tracking-wider">
                  Projects Completed
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600 mb-2">
                  ∞
                </div>
                <p className="text-sm text-slate-500 uppercase tracking-wider">
                  Learning Journey
                </p>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <TiltedCard intensity={12}>
              <GlassSurface className="p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
                <div className="relative space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">🚀</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        Innovation
                      </p>
                      <p className="text-sm text-slate-600">
                        Pushing boundaries
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">🎯</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        Precision
                      </p>
                      <p className="text-sm text-slate-600">
                        Attention to detail
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">⚡</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        Performance
                      </p>
                      <p className="text-sm text-slate-600">
                        Optimized solutions
                      </p>
                    </div>
                  </div>
                </div>
              </GlassSurface>
            </TiltedCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

