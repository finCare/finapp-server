const { data } = require("jquery");

let ruleEngine = function (data) {
  let securityScore, liabilityScore, liquidityScore, wealthScore, totalScore, taxSaving80Camount = 0;
  let taxSavingScore = 100;
  let securityStatus,liabilityStatus,liquidityStatus,taxSavingStatus,wealthStatus,overallStatus = "";
  let statusArray = [securityStatus,liabilityStatus,liquidityStatus,taxSavingStatus,wealthStatus,overallStatus];
  let tax80Cinstruments = [isTutionApplicable, isHavingLifeInsurance,isHavingHomeLoan, isHavingFD];
  let tax80CinstrumentsBool = [true, true, true, true];
  let tax80Camounts = [amountTution, amountLifeInsurance, amountHomeLoan, amountFixedDeposit];
  let taxSuggestions = [];
  let resultArray = {};

  //Liabilty score

  let liabilityAmount = data.monthlyIncome * 0.3;
  if (data.monthlyExpense <= liabilityAmount) {
     liabilityScore = 100;
    if(data.isHavingHomeLoan){
      liabilityScore -= 30;
    }
    if(data.isHavingCarLoan){
      liabilityScore -= 20;
    }
    if(data.isHavingOtherLoan){
      liabilityScore -= 10;
    }
  }

  // Security score

  if(data.isHavingGeneralInsurance) {
    securityScore += 10;
    if(data.isHavingHealthInsurance) {
      securityScore += 30;
    }
    if(data.isHavingTermInsurance) {
      securityScore += 30;
    }
  } else {
    if(data.isHavingHealthInsurance) {
      securityScore += 35;
      taxSavingScore += 20;
    }
    if(data.isHavingTermInsurance) {
      securityScore += 35;
    }
  }
  if(data.isHavingCar) {
    if(data.isHavingCarInsurance) {
      securityScore += 20;
    } else {
      securityScore -= 10;
    }
  }
  if(data.isHavingLifeInsurance){
     securityScore += 10;
  }

  // Liquidity score

  let liquidityRequired = 6 *(data.monthlyIncome * 0.3);
  let liquidAmount = 0;
  if(data.amountCashDeposit !== 'undefined'){
    liquidAmount += data.amountCashDeposit;
  }
  if(data.amountSavingDeposit !== 'undefined'){
    liquidAmount += data.amountSavingDeposit;
  }
  if(data.isHavingFD && data.amountFixedDeposit !== 'undefined'){
    liquidAmount += data.amountFixedDeposit;
  }
  if(liquidAmount >= liquidityRequired){
    if(data.cashDeposit !== 'undefined') {
      liquidityScore += 30;
    }
    if((data.savingDeposit !== 'undefined') || (data.fixedDeposit !== 'undefined')) {
      liquidityScore += 70;
    }
  }

  // Tax saving score
 
  if(data.isHavingPPF || data.isHavingEPF){       //Checking if avails PPF or EPF
     if(data.isHavingPPF) {
     taxSaving80Camount += data.amountPPF;
     }
     if(data.isHavingEPF) {
      taxSaving80Camount += data.amountEPF;
     }    
  } else {
     taxSavingScore -= 20;
     taxSuggestions.push('Consider investing in EPF or PPF for retirement and avail the tax benefits.');
  }

  tax80Camounts.forEach((amount, index) => {
  if(amount !== 'undefined' || amount === 0) {
    taxSaving80Camount += amount;
    tax80CinstrumentsBool[index] = false;
      }
  });

   if(taxSaving80Camount < 150000) {                           // Check for ELSS, NSC, ULIP
    if(data.isHavingELSS || data.isHavingNSC || data.isHavingULIP) {
    if(data.isHavingELSS){
      taxSaving80Camount += amountELSS;
    }
    if(data.isHavingNSC){
      taxSaving80Camount +=  amountNSC;
    }
    if(data.isHavingULIP){
      taxSaving80Camount += amountULIP;
    }
  } else {
       taxSavingScore -= 10;
       taxSuggestions.push('You can opt for ELSS,ULIP or NSC to save on taxes.');
     }
  }
  
  if(taxSaving80Camount < 150000) {  
    if(data.age > 60) {                       //Senior Citizen Scheme
      if(data.isHavingSeniorCitizenScheme) {
      taxSaving80Camount += amountSeniorCitizenScheme;
    } else {
      taxSavingScore -= 5;
      taxSuggestions.push('As a senior citizen, you can avail the benefits under Senior citizen scheme 80C.');
     }
   }
  }
  
  if(taxSaving80Camount < 150000) {             
   if(data.kids.gender === 'female') {         // Sukanya Samridhi Yojna
     if(data.isHavingSSY){
       taxSaving80Camount += amountSSY;
     } else {
       taxSuggestions.push('You can opt for Sukanya Samridhi Yojna for your girl child to save taxes.');
     }
   }
  }

  if(taxSaving80Camount < 150000) {              // Check applicabilty of other 80C instruments
    tax80Cinstruments.forEach((instrument,index) => {
      if(data.instrument && tax80CinstrumentsBool[index]) {
      if(instrument === 'isTutionApplicable') {
        taxSuggestions.push(`You can avail tution fee exemption under section 80C to save taxes.`);
      }
      if(instrument === 'isHavingLifeInsurance') {
        taxSuggestions.push(`You can avail Life insurance exemption under section 80C to save taxes.`);
      }
      if(instrument === 'isHavingHomeLoan') {
        taxSuggestions.push(`You can avail Home loan exemption under section 80C to save taxes.`);
      }
      if(instrument === 'isHavingFD') {
        taxSuggestions.push(`You can avail Fixed deposit(5 years lock period) exemption under section 80C to save taxes.`);
      }
      }
    });
  }

  if(taxSaving80Camount > 150000) {                // if is having surlpus amount
    taxSuggestions.push(`You have a surplus investment of ${taxSaving80Camount - 150000} rupees above the limit of 1.5 Lacs in section 80C which can be invested for wealth generation.`);
  }

  if(!data.isHavingNPS) {                           // if is having NPS
    taxSavingScore -= 15;
    taxSuggestions.push('You can contribute in NPS Employee contribution under section 80CCD(1),80CCD(2),80CCD(1B) to save taxes upto 1.5 Lacs, 10% of Basic, 0.5 Lacs respectively');
  } else {
    if(data.amount80CCD1 !== 'undefined' && data.amount80CCD1 > 150000) {
      taxSuggestions.push(`You have a surplus investment of ${data.amount80CCD1 - 150000} rupees above the limit of 1.5 Lacs in section 80CCD(1) which can be invested for wealth generation.`);
    } 
    if(data.amount80CCD1b !== 'undefined' && data.amount80CCD1b > 50000) {
      taxSuggestions.push(`You have a surplus investment of ${data.amount80CCD1b - 50000} rupees above the limit of 0.5 Lacs in section 80CCD(1b) which can be invested for wealth generation.`);
    }
  }

 if(!data.isHavingHealthInsurance) {               //if is having Health insurance
   taxSavingScore -= 20;
   taxSuggestions.push("Please avail health insurance under section 80D to avail tax benefits of upto 25,000 and in case of senior citizens 50,000 annually.");
 } else {
   if(data.age > 60) {
    if(data.amountHealthInsurance !== 'undefined' && data.amountHealthInsurance > 50000) {
      taxSuggestions.push(`You have a surplus investment of ${data.amountHealthInsurance - 50000} rupees above the limit of 50000 annually in section 80D which can be invested for wealth generation.`);
    }
   } else {
    if(data.amountHealthInsurance !== 'undefined' && data.amountHealthInsurance > 25000) {
      taxSuggestions.push(`You have a surplus investment of ${data.amountHealthInsurance - 25000} rupees above the limit of 25000 annually in section 80D which can be invested for wealth generation.`);
    }
   }
 }

 if(data.isHavingDisabilty && (data.amountDisability === 'undefined' || data.amountDisability === 0)) {        // Disability check
     taxSuggestions.push('You can avail benefits under section 80DD(self) or 80U(dependent) ranging from 75,000 to 1.25 Lacs annually.');
   }

 if(data.isHavingEducationLoan && (data.amountEducationInterest  === 'undefined' || data.amountEducationInterest === 0)){    //Education loan interest
  taxSuggestions.push('You can avail benefits under section 80E for interest paid in education loan without any fiscal limits.');
 }
 if(data.isHavingHomeLoan && (data.amountHomeLoanInterest  === 'undefined' || data.amountHomeLoanInterest === 0)){         // Home loan interest
  taxSuggestions.push('You can avail benefits under section 80EE for interest paid in home loan upto an amount of 2 Lacs annually.');
 }
 if(data.amount80TTA  === 'undefined' || data.amount80TTA === 0) {             // Interest income on savings account
  taxSuggestions.push('You can avail benefits under section 80TTA for interest income on savings account upto an amount of 10,000 annually.');
 }
 if(data.age > 60 && (data.amount80TTB === 'undefined' || data.amount80TTB === 0)) {            // Interest income on deposits for senior citizens
  taxSuggestions.push('You can avail benefits under section 80TTB for interest income from deposits upto an amount of 50,000 annually.');
 }

  //Wealth score

  if(data.isHavingMutualFund || data.isHavingBond){
    wealthScore += 70;
  }
  if(data.isHavingStock){
    wealthScore += 30;
  }
   
  // Overall Score

  // if(data.age >= 20 && data.age <= 30 ){
  //   totalScore = 0.5*liabilityScore + 0.05*securityScore + 0.05*liquidityScore + 0.2*taxSavingScore + 0.2*wealthScore;
  // } else if(data.age >= 31 && data.age <= 40) {
  //   totalScore = 0.5*liabilityScore + 0.05*securityScore + 0.05*liquidityScore + 0.1*taxSavingScore + 0.3*wealthScore;
  // } else if(data.age >= 41 && data.age <= 50) {
  //   totalScore = 0.5*liabilityScore + 0.05*securityScore + 0.05*liquidityScore + 0.05*taxSavingScore + 0.35*wealthScore;
  // } else if(data.age >= 51) {
  //   totalScore = 0.5*liabilityScore + 0.05*securityScore + 0.1*liquidityScore + 0.05*taxSavingScore + 0.3*wealthScore;
  // }


  statusArray.forEach((score) => {
    if (score >= 75) { score = "Green"; }
    else if (score >= 60 && score < 75) { score = "Amber"; }
    else if (score < 60) { score = "Red"; }
  })

  // if (securityScore >= 75) securityStatus = "Green";
  // else if (securityScore >= 60 && securityScore < 75) securityStatus = "Amber";
  // else if (securityScore < 60) securityStatus = "Red";
  
  //Results
  resultArray = { user: data.user,
                  liabilityScore: liabilityScore, securityScore: securityScore, liquidityScore: liquidityScore,taxSavingScore: taxSavingScore, wealthScore: wealthScore, totalScore: totalScore, 
                  status: statusArray, taxSuggestions: taxSuggestions };
  return resultArray;
};

exports.ruleEngine = ruleEngine;
