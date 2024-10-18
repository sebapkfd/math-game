import { useEffect, useState } from 'react'
import './App.css'
import { Box, Button, Card, Flex, Text } from '@radix-ui/themes';

function App() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [sequence, setSequence] = useState([])
  const [answer, setAnswer] = useState("");

  const generateNumber = () => Math.floor(Math.random() * 9) + 1

  const cleanNumbers = () => {
    setCurrentNumber(null);
    setSequence([]);
    setAnswer("")
  }

  const handleAnswer = () => {
    // add to check only numbers
    let total = sequence.reduce((acc, cv) => acc += cv)
    console.log(total, answer, total === parseInt(answer));

  }

  useEffect(() => {
    if (timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      setCurrentNumber(null)
      setTimeLeft(null)
      console.log(sequence);
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    let newNumber = generateNumber()
    setCurrentNumber(newNumber)
    setSequence(() => [...sequence, newNumber])
    const intervalId = setInterval(() => {

      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <Flex direction={'column'} align={'center'}>
      <Box>
        <h1>Counter</h1>
      </Box>
      <Box>
        <Button
          variant='classic'
          onClick={() => {
            cleanNumbers()
            setTimeLeft(10)
          }}>
          Start
        </Button>

      </Box>

      <Box>
        {timeLeft}
      </Box>
      <Box>
        <Card>
          <Flex direction={'row'} align={'center'} justify={'center'}>
            <Box height={"400px"} width="300px" p={"30%"}>
              <Text size={'9'} weight={'bold'} >
                {currentNumber ? currentNumber : ""}
              </Text>
            </Box>
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
            onChange={(e) => setAnswer(parseInt(e.target.value))}
            disabled={timeLeft > 0}
          />
        </form>
      </Box>
    </Flex >
  )
}

export default App
