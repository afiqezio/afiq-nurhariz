const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const channels = [
  {
    label: "Email",
    value: "afiqnurhariz@gmail.com",
    href: "mailto:afiqnurhariz@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "in/afiqnurhariz",
    href: "https://www.linkedin.com/in/afiqnurhariz/",
  },
  {
    label: "GitHub",
    value: "github.com/afiqezio",
    href: "https://github.com/afiqezio",
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-eyebrow">
          <span className="eyebrow">— 04 / Get in touch</span>
        </div>

        <h2 className="contact-headline">
          Let&apos;s build
          <br />
          <em>something great.</em>
        </h2>

        <p className="contact-blurb">
          Have a project in mind, or want to chat about AI, data pipelines, or apps that
          ship? I&apos;m always open to new opportunities.
        </p>

        <a href="mailto:afiqnurhariz@gmail.com" className="contact-cta">
          Say hello
          <ArrowRight />
        </a>

        <div className="contact-channels">
          {channels.map(({ label, value, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="channel">
              <div>
                <div className="channel-label">{label}</div>
                <div className="channel-val">{value}</div>
              </div>
              <div className="channel-arrow">
                <ArrowRight />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
