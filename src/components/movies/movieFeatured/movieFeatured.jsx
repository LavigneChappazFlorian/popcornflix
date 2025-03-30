import "./movieFeatured.css";
// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';
// import styles bundle
import 'swiper/css/bundle';
import { FaArrowAltCircleDown } from "react-icons/fa";

function MovieFeatured() {
    // init Swiper:
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 4000,
        },

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

    });

    return (
        <div className="MovieFeatured">
            <div class="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><img src="/movieFeatured/captain-america-poster.jpg" alt="Captain America - Brave new world Movie Poster" /></div>
                    <div class="swiper-slide"><img src="/movieFeatured/f1-poster.webp" alt="F1 Movie Poster" /></div>
                    <div class="swiper-slide"><img src="/movieFeatured/small-things-like-these-poster.jpg" alt="Tu ne mentiras point Movie Poster" /></div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <a href="#movies-header"><span><FaArrowAltCircleDown /></span></a>
        </div>
    )
}

export default MovieFeatured;