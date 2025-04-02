import React from 'react';
import "./cinemas.css";
import Button from "/src/components/ui/button/Button";

function Cinemas({ btnLink, btnText, description, title }) {
    return (
        <div className='Card'>
            <h2>{title}</h2>
            <p>{description}</p>
            <div className="btn">
                <Button link={btnLink} text={btnText} />
            </div>
        </div>
    )
}

export default Cinemas;
