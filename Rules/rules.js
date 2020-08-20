let ruleEngine = function(data) {
  var score = 0;
  var status = "";
  var resultArray = {};
  if (data.isHavingHealthInsurance) {
    score += 40;
  }
  if (data.isHavingTermInsurance) {
    score += 35;
  }
  if (data.isHavingCar) {
    if (data.isHavingCarInsurance) {
      score += 10;
    } else {
      score -= 10;
    }
  }
  if (data.isHavingLifeInsurance) {
    score += 10;
  }
  if (score >= 75) status = "Green";
  else if (score >= 60 && score < 75) status = "Amber";
  else if (score < 60) status = "Red";
  resultArray = { user: data.user, score: score, status: status };
  return resultArray;
};

exports.ruleEngine = ruleEngine;
