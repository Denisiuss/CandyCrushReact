import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import blueCandy from './images/blueCandy.png'
import greenCandy from './images/greenCandy.png'
import orangeCandy from './images/orangeCandy.png'
import purpleCandy from './images/purpleCandy.png'
import redCandy from './images/redCandy.png'
import yellowCandy from './images/yellowCandy.png'
import blank from './images/blank.png'
import scoreBoard from "./Components/scoreBoard/scoreBoard";
import { ButtonGroup, Button } from "@mui/material";

const width = 8;
const candyColors = [
  blueCandy,
  greenCandy, 
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy
]

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState<string[]>([]);
  const [squareBeingDragged, setSqaurebeingDragged] = useState<any>(null);
  const [squareBeingReplaced, setSqaurebeingReplaced] = useState<any>(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);


  const checkForColumnOfFour = () => {
    for (let i = 0; i<=39; i++){
      const columnOfFour = [i , i + width, i+width*2, i+width*3]
      const decidedColour = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if( columnOfFour.every(square => currentColorArrangement[square] === decidedColour && !isBlank)){
        setScoreDisplay((score) => scoreDisplay+4)
        columnOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }

  const checkForRowOfFour = () => {
    for (let i = 0; i<64; i++){
      const rowOfFour = [i , i + 1, i+2, i+3]
      const decidedColour = currentColorArrangement[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      const isBlank = currentColorArrangement[i] === blank

      if(notValid.includes(i)) continue

      if( rowOfFour.every(square => currentColorArrangement[square] === decidedColour && !isBlank)){
        setScoreDisplay((score) => scoreDisplay+4)
        rowOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }

  const checkForColumnOfThree = () => {
    for (let i = 0; i<=47; i++){
      const columnOfThree = [i , i + width, i+width*2]
      const decidedColour = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if( columnOfThree.every(square => currentColorArrangement[square] === decidedColour && !isBlank)){
        setScoreDisplay((score) => scoreDisplay+3)
        columnOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }

  const checkForRowOfThree = () => {
    for (let i = 0; i<64; i++){
      const rowOfThree = [i , i + 1, i+2]
      const decidedColour = currentColorArrangement[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      const isBlank = currentColorArrangement[i] === blank

      if(notValid.includes(i)) continue

      if( rowOfThree.every(square => currentColorArrangement[square] === decidedColour && !isBlank)){
        setScoreDisplay((score) => scoreDisplay+3)
        rowOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }

  const moveToSquareBelow = () => {
    for(let i = 0; i <= 55; i++){
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && currentColorArrangement[i] === blank){
        let randomNum = Math.floor(Math.random() * candyColors.length)
        currentColorArrangement[i] = candyColors[randomNum]
      }

      if((currentColorArrangement[i + width]) === blank){
        currentColorArrangement[i + width] = currentColorArrangement[i]
        currentColorArrangement[i] = blank
      }
    }
  }


  const dragStart = (e: any) => {
    setSqaurebeingDragged(e.target)
  }

  const dragDrop = (e: any) => {
    setSqaurebeingReplaced(e.target)
  }

  const dragEnd = () => {
    const squarebeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squarebeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    currentColorArrangement[squarebeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentColorArrangement[squarebeingDraggedId] = squareBeingReplaced.getAttribute('src')



    const validMoves = [
      squarebeingDraggedId - 1,
      squarebeingDraggedId - width,
      squarebeingDraggedId + 1,
      squarebeingDraggedId + width
    ]

    const validMove = validMoves.includes(squarebeingReplacedId)

    const isAColumnOfFour =  checkForColumnOfFour()
    const isRowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isRowOfThree = checkForRowOfThree()

    if (squarebeingReplacedId &&
      validMove &&
      (isAColumnOfFour || isRowOfFour || isAColumnOfThree || isRowOfThree)){
        setSqaurebeingDragged(null)
        setSqaurebeingReplaced(null)
      } else {
        currentColorArrangement[squarebeingReplacedId] = squareBeingReplaced.getAttribute('src')
        currentColorArrangement[squarebeingDraggedId] = squareBeingDragged.getAttribute('src')
        setCurrentColorArrangement([...currentColorArrangement])
      }
  }

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i< width * width; i++){
      const randomNumberFrom0to5 = Math.floor(Math.random() * candyColors.length);
      const randomColor = candyColors[randomNumberFrom0to5];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  }

  useEffect(() =>{
    createBoard();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      moveToSquareBelow()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 200)
    return () => clearInterval(timer)
  }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveToSquareBelow, currentColorArrangement])

 

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img 
          key={index}
          src={candyColor}
          alt={candyColor}
          data-id={index}
          draggable={true}
          onDragStart={dragStart}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={dragDrop}
          onDragEnd={dragEnd}
          />
        ))}
      </div>
        <div className="score">
          <Typography variant="h2" className="HeadLine">Score:</Typography><br/>
          <Typography variant="h4" className="HeadLine">{scoreBoard(scoreDisplay)}</Typography>
          <ButtonGroup variant="contained" fullWidth>
              <Button onClick={()=>{
                createBoard();
                setScoreDisplay(0);
              }} color="secondary">Start again</Button>                    
          </ButtonGroup><br />
        </div>
    </div>
  );
}

export default App;
