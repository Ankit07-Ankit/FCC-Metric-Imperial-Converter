'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    
    console.log(req.query.input)
    let initNum = convertHandler.getNum(req.query.input);
    let initUnit = convertHandler.getUnit(req.query.input);

    if (!initNum && !initUnit ) {
      res.send('invalid number and unit');
    } else if (!initNum) {
      res.send('invalid number');
    } else if (!initUnit) {
      res.send('invalid unit');
    } else {

      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let initUnitLong = convertHandler.spellOutUnit(initUnit);
      let returnUnitLong = convertHandler.spellOutUnit(returnUnit);
      let string = convertHandler.getString(initNum, initUnitLong, returnNum, returnUnitLong);


      res.send({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum, 
        returnUnit: returnUnit, 
        string: string
      })

    };
    
  });
};
