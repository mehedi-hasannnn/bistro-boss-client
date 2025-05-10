import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Testimonial = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    useEffect(() => {
        fetch('https://bistro-boss-server-theta-two.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    return (
        <section className='my-20' data-aos="fade-up">
            <SectionTitle subHeading="What Our Client Say" heading="Testimonials" />

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper" data-aos="zoom-in-up">
                {
                    reviews.map(review => (
                        <SwiperSlide key={review._id}>
                            <div className='flex flex-col items-center mx-24 my-16'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p className='py-8'>{review.details}</p>
                                <h3 className="text-2xl text-orange-400">{review.name}</h3>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    );
};

export default Testimonial;
