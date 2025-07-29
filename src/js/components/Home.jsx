import React, { useState } from "react";

export default function Home() {
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [isXNext, setIsXNext] = useState(true);
	const [playerX, setPlayerX] = useState("");
	const [playerO, setPlayerO] = useState("");
	const [gameStarted, setGameStarted] = useState(false);
	const [winner, setWinner] = useState(null);

	function handleClick(index) {
		if (!gameStarted || squares[index] || winner) return;

		const newSquares = [...squares];
		newSquares[index] = isXNext ? "X" : "O";
		setSquares(newSquares);

		const potentialWinner = calculateWinner(newSquares);
		if (potentialWinner) {
			setWinner(potentialWinner);
		} else {
			setIsXNext(!isXNext);
		}
	}

	function startGame() {
		if (playerX.trim() === "" || playerO.trim() === "") {
			alert("Please enter both player names.");
			return;
		}
		setSquares(Array(9).fill(null));
		setWinner(null);
		setIsXNext(true);
		setGameStarted(true);
	}

	function resetGame() {
		setSquares(Array(9).fill(null));
		setIsXNext(true);
		setWinner(null);
		setGameStarted(false);
		setPlayerX("");
		setPlayerO("");
	}

	function getPlayerName(symbol) {
		return symbol === "X" ? playerX : playerO;
	}

	return (
		<div className="game-container">
			{!gameStarted && (
				<div className="setup">
					<input
						type="text"
						placeholder="Player X name"
						value={playerX}
						onChange={(e) => setPlayerX(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Player O name"
						value={playerO}
						onChange={(e) => setPlayerO(e.target.value)}
					/>
					<button className="start-button" onClick={startGame}>
						Start Game
					</button>
				</div>
			)}

			{gameStarted && (
				<>
					<div className="board">
						{squares.map((value, index) => (
							<button
								key={index}
								className="square"
								onClick={() => handleClick(index)}
							>
								{value}
							</button>
						))}
					</div>

					<div className="status">
						{winner
							? `Winner: ${getPlayerName(winner)}!`
							: squares.every(Boolean)
							? "It's a draw!"
							: `Next Player: ${isXNext ? playerX : playerO}`}
					</div>

					<button className="reset-button" onClick={resetGame}>
						Reset Game
					</button>
				</>
			)}
		</div>
	);
}

// ✅ WINNING LOGIC
function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let [a, b, c] of lines) {
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}
