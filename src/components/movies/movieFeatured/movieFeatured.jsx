import "./movieFeatured.css";
import { FaArrowAltCircleDown } from "react-icons/fa";

function MovieFeatured() {
    return (
        <div className="MovieFeatured">
            <img src="/movieFeatured/background-f1-poster.webp" alt="F1 Movie Poster" />
            <a href="#movies-header"><span><FaArrowAltCircleDown /></span></a>
        </div>
    )
}

export default MovieFeatured;