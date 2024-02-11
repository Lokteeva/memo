import { ReactNode } from 'react';

interface ISingleCard {
  card: {
    src: string;
    matched: boolean;
  };
  handleChoice(): void;
  flipped: boolean;
  disabled: boolean;
}
function SingleCard({ card, handleChoice, flipped, disabled }: ISingleCard) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img className="front" src={card.src} alt="card-front" />
        <img src="/img/fon.jpg" className="back" alt="card-back" onClick={handleClick} />
      </div>
    </div>
  );
}

export default SingleCard;
