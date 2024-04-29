import '../App.css';


export default function Socials(props) {
    let quote="";
    if (props.quote.content) quote = `${props.quote.content} - ${props.quote.author}`; 
    
    const shareToFacebook = () => {
        const url = 'https://quote-script.com';
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&display=popup&quote=${encodeURIComponent(quote)}`;
        window.open(facebookUrl, '_blank');
    }

    const tweet = () => {
        const twitterUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(quote);
        window.open(twitterUrl, '_blank');
    }

    const instagram = () => {
        const instagramUrl = "https://instagram.com";
        window.open(instagramUrl, '_blank');
    }

    const whatsAppMessage = () => {
        const whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(quote);
        window.open(whatsappUrl, '_blank');
    }

    return (
      <div className="Socials">
        <img  
            src="./images/facebook-logo.png"
            alt="facebook-logo"
            onClick={shareToFacebook}
        />
        <img  
            src="./images/x-logo.png"
            alt="x-logo"
            onClick={tweet}
        />
        <img  
            src="./images/instagram-logo.png"
            alt="instagram-logo"
            onClick={instagram}
        />
        <img  
            src="./images/whats-app-logo.png"
            alt="whatsapp-logo"
            onClick={whatsAppMessage}
        />
      </div>
    );

}
  
