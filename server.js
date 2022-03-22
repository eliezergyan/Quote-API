const express = require('express');
const morgan = require('morgan');
const app = express();
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const quoteRouter = express.Router();
app.use('/api/quotes', quoteRouter);

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

quoteRouter.get('/random', (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.status(200).send({quote: randomQuote});
})

quoteRouter.get('/', (req, res, next) => {
  if(!req.query.person){
    res.status(200).send({quotes: quotes});
  } else {
    const person = req.query.person
    const quotesByPerson = quotes.filter(quote => quote.person == person);
    res.send({quotes: quotesByPerson}) 
  }
});

quoteRouter.post('/', (req, res, next) => {
  const quote = req.query.quote
  const person =  req.query.person
  const newQuote = {quote: quote, person: person}
  if(quote && person){
    quotes.push(newQuote)
    res.status(201).send({quote: newQuote});
  } else {
    res.status(400).send();
  }
})


app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})