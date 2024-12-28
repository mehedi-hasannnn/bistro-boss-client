import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css'

const Featured = () => {
    return (
        <div className='featured-item bg-fixed text-white pt-8 my-20'>
            <SectionTitle subHeading="Check It Out" heading="Featured Item">
            </SectionTitle>
            <div className='md:flex justify-center items-center bg-slate-500 bg-opacity-20 pb-20  pt-12 px-36'>
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>Aug 20, 2024</p>
                    <p className='uppercase'>Where can I get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, ducimus? Magni accusantium ut tenetur totam sequi cum voluptatem voluptates mollitia illum quae sapiente facilis, ad dolorum quod nemo repudiandae dolorem animi! Enim nobis doloremque ipsam vel. Debitis dolorem deserunt earum, nulla distinctio quos sunt in, officia iusto, ab atque. Sapiente.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-2">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;