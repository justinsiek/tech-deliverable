import { useState, useEffect } from "react";
import "./App.css";
import quotebookLogo from './assets/quotebook.jpg';


function App() {
	const [quotes, setQuotes] = useState([]);
	const [maxAge, setMaxAge] = useState(10000);

	useEffect(() => {
		fetch(`/api/quotes?max_age=${maxAge}`)
			.then((response) => response.json())
			.then((data) => setQuotes(data))
			.catch((error) => console.error("Error fetching quotes:", error));
	}, []);

	useEffect(() => {
		const quotesSlide = document.querySelector(".quotes-slide");
		if (quotesSlide && quotes.length > 0) {
			const copy = quotesSlide.cloneNode(true);
			document.querySelector(".messages").appendChild(copy);
		}
	}, [quotes]);

	return (
		<div className="container">
			<img src={quotebookLogo} alt="logo" />
			<form action="/api/quote" method="post">
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">Quote</label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit">Submit</button>
			</form>

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