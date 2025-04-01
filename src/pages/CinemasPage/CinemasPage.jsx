import "./cinemasPage.css";

import Header from "/src/components/ui/header/Header";
import Button from "/src/components/ui/button/Button";
import Footer from "/src/components/ui/footer/Footer";

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
                    <div class="card">
                        <h2>🎬 Les Cinémas</h2>
                        <p>Retrouvez tous les cinémas des Hauts-de-France et profitez du meilleur du 7ᵉ art.</p>
                        <div className="btn">
                            <Button link={"#map"} text={"Explorer"} />
                        </div>
                    </div>
                    <div class="card">
                        <h2>📍 Carte Interactive</h2>
                        <p>Localisez facilement un cinéma près de chez vous et consultez les séances en 1 clic.</p>
                        <div className="btn">
                            <Button link={"#map"} text={"Voir la carte"} />
                        </div>
                    </div>
                    <div class="card">
                        <h2>🎟️ Réservez votre place</h2>
                        <p>Accédez aux horaires, services et offres spéciales de votre cinéma préféré.</p>
                        <div className="btn">
                            <Button link={"#map"} text={"Réserver"} />
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default CinemasPage;