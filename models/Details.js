const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
    monthlyIncome: { type: Number },
    age: Number,
    gender: String,
    isMarried: {type: Boolean,required: true},

    isSpouseWorking: Boolean,
    spouseMonthlyIncome: Number,

    ageSpouse: Number,
    numberOfKids: Number,
    kids: [{gender: String, age: Number}],

    disabilityPresent: Boolean,
    disability: { type: String, enum:[ENUMS.self, ENUMS.dependent]},

    isHavingCar:Boolean,
    isHavingCarInsurance: Boolean,

    isHavingHealthInsurance: Boolean, 

    isHavingLifeInsurance: Boolean,

    isHavingTermInsurance: Boolean,

    status: {type: Number, enum: [STATUS.RED, STATUS.AMBER, STATUS.GREEN], default: STATUS.AMBER}

}, { timestamps: true });

const User = mongoose.model('Details', detailSchemadetailSchemadetailSchema);

module.exports = User;
