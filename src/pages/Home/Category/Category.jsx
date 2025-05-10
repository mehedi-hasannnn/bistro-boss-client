import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    return (
        <section data-aos="fade-up">
            <SectionTitle 
                subHeading={"From 11:00am to 10:00pm"}
                heading={"Order Online"}>
            </SectionTitle>

            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={false}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-24"
            >
                <SwiperSlide data-aos="zoom-in">
                    <img src={slide1} alt="" />
                    <h3 className="text-4xl uppercase text-center -mt-16 text-white font-bold">Salads</h3>
                </SwiperSlide>
                <SwiperSlide data-aos="zoom-in">
                    <img src={slide2} alt="" />
                    <h3 className="text-4xl uppercase text-center -mt-16 text-white font-bold">Pizzas</h3>
                </SwiperSlide>
                <SwiperSlide data-aos="zoom-in">
                    <img src={slide3} alt="" />
                    <h3 className="text-4xl uppercase text-center -mt-16 text-white font-bold">Soups</h3>
                </SwiperSlide>
                <SwiperSlide data-aos="zoom-in">
                    <img src={slide4} alt="" />
                    <h3 className="text-4xl uppercase text-center -mt-16 text-white font-bold">Desserts</h3>
                </SwiperSlide>
                <SwiperSlide data-aos="zoom-in">
                    <img src={slide5} alt="" />
                    <h3 className="text-4xl uppercase text-center -mt-16 text-white font-bold">Salads</h3>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Category;
