import { useState, useEffect } from "react";
import "./App.css";
import quotebookLogo from './assets/quotebook.jpg';

function App() {
	const [quotes, setQuotes] = useState([]);
	const [maxAge, setMaxAge] = useState(100000);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		fetch(`/api/quotes?max_age=${maxAge}`)
			.then((response) => response.json())
			.then((data) => setQuotes(data))
			.catch((error) => console.error("Error fetching quotes:", error));
	}, [maxAge]);

	const splitQuotes = (quotes) => {
		const third = Math.ceil(quotes.length / 3);
		return [
			quotes.slice(0, third),
			quotes.slice(third, third * 2),
			quotes.slice(third * 2)
		];
	};

	useEffect(() => {
		const messagesContainers = document.querySelectorAll(".messages");
		const quotesGroups = splitQuotes(quotes);
		
		messagesContainers.forEach((container, index) => {
			const quotesSlide = container.querySelector(".quotes-slide");
			
			if (quotesSlide && quotesGroups[index].length > 0) {
				const existingClones = container.querySelectorAll(".quotes-slide:not(:first-child)");
				existingClones.forEach(clone => clone.remove());

				setTimeout(() => {
					const totalWidth = Array.from(quotesSlide.children)
						.reduce((sum, quote) => sum + quote.offsetWidth + 10, 0);
					
					const copy = quotesSlide.cloneNode(true);
					container.appendChild(copy);

					container.style.setProperty('--slide-width', `${totalWidth}px`);
					const duration = totalWidth / 80;
					container.style.setProperty('--slide-duration', `${duration}s`);
				}, 0);
			}
		});
	}, [quotes]);

	return (
		<div className="container">
			<nav className="nav">
				<img src={quotebookLogo} alt="logo" />
				<div className="add-quote-container">
					{!showForm && <button onClick={() => setShowForm(!showForm)}>Add A Quote</button>}
					{showForm && (
						<form action="/api/quote" method="post">
							<div className="inputs-container">
								<input placeholder="Name..." type="text" name="name" id="input-name" required />
								<input placeholder="Quote..." type="text" name="message" id="input-message" required />
							</div>
							<button type="submit">Submit</button>
						</form>
					)}
				</div>
			</nav>

			{splitQuotes(quotes).map((quoteGroup, groupIndex) => (
				<div key={groupIndex} className="messages">
					<div className="quotes-slide">
						{quoteGroup.map((quote, index) => (
							<div key={`${groupIndex}-${index}`} className="quote">
								<p>"{quote.message}"</p>
								<p className="quote-details">
									- {quote.name} ({new Date(quote.time).toLocaleDateString()})
								</p>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export default App;