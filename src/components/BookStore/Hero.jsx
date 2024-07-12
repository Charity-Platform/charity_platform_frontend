import "./Books.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          المكتبة الخيرية لكل ما هو خاص بالعمل الخيرى{" "}
        </h1>

        <div className="hero-tag">
          <p className="hero-tagline">كتب مجانية </p>
          <p className="hero-tagline">كتب مدفوعة  </p>
        </div>
      </div>
      <div className="hero-books"></div>
    </div>
  );
};

export default Hero;
