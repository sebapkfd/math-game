import { Box, Button, Card, Flex, Text } from "@radix-ui/themes"
import { useState } from "react";
import pop from "./assets/pop-audio.mp3";

let colorOptions = [
  "red",
  "crimson",
  "purple",
  "indigo",
  "cyan",
  "jade",
  "bronze",
  "amber",
  "mint",
  "sky"
]

const Game = () => {
  const [sequence, setSequence] = useState([]);
  const [operations, setOperations] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [currentOperation, setCurrentOperation] = useState(null);
  // const [timeLeft, setTimeLeft] = useState(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [showResults, setShowResults] = useState(false)
  const [stage, setStage] = useState("menu") // menu | playing | answer | result
  let audio = new Audio(pop)

  const generateNumber = () => Math.floor(Math.random() * 9) + 1
  const generateOperation = () => {
    let randomNumber = Math.floor(Math.random() * 9) + 1
    let numberOperation = randomNumber % 2 === 0;
    return numberOperation ? "-" : "+";
  }
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const handleAnswer = () => {
    let sequenceTransformation = sequence.map((value, index) => {
      return operations[index] === "+" ? value : value * (-1);
    })    
    let sequenceResult = sequenceTransformation.reduce((ac, cv) => ac += cv)
    setResult(sequenceResult)
    setAnswer(pv => parseInt(pv))
    setShowResults(true)
    setStage("result")
    console.log(operations);

  }

  const clearGame = () => {
    setSequence([]);
    setOperations([]);
    setCurrentNumber(null);
    setAnswer("");
    setStage("menu");
    setResult("");
    setShowResults(false);
  }

  const round = async () => {
    await audio.play()
    let newNumber = generateNumber()
    let newOperation = generateOperation()
    setSequence((pv) => [...pv, newNumber])
    setOperations((pv) => [...pv, newOperation])
    setCurrentNumber(newNumber)
    setCurrentOperation(newOperation)
    await delay(500);
  }

  const startGame = async () => {
    clearGame()
    setStage("playing")
    for (let i = 0; i < 5; i++) {
      await round()
    }
    setStage("answer")
  }

  return (
    <Flex direction={'column'} align={'center'}>
      <Box>
        <h1>Counter</h1>
      </Box>
      <Box>
        <Button variant='classic' onClick={() => startGame()}>Start</Button>
        <Button variant='classic'>Stop</Button>

      </Box>
      <Box>
        <Card>
          <Flex direction={'row'} align={'center'} justify={'center'}>
            <div height={"400px"} width="300px" p={"30%"} className="number-card" >
              <Text weight={'bold'} color={colorOptions[currentNumber - 1]} className="number">
                {currentNumber ? currentOperation + currentNumber : ""}
              </Text>
            </div>
          </Flex>
        </Card>
      </Box>

      <Box>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleAnswer();
        }}>
          <label>Respuesta</label>
          <input
            name="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={stage !== "answer"}
          />
        </form>
      </Box>
      {(showResults) ? (
        <Box>
          <Box>Tu respuesta: {answer}</Box>
          <Box>Resultado: {result}</Box>
          <Box>{answer === result ? <p>Respuesta correcta</p> : <p>Respuesta incorrecta</p>}</Box>
        </Box>
      ) : null

      }
    </Flex >
  )

}

export default Game;