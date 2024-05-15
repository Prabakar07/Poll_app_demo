const express = require('express'); 
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let poll={
    id: 1,
  question: "What's your favorite programming language?",
  options: [
    { option: 'JavaScript', votes: 0 },
    { option: 'Python', votes: 0 },
    { option: 'Java', votes: 0 },
    { option: 'C++', votes: 0 }
  ]
}
app.get('/poll',(req,res)=>{
    res.json(poll);
})

app.post("/poll/vote",(req,res)=>{
    const {option} = req.body;
    const pollOption = poll.options.find(opt =>opt.option==option);
    if(pollOption)
        {
            pollOption.votes +=1;
            res.json(poll);
        }
        else{
            res.status(400).json( { message:" ** Option not found ** " } );
        }

})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})