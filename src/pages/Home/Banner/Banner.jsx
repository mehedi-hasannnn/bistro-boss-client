import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../assets/home/07.jpg';
import img2 from '../../../assets/home/08.jpg';
import img3 from '../../../assets/home/09.jpg';
import img4 from '../../../assets/home/10.jpg';
import img5 from '../../../assets/home/11.jpg';
import img6 from '../../../assets/home/12.jpg';
import img7 from '../../../assets/home/13.jpg';

const Banner = () => {
    return (
    <Carousel autoPlay={true} infiniteLoop={true} >
        <div>
            <img src={img1} />
        </div>
        <div>
            <img src={img2} />
        </div>
        <div>
            <img src={img3} />
        </div>
        <div>
            <img src={img4} />
        </div>
        <div>
            <img src={img5} />
        </div>
        <div>
            <img src={img6} />
        </div>
        <div>
            <img src={img7} />
        </div>
    </Carousel>
    );
};

export default Banner;