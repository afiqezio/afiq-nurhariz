interface MarqueeProps {
  thin?: boolean;
}

const MarqueeContent = ({ thin }: { thin: boolean }) => {
  if (thin) {
    return (
      <>
        Frontend <span className="dot" />
        Backend <span className="dot" />
        <em>Mobile</em> <span className="dot" />
        Databases <span className="dot" />
        <em>AI · ML</em> <span className="dot" />
        DevOps <span className="dot" />
      </>
    );
  }

  return (
    <>
      Full-Stack <span className="dot" />
      Mobile <span className="dot" />
      <em>AI · ML</em> <span className="dot" />
      Data Pipelines <span className="dot" />
      Computer Vision <span className="dot" />
      <em>Systems Thinking</em> <span className="dot" />
    </>
  );
};

const Marquee = ({ thin = false }: MarqueeProps) => {
  return (
    <div className={`marquee${thin ? " marquee-thin" : ""}`} aria-hidden="true">
      <div className="marquee-track">
        <span className="marquee-item">
          <MarqueeContent thin={thin} />
        </span>
        <span className="marquee-item">
          <MarqueeContent thin={thin} />
        </span>
      </div>
    </div>
  );
};

export default Marquee;
