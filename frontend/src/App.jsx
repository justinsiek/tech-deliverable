import { useState, useEffect } from "react";
import "./App.css";
import quotebookLogo from './assets/quotebook.jpg';

function App() {
	const [quotes, setQuotes] = useState([]);
	const [maxAge, setMaxAge] = useState(36500);
	const [showForm, setShowForm] = useState(false);

	const timeFilters = [
		{ label: 'Last Week', days: 7 },
		{ label: 'Last Month', days: 30 },
		{ label: 'Last Year', days: 365 },
		{ label: 'All Time', days: 36500 },
	];

	useEffect(() => {
		fetch(`/api/quotes?max_age=${maxAge}`)
			.then((response) => response.json())
			.then((data) => setQuotes(data))
			.catch((error) => console.error("Error fetching quotes:", error));
	}, [maxAge]);

	const splitQuotes = (quotes) => {
		if (quotes.length <= 7) {
			return [quotes];
		} else if (quotes.length <= 15) {
			const half = Math.ceil(quotes.length / 2);
			return [
				quotes.slice(0, half),
				quotes.slice(half)
			];
		} else {
			const third = Math.ceil(quotes.length / 3);
			return [
				quotes.slice(0, third),
				quotes.slice(third, third * 2),
				quotes.slice(third * 2)
			];
		}
	};

	useEffect(() => {
		const messagesContainers = document.querySelectorAll(".messages");
		const quotesGroups = splitQuotes(quotes);
		
		messagesContainers.forEach(container => {
			const slides = container.querySelectorAll(".quotes-slide");
			slides.forEach(slide => {
				slide.remove();
			});
		});

		messagesContainers.forEach((container, index) => {
			// Create new quotes-slide
			const quotesSlide = document.createElement("div");
			quotesSlide.className = "quotes-slide";
			
			if (quotesGroups[index]?.length > 0) {
				quotesGroups[index].forEach((quote, quoteIndex) => {
					const quoteDiv = document.createElement("div");
					quoteDiv.className = "quote";
					quoteDiv.innerHTML = `
						<p>"${quote.message}"</p>
						<p class="quote-details">
							- ${quote.name} (${new Date(quote.time).toLocaleDateString()})
						</p>
					`;
					quotesSlide.appendChild(quoteDiv);
				});

				container.appendChild(quotesSlide);

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
				<div className="logo-container">
					<img src={quotebookLogo} alt="logo" />
					<h1>HackUCI Quotebook</h1>
				</div>
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

			<div className="carousels-container">
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

			<footer className="footer">
				<div className="filter-container">
					{timeFilters.map((filter) => (
						<button
							key={filter.days}
							onClick={() => setMaxAge(filter.days)}
							className={maxAge === filter.days ? 'active' : ''}
						>
							{filter.label}
						</button>
					))}
				</div>
			</footer>
		</div>
	);
}

export default App;