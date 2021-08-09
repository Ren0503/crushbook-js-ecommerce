import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Figure } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Lottie from 'lottie-react-web';

import actionType from 'src/assets/animations/actionType.json';
import adventureType from 'src/assets/animations/adventureType.json';
import fantasyType from 'src/assets/animations/fantasyType.json';
import historyType from 'src/assets/animations/historyType.json';
import mysteryType from 'src/assets/animations/mysteryType.json';
import romanceType from 'src/assets/animations/romanceType.json';
import sciFicType from 'src/assets/animations/sciFicType.json';

const settings = {
    className: "center",
    centerMode: false,
    lazyLoad: true,
    infinite: true,
    slidesToShow: 4,
    autoplay: true,
    speed: 500,
    dots: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const Genres = () => {
    return (
        <Slider {...settings}>
            <Figure>
                <Lottie
                    options={{ animationData: actionType }}
                    height={100}
                />
                <Link to="/genres/epic">
                    <h6 className='text-center'>
                        EPIC
                    </h6>
                </Link>
            </Figure>
            <Figure>
                <Lottie
                    options={{ animationData: adventureType }}
                    height={100}
                />
                <Link to="/genres/adventure">
                    <h6 className='text-center'>
                        ADVENTURE
                    </h6>
                </Link>
            </Figure>
            <Figure>
                <Lottie
                    options={{ animationData: fantasyType }}
                    height={100}
                />
                <Link to="/genres/fantasy">
                    <h6 className='text-center'>
                        FANTASY
                    </h6>
                </Link>
            </Figure>
            <Figure>
                <Lottie
                    options={{ animationData: historyType }}
                    height={100}
                />
                <Link to="/genres/historical">
                    <h6 className='text-center'>
                        HISTORY
                    </h6>
                </Link>
            </Figure>
            <Figure>
                <Lottie
                    options={{ animationData: mysteryType }}
                    height={100}
                />
                <Link to="/genres/mystery">
                    <h6 className='text-center'>
                        MYSTERY
                    </h6>
                </Link>
            </Figure>
            <Figure>
                <Lottie
                    options={{ animationData: romanceType }}
                    height={100}
                />
                <Link to="/genres/romance">
                    <h6 className='text-center'>
                        ROMANCE
                    </h6>
                </Link>
            </Figure>
            <Figure>
                <Lottie
                    options={{ animationData: sciFicType }}
                    height={100}
                />
                <Link to="/genres/fiction">
                    <h6 className='text-center'>
                        SCI_FIC
                    </h6>
                </Link>
            </Figure>
        </Slider>
    );
}

export default Genres;
