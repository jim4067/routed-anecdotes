import React, { useState } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import About from './components/About';
import Anecdote from './components/Anecdote';
import AnecdoteList from './components/AnecdoteList';
import CreateNew from './components/CreateNew';
import Footer from './components/Footer';
import Notification from './components/Notification';

const Menu = () => {
	const padding = {
		paddingRight: 5
	}

	return (
		<div>
			<Link to='/' style={padding}>anecdotes</Link>
			<Link to='/createnew' style={padding}>create new</Link>
			<Link to='/about' style={padding}>about</Link>
		</div>
	);
}

const App = () => {

	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurts, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: '1'
		},
		{
			content: 'Premature optimization is the root of all evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: '2'
		}
	]);

	const [notification, setNotification] = useState('');

	const addNew = (anec) => {
		//anecdote.id = (Math.random() * 10000).toFixed(0);

		setAnecdotes(anecdotes.concat(anec));
		setNotification(`a new anecdote ${anec.content} has been created!`);

		setTimeout(() => {
			setNotification('');
		}, 5000);

	}

	const anecdoteById = (id) =>
		anecdotes.find(a => a.id === id);

	const vote = (id) => {
		const anecdote = anecdoteById(id);

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1
		};

		setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));

	}

	const match = useRouteMatch('/anecdote/:id');
	const anecdote = match
		? anecdotes.find(anec => anec.id === match.params.id)
		: null;

	return (

		<div>
			<h1>Software anecdotes</h1>
			<Menu />
			
			<Notification message={notification} />

			<Switch >
				<Route path='/anecdote/:id' >
					<Anecdote anecdote={anecdote} />
				</Route>
				<Route path='/createnew' >
					<CreateNew newAnecdote={addNew} />
				</Route>
				<Route path='/about'>
					<About />
				</Route>

				<Route path='/'  >
					<AnecdoteList anecdotes={anecdotes} />
				</Route>
			</Switch>

			<Footer />
		</div>

	)
}

export default App;

//always keep the root at the bottom. i.e the front page/home of the website