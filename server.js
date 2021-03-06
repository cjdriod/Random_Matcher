const http = require('http')
var express = require('express');
var app = express()
const port = '3000'

const shufferArray = function(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


app.get('/', function (req, res) {
  console.log("---------------");
  console.time("matching");
  // TODO: Insert Player names here
  let playerList = ["Bryson","Cristina","Julianna","Hanna","Aubrey","Cindy","Jazmin"]
  playerList = shufferArray(playerList) // Remove it if you dont want make is shuffer
  let participantList = [...playerList]

  let result = playerList.map(currentPlayer => {
    let eligibleParticipants = participantList.filter(participant => participant !== currentPlayer)
    let selectedIndex = Math.floor(Math.random() * eligibleParticipants.length)

    let partner = eligibleParticipants[selectedIndex]

    // force last 2 choose the last person if last person havent matched
    if (eligibleParticipants.length === 2 && participantList.includes(playerList.slice(-1)[0])) {
      console.log('scenario hit')
      partner = playerList.slice(-1)[0]
    }
    participantList.splice(participantList.indexOf(partner), 1)

    return {
      sender: currentPlayer,  
      receiver: partner
    };  
  });
  res.send(result);
  console.table(result)
  console.timeEnd("matching");
});   

app.listen(port, function () {
  console.log(`App Lunched! serve at http://localhost:${port}`);
});