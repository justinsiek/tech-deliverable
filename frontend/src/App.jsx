import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Quotes from "./components/Quotes";
import Footer from "./components/Footer";

function App() {
	const [quotes, setQuotes] = useState([]);
	const [maxAge, setMaxAge] = useState(36500);
	const [showForm, setShowForm] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

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
			.catch(alert("error fetching quotes :( try again later"));
	}, [maxAge]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		
		try {
			const response = await fetch('/api/quote', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				fetch(`/api/quotes?max_age=${maxAge}`)
					.then((response) => response.json())
					.then((data) => setQuotes(data));
				
				e.target.reset();
				setShowForm(false);
			}
		} catch (error) {
			alert("error submitting quote :( try again later");
		}
	};

	const handleCloseForm = () => {
		setIsClosing(true);
		setTimeout(() => {
			setShowForm(false);
			setIsClosing(false);
		}, 750);
	};

	return (
		<div className="container">
			<Header 
				showForm={showForm}
				setShowForm={setShowForm}
				handleSubmit={handleSubmit}
				isClosing={isClosing}
				handleCloseForm={handleCloseForm}
			/>
			<Quotes quotes={quotes} />
			<Footer maxAge={maxAge} setMaxAge={setMaxAge} timeFilters={timeFilters} />
		</div>
	);
}

export default App;