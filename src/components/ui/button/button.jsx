import "./button.css";

function Button({link, onclick, text}) {
    return (
        <div className="Button">
            <a href={link} onClick={onclick}>{text}</a>
        </div>
    )
}

export default Button;