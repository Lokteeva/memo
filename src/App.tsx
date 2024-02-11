import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

interface ICard {
  src: string;
  matched: boolean;
  id?: string;
  handleChoice?: any;
}

const cardImages: ICard[] = [
  { src: '/img/1.jpg', matched: false },
  { src: '/img/2.jpg', matched: false },
  { src: '/img/3.jpg', matched: false },
  { src: '/img/4.jpg', matched: false },
  { src: '/img/5.jpg', matched: false },
  { src: '/img/6.jpg', matched: false },
  { src: '/img/7.jpg', matched: false },
  { src: '/img/8.jpg', matched: false },
  { src: '/img/9.jpg', matched: false },
  { src: '/img/10.jpg', matched: false },
  { src: '/img/11.jpg', matched: false },
  { src: '/img/12.jpg', matched: false },
  { src: '/img/13.jpg', matched: false },
  { src: '/img/14.jpg', matched: false },
  { src: '/img/15.jpg', matched: false },
  { src: '/img/16.jpg', matched: false },
  { src: '/img/17.jpg', matched: false },
  { src: '/img/18.jpg', matched: false },
  { src: '/img/19.jpg', matched: false },
  { src: '/img/20.jpg', matched: false },
];


function App() {
  const [cards, setCards] = useState<any>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<any>(null);
  const [choiceTwo, setChoiceTwo] = useState<any>(null);
  const [disabled, setDisabled] = useState<boolean>(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null)  
    setChoiceTwo(null)  
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card:ICard[]): any =>  {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
    setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards: any) => {
          return prevCards.map((card: any) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1500);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false)
  };

  useEffect(()=>{
    shuffleCards()
  }, [])

  return (
    <>
      <h1>Hello memo</h1>
      <button className='button' onClick={shuffleCards}>Новая игра</button>

      <div className="card-grid">
        {cards.map((card: any) => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Количество ходов: {turns}</p>
    </>
  );
}

export default App;
