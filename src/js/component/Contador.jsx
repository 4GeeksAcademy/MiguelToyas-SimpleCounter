import React, { useState, useEffect, useRef } from "react";
import { Container, Button, Row, Col, ButtonGroup } from "react-bootstrap";


function Counter() {
  const [Count, setCount] = useState(0)
  const [isRunning, setisRunning] = useState(true)
  const intervalRef = useRef(null)


  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000)
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning])

  const handleStop = () => {
    setisRunning(false);
    clearInterval(intervalRef.current)
  }

  const handleResume = () => {
    setisRunning(true);

  }

  const handleReset = () => {
    setCount(0);
    clearInterval(intervalRef.current)
  }

  const formatCount = (Count) => {
    return Count.toString().padStart(6, '0');
  };
  const digits = formatCount(Count).split('');



  return (
    <div className="text-center">
      <Container className='text-center mt-4 container'>
        <Row className='justify-content-center'>
          <Col xs='d-flex justify-content-center align-items-center m-2 p-3 bg-dark w-auto'>
            <span className="fs-3 text-white mx-1"><i className="fa-sharp fa-regular fa-clock"></i></span>
            {digits.map((digit, index) => (
              <span
                key={index}
                className='mx-1 px-2 py-1 bg-dark text-white'
                style={{ fontSize: '2rem' }}
              >
                {digit}
              </span>
            ))

            }
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-3">
          <ButtonGroup>
            <Button variant="danger" onClick={handleStop}>Parar</Button>
            <Button variant="success" onClick={handleResume}>Empezar</Button>
            <Button variant="warning" onClick={handleReset}>Reiniciar</Button>
          </ButtonGroup>
        </div>
      </Container>
    </div>
  );
};


export default Counter
