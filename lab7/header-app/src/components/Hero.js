import ServiceSlider from './ServiceSlider';
import background from '../assets/background.jpg';

export default function Hero() {
  return (
    <main
      id="home"
      className="hero"
      style={{
        backgroundImage: `url(${background})`
      }}
    >
      <div className="hero-content">
        <h1>
          ROBOTIZATION BUSINESS
          <br />
          PROCESSES
        </h1>

        <p>
          We combines expertise in management consulting
          and implementation
          <br />
          of business applications
        </p>
      </div>

      <svg
        className="decorative-arrow"
        viewBox="0 0 120 200"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10 190 Q-5 70 110 15 M88 7 L110 15 L101 38"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <ServiceSlider />
    </main>
  );
}