import React, { useState, useEffect, useRef } from "react";
import { Container, Button, Row, Col, ButtonGroup } from "react-bootstrap";

export default function Counter() {
  const [Count, setCount] = useState(0);
  const [isRunning, setisRunning] = useState(true);
  const [targetNumber, setTargetNumber] = useState(null);
  const [alertNumber, setAlertNumber] = useState(null); 
  const [countingDown, setCountingDown] = useState(false);
  const intervalRef = useRef(null);
  const [alertTriggered, setAlertTriggered] = useState(false);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCount(prevCount => {
          if (countingDown) {
            return prevCount - 1;
          }
          if (targetNumber !== null && prevCount >= targetNumber) {
            setCountingDown(true);
            return prevCount - 1;
          }
          if (alertNumber !== null && prevCount === alertNumber && !alertTriggered) {
            alert(`Has alcanzado el número ${alertNumber}`);
            setAlertTriggered(true);
          }
          return prevCount + 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, targetNumber, countingDown, alertNumber, alertTriggered]);

  const handleStop = () => {
    setisRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleResume = () => {
    setisRunning(true);
  };

  const handleReset = () => {
    setCount(0);
    setCountingDown(false);
    setAlertTriggered(false);
    clearInterval(intervalRef.current);
    setisRunning(true);
  };

  const handleTargetNumberChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setTargetNumber(isNaN(value) ? null : value);
  };

  const handleAlertNumberChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setAlertNumber(isNaN(value) ? null : value);
    setAlertTriggered(false); 
  };

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
            ))}
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-3">
          <ButtonGroup>
            <Button variant="danger" onClick={handleStop}>Parar</Button>
            <Button variant="success" onClick={handleResume}>Empezar</Button>
            <Button variant="warning" onClick={handleReset}>Reiniciar</Button>
          </ButtonGroup>
        </div>
        <div className="mt-4 flex-column">
          <label htmlFor="regresiveNumber" className="me-4">Ingrese un número para hacer la cuenta regresiva:</label>
          <input
            type="text"
            id="regresiveNumber"
            onChange={handleTargetNumberChange}
          />
        </div>
        <div className="mt-4 flex-column">
          <label htmlFor="alertNumber" className="me-4">Ingrese un número para generar una alerta:</label>
          <input
            type="text"
            id="alertNumber"
            onChange={handleAlertNumberChange}
          />
        </div>
      </Container>
    </div>
  );
}
