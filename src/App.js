import { useEffect, useState } from 'react';
import './App.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

import COLORS_ARRAY from './colorsArr';

let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState("If the wind will not serve, take to the oars.")
  const [author, setAuthor] = useState("Steve")
  const [randomNumber, setRandomNumber]= useState(0)

  const [quotesArr, setQouteArr] = useState(null);

  const [accentColor,setAccentColor] = useState('#282c34')  
  
  const fetchQuotes = async (url) =>{
    const response = await fetch(url);
    const parseJSON = await response.json();
    setQouteArr(parseJSON.quotes);
    console.log(parseJSON);
  }
  useEffect(() => {
   fetchQuotes(quoteDBUrl); 
  }, [quoteDBUrl])


  const getRandomQuote = () => {
    let randomInteger =Math.floor(quotesArr.length*Math.random());
    setRandomNumber(randomInteger)
    setAccentColor(COLORS_ARRAY[randomInteger])
    setQuote(quotesArr[randomInteger].quote)
    setAuthor(quotesArr[randomInteger].author)
  }
  // const OURquotesArr = [
  //   {quote:"If the wind will not serve, take to the oars.", author: "Steve Br"},
  //   {quote:"If you can dream it, you can achieve it.", author: "Mustafa"},
  //   {quote:"Every strike brings me closer to the next home run.",author: "Ahmad"},
  //   {quote:"You can never cross the ocean until you have the courage to lose sight of the shore.",author: "Christopher Columbus"},
  //   {quote:"You can’t use up creativity. The more you use, the more you have.",author: "Maya Angelou"},
  // ];

  return (
    <div className="App">
      <header className="App-header" style={{background:accentColor, color:accentColor}}>
      <div id="quote-box" style={{color:accentColor}}>
       <h1>Random Number: {randomNumber}</h1>
        <p id='text'>
        "{quote}"
        </p>
          <p id='author'>- {author}</p>
          <div className='button '>
          <a id='tweet-quote' style={{background:accentColor}} href={encodeURI(`https://www.twitter.com/intent/tweet?text=${quote} -${author}`)} target='_blanck'><FontAwesomeIcon icon={faXTwitter} /></a>
        
          <button id='new-quote' onClick={()=> getRandomQuote()} style={{color:accentColor}}>GENERATE</button>
          </div>
        </div>  
      </header>
      
    </div>
  );
}

export default App;
