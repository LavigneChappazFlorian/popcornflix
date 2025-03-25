import "./socialLink.css";

function SocialLink({link, logo}) {
    return (
        <div className="SocialLink">
            <a href={link}>{logo}</a>
        </div>
    )
}

export default SocialLink;