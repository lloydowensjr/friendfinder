
const path = require('path');
const friendData = require('../data/friends.js');
const questionData = require('../data/questions.js');

module.exports = function(app) {
  
  
  app.get('/api/friends', function (req, res) {
    res.json(friendData);
  })
  app.get('/api/questions', function (req, res) { 
    res.json(questionData);
  })
  
  app.post('/api/friends', function (req, res) {
    var newFriendScore = req.body.scores;
    var scoreDiffArr = [];
    var compare = 0;

    
    for (var i=0; i < friendData.length; i++) {
      var scoreDiff = 0;
      for (var j=0; j < newFriendScore.length; j++) {
        var friendDataScore = friendData[i].scores[j];
        scoreDiff += Math.abs(parseInt(newFriendScore[j]) - parseInt(friendDataScore));
      }
      
      scoreDiffArr.push(scoreDiff);
    };

    
    for (var i=0; i < scoreDiffArr.length; i++) {
      if (scoreDiffArr[i] <= scoreDiffArr[compare]) {
        compare = i; 
      }
    }

    console.log(scoreDiffArr);
    var myFriend = friendData[compare]; 
    console.log(myFriend.name);
    friendData.push(req.body);
    res.json(myFriend);
  });
};