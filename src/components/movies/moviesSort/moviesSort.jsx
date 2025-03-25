import "./moviesSort.css";

function MoviesSort() {
    return (
        <div className="MoviesSort">
            <form method="GET">
                <div className="form-left">
                    <select name="movies-categories" id="movies-categories">
                        <option selected disabled>Catégorie(s)</option>
                        <option value="1">Valeur 1</option>
                        <option value="2">Valeur 2</option>
                        <option value="3">Valeur 3</option>
                    </select>
                    <select name="movies-sort" id="movies-sort">
                        <option selected disabled>Trier par</option>
                        <option value="1">Date de sortie</option>
                        <option value="2">Meilleurs notes</option>
                        <option value="3">Popularité</option>
                    </select>
                </div>
                <div className="form-right">
                    <input type="search" placeholder="Rechercher..." />
                </div>
            </form>
        </div>
    )
}

export default MoviesSort;