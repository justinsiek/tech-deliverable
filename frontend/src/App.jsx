import { useState, useEffect } from "react";
import "./App.css";
import quotebookLogo from './assets/quotebook.jpg';

function App() {
	const [quotes, setQuotes] = useState([]);
	const [maxAge, setMaxAge] = useState(100000);

	useEffect(() => {
		fetch(`/api/quotes?max_age=${maxAge}`)
			.then((response) => response.json())
			.then((data) => setQuotes(data))
			.catch((error) => console.error("Error fetching quotes:", error));
	}, []);

	useEffect(() => {
		const messagesContainers = document.querySelectorAll(".messages");
		
		messagesContainers.forEach(container => {
			const quotesSlide = container.querySelector(".quotes-slide");
			
			if (quotesSlide && quotes.length > 0) {
				const existingClones = container.querySelectorAll(".quotes-slide:not(:first-child)");
				existingClones.forEach(clone => clone.remove());
				
				const totalWidth = Array.from(quotesSlide.children)
					.reduce((sum, quote) => sum + quote.offsetWidth + 10, 0);
				
				const copy = quotesSlide.cloneNode(true);
				container.appendChild(copy);
				
				container.style.setProperty('--slide-width', `${totalWidth - 10}px`);
				//const duration = totalWidth / 50;
				//container.style.setProperty('--slide-duration', `${duration}s`);
			}
		});
	}, [quotes]);

	return (
		<div className="container">
			<img src={quotebookLogo} alt="logo" />
			{/*
			<form action="/api/quote" method="post">
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">Quote</label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit">Submit</button>
			</form>
			*/}

			<div className="messages">
				<div className="quotes-slide">
					{quotes.map((quote, index) => (
						<div key={index} className="quote">
							<p>{quote.message}</p>
							<p className="quote-details">
								- {quote.name} ({new Date(quote.time).toLocaleDateString()})
							</p>
						</div>
					))}
				</div>
			</div>
			<div className="messages">
				<div className="quotes-slide">
					{quotes.map((quote, index) => (
						<div key={index} className="quote">
							<p>{quote.message}</p>
							<p className="quote-details">
								- {quote.name} ({new Date(quote.time).toLocaleDateString()})
							</p>
						</div>
					))}
				</div>
			</div>
			<div className="messages">
				<div className="quotes-slide">
					{quotes.map((quote, index) => (
						<div key={index} className="quote">
							<p>{quote.message}</p>
							<p className="quote-details">
								- {quote.name} ({new Date(quote.time).toLocaleDateString()})
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;