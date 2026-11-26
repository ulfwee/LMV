import { useRef, useState } from 'react';
import Slider from 'react-slick';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import card1 from '../assets/card-1.png';
import card2 from '../assets/card-2.png';
import card3 from '../assets/card-3.png';
import card4 from '../assets/card-4.png';
import card5 from '../assets/card-5.png';

const services = [
  {
    id: 1,
    title: '',
    image: card1
  },
  {
    id: 2,
    title: 'Automation of production',
    image: card2
  },
  {
    id: 3,
    title: 'IT infrastructure',
    image: card3
  },
  {
    id: 4,
    title: 'Information security',
    image: card4
  },
  {
    id: 5,
    title: 'Information infrastructure',
    image: card5
  }
];

export default function ServiceSlider() {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    beforeChange: (_, next) => setActiveIndex(next),

    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };

  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  return (
    <section className="services">
      <button
        type="button"
        className="slider-arrow"
        aria-label="Previous slide"
        onClick={previousSlide}
      >
        <FiChevronLeft />
      </button>

      <div className="slider-container">
        <Slider ref={sliderRef} {...settings}>
          {services.map((service, index) => (
            <div className="slide-wrapper" key={service.id}>
              <button
                type="button"
                aria-label={service.title || 'Robotization'}
                className={`service-card ${
                  activeIndex === index ? 'active' : ''
                }`}
                style={{
                  backgroundImage: `url(${service.image})`
                }}
                onClick={() => setActiveIndex(index)}
              >
                <span>{service.title}</span>
              </button>
            </div>
          ))}
        </Slider>
      </div>

      <button
        type="button"
        className="slider-arrow"
        aria-label="Next slide"
        onClick={nextSlide}
      >
        <FiChevronRight />
      </button>
    </section>
  );
}