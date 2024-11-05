import { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [quotes, setQuotes] = useState([]);
	const [maxAge, setMaxAge] = useState(10000);

	useEffect(() => {
		fetch(`/api/quotes?max_age=${maxAge}`)
			.then((response) => response.json())
			.then((data) => setQuotes(data))
			.catch((error) => console.error("Error fetching quotes:", error));
	}, []);

	return (
		<>
			<form action="/api/quote" method="post">
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">Quote</label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit">Submit</button>
			</form>

			<div className="messages">
				{quotes.map((quote, index) => (
					<div key={index} className="quote">
						<p>{quote.message}</p>
						<p className="quote-details">
							- {quote.name} ({new Date(quote.time).toLocaleDateString()})
						</p>
					</div>
				))}
			</div>
		</>
	);
}

export default App;