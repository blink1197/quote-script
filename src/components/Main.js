import { useState, useEffect } from 'react';
import '../App.css';

function Hrquote(props) {
    return (
        <div className='Hrquote'>
            <img src="./images/quotes.png" alt="quote-start" style={{transform: props.type === 'start' ? 'rotate(180deg)': ''}} />
            <hr />
        </div>
    );
}

function Quote(props) {
  return (
      <div className='Quote'>
          <p>{props.quote.content}</p>
          <p>{props.quote.author}</p>
      </div>
  );
}

function Ctabuttons(props) {
  return (
      <div className='Ctabuttons'>
          <button onClick={props.selectNewQuote}>New Quote</button>
          <button>Copy Quote</button>
      </div>
  );
}


export default function Main() {
  const [currentQuote, setCurrentQuote] = useState({});
  const [quotes, setQuotes] = useState([]);
  const [recent, setRecentQuotes] = useState([]);

  const selectNewQuote = () => {
    if (quotes.length === 0) return; // If quotes array is empty, do nothing
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[randomIndex];
    setCurrentQuote(newQuote);
    setQuotes(prevQuotes => prevQuotes.filter((item, index) => index !== randomIndex));
    setRecentQuotes(prevQuotes => [...prevQuotes, newQuote]);
  }

  useEffect(() => {
    const fetchQuotes = async () => {
      const apiUrl = 'https://api.quotable.io/quotes/random?limit=50';
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data && data.length > 0) {
          if (!currentQuote) setCurrentQuote(data[0]);
          setQuotes(data.slice(1));
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };

    if (quotes.length === 0) {
      fetchQuotes();
      console.log('fetching quotes'); 
    }
  }, [quotes]); 

  return (
    <div className="Main">
      <h1>Quote Script</h1>
      <p>Endless inspiration, Discover your Quote of the Day!</p>
      <Hrquote type="start"/>
      <Quote quote={currentQuote} />
      <Hrquote type="end"/>
      <Ctabuttons selectNewQuote={selectNewQuote}/>
    </div>
  );
}
  
