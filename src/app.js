const express = require("express");
const app = express();

const flips = require("./data/flips-data");

const counts = require("./data/counts-data");


app.use("/counts/:countId", (req, res, next) => {
  const { countId } = req.params;
  const foundCount = counts[countId];
//if counts is 0 or falsy, move on to error handler sending not found message
  if (foundCount === undefined) {
    next(`Count id not found: ${countId}`);
  } else {
    //if not falsy return as a json object to client with key of data and value of the number of counts
    res.json({ data: foundCount }); 
  }
});

//returns data object with counts object nested
app.use("/counts", (req, res) => {
  res.json({ data: counts });
});


//define handler for flips/flipId path
app.use('/flips/:flipId', (req, res, next) => {
  //extract flip id variable from req.prarms
  const {flipId} = req.params;
  //search for a specific flip by id,
  const foundFlip = flips.find((flip) => flip.id === Number(flipId));
  // if a flip is found, send data from the found flip obj to the client as json
  if (foundFlip) {
    res.json({data: foundFlip});
    //otherwise we call next to move the req to the error handler
  } else {
    next(`Flip id not found: ${flipId}`)
  }
  })


app.use("/flips", (req, res) => {
  res.json({ data: flips });
});




// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  response.send(error);
});

module.exports = app;
