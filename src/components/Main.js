import '../App.css';

function Hrquote(props) {
    return (
        <div className='Hrquote'>
            <img src="./images/quotes.png" alt="quote-start" style={{transform: props.type === 'start' ? 'rotate(180deg)': ''}} />
            <hr />
        </div>
    );
}

function Quote() {
  return (
      <div className='Quote'>
          <p>
          If there is such a thing as a good marriage, it is because it resembles friendship rather than love.
          </p>
          <p>
          -Michael De Montaigne
          </p>
      </div>
  );
}


function Ctabuttons() {
  return (
      <div className='Ctabuttons'>
          <button>New Quote</button>
          <button>Copy Quote</button>
      </div>
  );
}



export default function Main() {

    return (
      <div className="Main">
        <h1>Quote Script</h1>
        <p>Endless inspiration, Discover your Quote of the Day!</p>
        <Hrquote type="start"/>
        <Quote />
        <Hrquote type="end"/>
        <Ctabuttons />
      </div>
    );

}
  
