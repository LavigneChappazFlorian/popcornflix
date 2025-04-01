import React from "react";
import "./errorPage.css"
import Button from "/src/components/ui/button/Button";

function ErrorPage() {
    return (
        <div className="ErrorPage">
            <img src="/error-404.png" alt="Error 404" />
            <Button link={"/"} text={"Retour à l'acceuil"} />
        </div>
    )
}

export default ErrorPage;