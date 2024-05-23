import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
   const [input, setInput] = useState('');
   const [responses, setResponses] = useState([]);
   const [error, setError] = useState(null);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      try {
         const res = await axios.post('http://localhost:3000/chatgpt', { input });
         setResponses([...responses, { input, response: res.data.response }]);
         setInput('');
      } catch (err) {
         console.error(err);
         setError('Error: ' + err.message);
      }
   };

   return (
      <div className="App">
         <header className="App-header">
            <h1>ChatGPT by SAMAD</h1>
            <form onSubmit={handleSubmit}>
               <label htmlFor='user-input'>
                  Enter your prompt here:
               </label>
               <input
                  id='user-input'
                  type='text'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  required
               />
               <button type='submit'>Submit</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div id='responses'>
               <h2>Responses</h2>
               {responses.map((item, index) => (
                  <div key={index}>
                     <p><strong>Input:</strong> {item.input}</p>
                     <p><strong>Response:</strong> {item.response}</p>
                  </div>
               ))}
            </div>
         </header>
      </div>
   );
}

export default App;
