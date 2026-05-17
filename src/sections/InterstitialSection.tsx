import Marquee from "@/components/Marquee";

const InterstitialSection = () => {
  return (
    <section className="interstitial" aria-hidden="true">
      <div className="container">
        <div className="interstitial-row">
          <span className="eyebrow">From pixel to model</span>
          <span className="interstitial-arrow">↓</span>
        </div>
        <h3 className="interstitial-text">
          Every project leans on a <em>stack of choices</em>.
          <br />
          Here&apos;s the constellation behind them.
        </h3>
      </div>
      <Marquee thin />
    </section>
  );
};

export default InterstitialSection;
