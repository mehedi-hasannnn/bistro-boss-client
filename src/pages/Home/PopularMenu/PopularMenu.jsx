import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../Hooks/useMenu';

const PopularMenu = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <section className='mb-12' data-aos="fade-up">
            <SectionTitle heading="From Our Menu" subHeading="Popular Items" />

            <div className='grid md:grid-cols-2 gap-10'>
                {
                    popular.map(item => (
                        <div key={item._id} data-aos="zoom-in">
                            <MenuItem item={item} />
                        </div>
                    ))
                }
            </div>

            <div className='flex justify-center mt-4' data-aos="fade-up">
                <button className="btn btn-outline border-0 border-b-4 mt-2 justify-center">
                    View Full Menu
                </button>
            </div>
        </section>
    );
};

export default PopularMenu;
