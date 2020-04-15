import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get("/repositories").then((res) => {
			setRepositories(res.data);
		});
	}, []);

	async function handleRemoveRepository(id) {
		await api.delete(`/repositories/${id}`);
		const repos = repositories.filter((repo) => repo.id !== id);
		setRepositories(repos);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		api
			.post("/repositories", {
				title: "Desafio ReactJS",
				url: "https://github.com/kendi95/GoStack",
				techs: ["Node.js", "ReactJS", "React Native"],
			})
			.then((res) => {
				setRepositories([...repositories, res.data]);
			});
	}

	return (
		<div>
			<h2>Repositórios</h2>
			<br />
			<ul data-testid='repository-list'>
				{repositories.map((repo) => (
					<li key={repo.title}>
						<h3>{repo.title}</h3>
						<button onClick={() => handleRemoveRepository(repo.id)}>
							Remover
						</button>
					</li>
				))}
			</ul>

			<form onSubmit={handleSubmit}>
				<button type='submit'>Adicionar</button>
			</form>
		</div>
	);
}

export default App;
