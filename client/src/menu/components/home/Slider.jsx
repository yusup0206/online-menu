import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Slider = (props) => {
  return (
    <section>
      <div className="container">
        <div className="w-full px-5 md:px-10 py-5">
          <Swiper
            // install Swiper modules
            modules={[Navigation, A11y, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
            loop={false}
            // breakpoints={{
            //   0: {
            //     slidesPerView: 1,
            //   },
            //   640: {
            //     slidesPerView: 2,
            //   },
            //   960: {
            //     slidesPerView: 3,
            //   },
            //   1280: {
            //     slidesPerView: 4,
            //   },
            // }}
            className="rounded-md"
          >
            {props.slides.map((slide) => (
              <SwiperSlide
                key={slide._id}
                className="w-full max-h-[255px] md:max-h-[450px] rounded-md shadow-md overflow-hidden"
              >
                {slide.link === "" ? (
                  <div className="w-full h-full min-h-[255] md:min-h-[450px] bg-lazyBg">
                    <img
                      className="w-full h-full"
                      src={slide.image}
                      alt={slide.link}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <Link to={slide.link} target="_blank">
                    <div className="w-full h-full min-h-[255] md:min-h-[450px] bg-lazyBg">
                      <img
                        className="w-full h-full"
                        src={slide.image}
                        alt={slide.link}
                        loading="lazy"
                      />
                    </div>
                  </Link>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Slider;
