import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../App.css";
function PollingComponent() {

    const [poll, setPoll] = useState({
        question: "",
        options: []
    });

    useEffect(() => {
        axios.get('http://localhost:5000/poll')
            .then(response => setPoll(response.data))
            .catch(error => console.error(" Error fetching poll data : ", error));
    }, []);

    const handleVote = (option) => {
        axios.post('http://localhost:5000/poll/vote', { option })
            .then(response => setPoll(response.data))
            .catch(error => console.error("Error on voting :", error));
    }

    if (!poll) {
        return (
            <div> Loading... Please wait..</div>
        )
    }

    const totalVotes = poll.options?.reduce((sum, option) => sum + option.votes, 0) || 0;

    return (
        <div className="App">

        <h1>{poll.question || 'Loading poll...'}</h1>

        <ul>{poll.options.map((opt, index) => {
            const percentage = totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;
            return (
              <li key={index} className="poll-option">
                <button
                  className="vote-button"
                  onClick={() => handleVote(opt.option)}
                  style={{ backgroundSize: `${percentage}% 100%` }}
                >
                  {opt.option} - {opt.votes} votes ({percentage.toFixed(2)}%)
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    )
}

export default PollingComponent;
