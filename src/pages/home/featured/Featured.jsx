import React from 'react';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';
import featured from '../../../assets/home/featured.jpg';
import './feature.css';

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20 bg-cover bg-center relative ">
            {/* Parallax overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

            <div className="relative z-10">
                <SectionTitle subHeading="Check it out" heading="Featured item" />

                <div className="md:flex justify-center items-center gap-10 mt-8 md:mt-16 px-6 md:px-36 ">
                    {/* Image Section */}
                    <div className="md:w-1/2 ">
                        <img src={featured} alt="Featured" className="rounded-lg shadow-2xl" />
                    </div>

                    {/* Text Section */}
                    <div className="md:w-1/2 mt-8 md:mt-0 space-y-4">
                        <p className="text-lg text-gray-300">20 Dec 2024</p>
                        <p className="uppercase text-2xl font-bold">Where to get some?</p>
                        <p className="text-gray-300 leading-relaxed">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro autem perspiciatis harum ipsam excepturi ut a rerum assumenda! Velit ab eius assumenda pariatur ipsa voluptatibus doloremque totam itaque aspernatur aliquid.
                        </p>
                        <button className="btn btn-outline text-white border-0 border-b-4">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
