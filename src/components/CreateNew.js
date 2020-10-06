import React from 'react';
import { useField } from '../hooks/index';

const CreateNew = ({ newAnecdote }) => {
    /*
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')
    */
    const content = useField("text");
    const author = useField("text");
    const info = useField("text");

    const handleSubmit = (event) => {
        event.preventDefault();

        const id = (Math.random() * 10000).toFixed(0);

        newAnecdote({
            id: id,
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
    };

    return (
        <div>
            <h2>create a new anecdote</h2>

            <form onSubmit={handleSubmit}>
                content
				<input {...content} />
                <br />
				author
				<input {...author} />
                <br />
				url for more info
				<input {...info} />
                <br />
                <button type="submit">create</button>
            </form>

        </div>
    );
};

export default CreateNew;