let ruleEngine = function(data) {
    var score = 0;
    var status = "";
    var resultArray = {}
      if(data[0].isHavingHealthInsurance){
          score+= 40
      }
      if(data[0].isHavingTermInsurance){
          score+= 35
      }
      if(data[0].isHavingCar) {
          if(data[0].isHavingCarInsurance){
              score+=10
          }
          else{
              score-=10
          }
      }
      if(data[0].isHavingLifeInsurance){
          score+=10
      }
      if(score >= 75)
          status = "Green"
      else if(score >= 60 && score<75) 
          status = "Amber"
       else if(score < 60)
          status = "Red"
      resultArray = { user: data[0].user, score: score, status: status}
      return resultArray
}

exports.ruleEngine = ruleEngine