import { NavLink } from "react-router-dom";
import "./header.css";
import { FaRegHeart } from "react-icons/fa6";

function Header() {
    return (
        <div className="Header">
            <header>
                <div className="header-left">
                    <nav>
                        <ul>
                            <li><NavLink to="/">Accueil</NavLink></li>
                            <li><NavLink to="/movies">Films</NavLink></li>
                            <li><NavLink to="/cinemas">Cinémas</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className="header-right">
                    <a href="/liked"><span><FaRegHeart /></span></a>
                </div>
            </header >
        </div >
    )
}

export default Header;