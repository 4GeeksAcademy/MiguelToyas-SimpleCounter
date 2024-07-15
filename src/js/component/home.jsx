import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";


//create your first component
const Home = () => {

	const [Count, setCount] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setCount(prevCount => prevCount + 1);
		}, 1000);

		return () => clearInterval(interval);

	}, []);
	const formatCount = (Count) => {
		return Count.toString().padStart(6, '0');
	};

	return (
		<div className="text-center">
			<Container>
				<Row className='justify-content-center align-items-center h-100'>
					<Col xs='auto'>
						<h1 >{formatCount(Count)}</h1>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Home;
