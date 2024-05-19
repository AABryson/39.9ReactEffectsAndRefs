import React, {useState, useEffect} from 'react'
import Card from './Card.jsx'
import axios from 'axios'
//#define the Deck component
function Deck(){

    const [deck, setDeck] = useState(null);
    //#'deck' is state variable set to null
    const [drawnCard, setdrawnCard] = useState([]);
    //'drawn' is state variable set to empty array
    const [shuffling, setShuffling] = useState(false);
//#call api to shuffle the deck and update deck state; runs after first time component is rendered and not afterwards
    useEffect(function getDeckFromApi() {
//object returned from new shuffle:{ "success": true, "deck_id": "3p40paa87x90","shuffled": true, "remaining": 52
        async function getDeck() {
            let result = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle');
            //#note: need data property
            let data = result.data
            
            setDeck(data)
        }
        console.log(deck)
        //call async function
        getDeck(); 
      },  []);
    
//draw card and change state of drawnCard
    async function drawCard() {
        {/*draw a card froom the deck using the deck_id stored in deck*/}
        let result = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/`)
//first three keys from the returned object {"success": true, "deck_id": "kxozasf3edqu", "cards": [
//last key in object is 'remaning'; keeps count of how many cards are left 
        try {
            if(result.data.remaining === 0) throw new Error("There are no cards remaining");
            let card = result.data.cards[0];
            console.log(card.image)
            //#######'draw' instead of 'd' didn't seem to work
            setdrawnCard(d => [
                d,
                {
                    //#############code
                id: card.code,
                name: card.suit + ' ' + card.value,
                image: card.image
                }
            ])
            } catch(err) {
                //##########throw?
                alert(err)
            }
        console.log('drawn card')
    }

    async function shuffle() {
        setShuffling(true)
        //######try?
        //##they don't assign to varaiable
            await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle`)
            // setDeck(result.data)
            setdrawnCard([])
            setShuffling(false)
    
    }

//########################see theirs
    function drawButton(){
        //###############must be outside return
        console.log('draw');
        console.log(drawnCard)
//####################be sure to return
        return (
            
            // <button onClick={drawCard} disabled={shuffling}>Draw</button>
            <button onClick={drawCard}>Draw</button>
            
        )
    }

    function shuffleButton() {
        return (
        // <button onClick={shuffle} disabled={shuffling}>shuffle</button>
        <button onClick={shuffle}>shuffle</button>
        );
    }
    return (
        <main>
            {/* //################call function */}
                {drawButton()}
                {shuffleButton()}
            <div> 
                {drawnCard.map(c => {
                    
                    //keep inline
                    //must have return
                    return <Card key={c.id} name={c.name} image={c.image} />

                })
            }
            </div>
        
        </main>
    )


}

export default Deck