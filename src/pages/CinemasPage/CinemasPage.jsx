import "./cinemasPage.css";

import Header from "/src/components/ui/header/Header";
import Footer from "/src/components/ui/footer/Footer";
import Cinemas from "/src/components/cinemas/Cinemas";

function CinemasPage() {
    return (
        <div className="CinemasPage">
            <Header />
            <main>
                <div id="map">
                    <iframe src="https://data.culture.gouv.fr/explore/embed/dataset/etablissements-cinematographiques/map/?refine.region_administrative=HAUTS%20DE%20FRANCE&location=9,50.16722,2.74109&static=false&datasetcard=false&scrollWheelZoom=false" frameborder="0"></iframe>
                </div>
                <h1>Les cinémas de notre région</h1>
                <div class="card-container">
                    <Cinemas title={"🎬 Les Cinéma"} description={"Retrouvez tous les cinémas des Hauts-de-France et profitez du meilleur du 7ᵉ art."} btnLink={"#map"} btnText={"Explorer"} />
                    <Cinemas title={"📍 Carte Interactive"} description={"Localisez facilement un cinéma près de chez vous et consultez les séances en 1 clic."} btnLink={"#map"} btnText={"Voir la carte"} />
                    <Cinemas title={"🎟️ Réservez votre place"} description={"Accédez aux horaires, services et offres spéciales de votre cinéma préféré."} btnLink={"#map"} btnText={"Réserver"} />
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default CinemasPage;