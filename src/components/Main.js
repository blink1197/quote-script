import { useState, useEffect } from 'react';
import Socials from './Socials';
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
  let content = '';
  if (props.quote.content) {
    content = (
      <div>
        <p>{props.quote.content}</p>
        <p>- {props.quote.author}</p>
      </div>
    );
  } else {
    content = (
      <div>
        <p>Click the button below to generate a random quote.</p>
      </div>
    );
  }
  return (
    <div className='Quote'>
      {content}
    </div>
  );
}

function Ctabuttons(props) {
  return (
      <div className='Ctabuttons'>
          <button onClick={props.selectNewQuote}>New Quote</button>
          <button onClick={props.copyCurrentQuote}>Copy Quote</button>
      </div>
  );
}

function RecentQuotes(props) {
  let quotes = [];

  if (props.recentQuotes.length > 5) {
    quotes = props.recentQuotes.slice(-5);
  } else {
    quotes = props.recentQuotes;
  }

  const recentQuotesList = quotes.map(quote => {
    if (quote._id) return <p key={quote._id}>{quote.content} - <em>{quote.author}</em></p>
  });

  return (
    <div className="RecentQuotes">
      <h2>Recent:</h2>
      {recentQuotesList}
    </div>
  );

}


export default function Main() {
  const [currentQuote, setCurrentQuote] = useState({});
  const [quotes, setQuotes] = useState([]);
  const [recentQuotes, setRecentQuotes] = useState([]);

  const selectNewQuote = () => {
    if (quotes.length === 0) return; // If quotes array is empty, do nothing
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[randomIndex];
    setCurrentQuote(newQuote);
    setQuotes(prevQuotes => prevQuotes.filter((item, index) => index !== randomIndex));
    setRecentQuotes(prevQuotes => [...prevQuotes, currentQuote]);
  }

  const copyCurrentQuote = () => {
    if (!navigator.clipboard) {
      console.log('Clipboard API not available');
      return;
    }
    navigator.clipboard.writeText(`${currentQuote.content} - ${currentQuote.author}`)
      .then(() => {
        alert('Quote copied to clipboard successfully!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
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
    }
  }, [quotes]); 


  return (
    <div className="Main">
      <h1>Quote Script</h1>
      <p>Endless inspiration, Discover your Quote of the Day!</p>
      <Hrquote type="start"/>
      <Quote quote={currentQuote} />
      <Hrquote type="end"/>
      <Ctabuttons selectNewQuote={selectNewQuote} copyCurrentQuote={copyCurrentQuote}/>
      <Socials />
      <RecentQuotes recentQuotes={recentQuotes}/>
    </div>
  );
}
  
