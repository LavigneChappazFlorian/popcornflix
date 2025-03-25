import "./header.css";
import { FaRegUser } from "react-icons/fa6";

function Header() {
    return (
        <div className="Header">
            <header>
                <div className="header-left">
                    <nav>
                        <ul>
                            <li><a href="/">Accueil</a></li>
                            <li><a href="/">Films</a></li>
                            <li><a href="/">Cinémas</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="header-right">
                    <a href="/account"><span><FaRegUser /></span></a>
                </div>
            </header >
        </div >
    )
}

export default Header;