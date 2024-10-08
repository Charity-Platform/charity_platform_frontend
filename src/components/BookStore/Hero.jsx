import "./Books.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title-main"> {/* Updated class name */}
          المكتبة الخيرية لكل ما هو خاص بالعمل الخيرى
        </h1>

        <div className="hero-tag">
          <p className="hero-tagline"> ادارة</p>
          <p className="hero-tagline"> تسويق </p>
          <p className="hero-tagline"> تنمية موارد  </p>
          <p className="hero-tagline"> جودة </p>
          <p className="hero-tagline"> حوكمة </p>
        </div>
      </div>
      <div className="hero-books"></div>
    </div>
  );
};

export default Hero;
