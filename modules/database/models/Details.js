const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');
var ENUMS = require(__BASE__ + "config/enums");
var DISABILITY_TYPE = ENUMS.disabilityType;
var FINANCIAL_STATUS = ENUMS.financialStatus;
var GENDER = ENUMS.gender;

const DetailSchema = new mongoose.Schema({

    user: {type: String, ref:'User'},

    monthlyIncome: { type: Number },
    age: Number,
    gender: {type:String, enum:[GENDER.MALE, GENDER.FEMALE, GENDER.OTHER], required: true},
    isMarried: {type: Boolean,required: true},

    isSpouseWorking: Boolean,
    spouseMonthlyIncome: Number,

    ageSpouse: Number,
    numberOfKids: Number,
    kids: [{gender: String, age: Number}],

    disabilityPresent: {type: Boolean, default: false},
    disability: { type: String, enum:[DISABILITY_TYPE.SELF, DISABILITY_TYPE.DEPENDENT]},

    isHavingCar: { type: Boolean, default: false },
    isHavingCarInsurance: {type:Boolean, default: false},

    isHavingHealthInsurance: { type: Boolean, default: false },

    isHavingLifeInsurance: { type: Boolean, default: false },

    isHavingTermInsurance: { type: Boolean, default: false },

    status: {type: Number, enum: [FINANCIAL_STATUS.RED, FINANCIAL_STATUS.AMBER, FINANCIAL_STATUS.GREEN], default: FINANCIAL_STATUS.AMBER},

    created_time: {type: Date},

}, { timestamps: true });

const Details = mongoose.model('Details', DetailSchema);

module.exports = Details;
