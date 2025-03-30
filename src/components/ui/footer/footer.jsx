import SocialLink from "../socialLink/SocialLink";
import "./footer.css";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
    return (
        <div className="Footer">
            <div className="footer-left">
                <img src="/logo-popcornflix.png" alt="Logo PopCornFlix" />
            </div>
            <div className="footer-center">
                <nav>
                    <ul>
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/movies">Films</a></li>
                        <li><a href="#movies">Cinémas</a></li>
                    </ul>
                </nav>
            </div>
            <div className="footer-right">
                <SocialLink link={"https://facebook.com"} logo={<FaFacebookF />} />
                <SocialLink link={"https://instagram.com"} logo={<FaInstagram />} />
                <SocialLink link={"https://x.com"} logo={<FaTwitter />} />
            </div>
        </div>
    )
}

export default Footer;