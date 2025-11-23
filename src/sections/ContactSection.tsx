import { TiltedCard, GlassSurface, ReactBitsText, ReactBitsButton } from "@/components/reactbits";
import { contactLinks } from "@/constants/data";

const ContactSection = () => {
  return (
    <section
      className="py-24 px-4 md:px-8 lg:px-16 mb-32 relative"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            id="contact-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight"
          >
            <ReactBitsText
              variant="gradient"
              className="text-5xl md:text-6xl lg:text-7xl font-black"
              colors={['#8b5cf6', '#ec4899', '#06b6d4']}
              speed={6}
            >
              Get In Touch
            </ReactBitsText>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto rounded-full mb-8"></div>

          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's collaborate and create something amazing together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contactLinks.map((link, index) => (
            <TiltedCard key={link.label} intensity={8} className="group">
              <GlassSurface className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </div>

                  <p className="text-lg font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {link.label}
                  </p>

                  <p className="text-sm text-slate-500">
                    {link.label === 'Email' ? 'Send me a message' :
                     link.label === 'LinkedIn' ? 'Connect professionally' :
                     'Explore my code'}
                  </p>
                </div>
              </GlassSurface>
            </TiltedCard>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <TiltedCard intensity={6}>
            <GlassSurface className="p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
              <div className="relative space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Let's Build Something Together
                </h3>

                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Whether you have a project in mind, need technical consultation, or just want to chat about technology, I'm always open to interesting conversations.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <ReactBitsButton
                    variant="gradient"
                    size="lg"
                    onClick={() => window.open('mailto:afiqnurhariz@gmail.com', '_blank')}
                    aria-label="Send email"
                  >
                    <span className="mr-2">✉️</span>
                    Start a Conversation
                  </ReactBitsButton>

                  <ReactBitsButton
                    variant="outline"
                    size="lg"
                    onClick={() => window.open('https://calendly.com/afiqnurhariz', '_blank')}
                    aria-label="Schedule a call"
                    className="backdrop-blur-xl bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30"
                  >
                    <span className="mr-2">📅</span>
                    Schedule a Call
                  </ReactBitsButton>
                </div>
              </div>
            </GlassSurface>
          </TiltedCard>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

