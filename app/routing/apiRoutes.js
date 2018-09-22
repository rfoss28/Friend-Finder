var path = require('path');
var friends = require("../data/friends.js");


module.exports = function(app) {
  
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });
    

    app.post("/api/friends", function(req, res) {

        var newFriend = req.body;
        var newFriendScores = newFriend.scores;
        
        // friend match object
      
          var matchName = "";
          var matchPhoto = "";
          var scoreDifference= 100;
      
    

        for (var i = 0; i < friends.length; i++) {
          var totalDifference = 0;
         
          for (var j = 0; j < friends[i].scores.length; j++) {
          
         
            totalDifference += Math.abs(parseInt(friends[i].scores[j]) -parseInt(newFriendScores[j]));
  
            if (totalDifference <= scoreDifference) {
              matchName = friends[i].name;
              matchPhoto = friends[i].photo;
              scoreDifference = totalDifference;
            }
          }
        }
        
       
        friends.push(newFriend);

        
        res.json({matchName: matchName, matchPhoto: matchPhoto});
    });
};