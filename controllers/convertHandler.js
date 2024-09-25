const { assert } = require("chai");
const { parse } = require("dotenv");

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let matchedArray = input.match(/[^a-zA-Z]+/g);
    if (matchedArray == null) {
      result = 1;
      return result;
    } else if (!matchedArray) {
      return false;
    } else if ( matchedArray[0].split('/').length <= 2 ) {
      result = eval( matchedArray[0] );
      return result;
    } else {
      return false
    }
  };
  
  this.getUnit = function(input) {
    let result;
    result = input.match(/[a-zA-Z]+/g);
    if (result == null) {
      return false
    } else if (
      result.toString().toUpperCase() != 'GAL' && 
      result.toString().toUpperCase() != 'L' && 
      result.toString().toUpperCase() != 'LBS' && 
      result.toString().toUpperCase() != 'KG' && 
      result.toString().toUpperCase() != 'MI' && 
      result.toString().toUpperCase() != 'KM'
      ) 
    {
      return false
    } else {
      result = input.match(/[a-zA-Z]+/g).toString();
      switch (true) {
        case result.toUpperCase() == 'GAL':
          result = 'gal';
          break;
        case result.toUpperCase() == 'L':
          result = 'L';
          break;
        case result.toUpperCase() == 'LBS':
          result = 'lbs';
          break;
        case result.toUpperCase() == 'KG':
          result = 'kg';
          break;
        case result.toUpperCase() == 'MI':
          result = 'mi';
          break;
        case result.toUpperCase() == 'KM':
          result = 'km';
          break; 
      }
      return result;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (true) {
      case initUnit.toUpperCase() == 'GAL':
        result = 'L';
        break;
      case initUnit.toUpperCase() == 'L':
        result = 'gal';
        break;
      case initUnit.toUpperCase() == 'LBS':
        result = 'kg';
        break;
      case initUnit.toUpperCase() == 'KG':
        result = 'lbs';
        break;
      case initUnit.toUpperCase() == 'MI':
        result = 'km';
        break;
      case initUnit.toUpperCase() == 'KM':
        result = 'mi';
        break;
      default: 
        result = 'invalid unit';
        break; 
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (true) {
      case unit.toUpperCase() == 'GAL':
        result = 'gallons';
        break;
      case unit.toUpperCase() == 'L':
        result = 'liters';
        break;
      case unit.toUpperCase() == 'LBS':
        result = 'pounds';
        break;
      case unit.toUpperCase() == 'KG':
        result = 'kilograms';
        break;
      case unit.toUpperCase() == 'MI':
        result = 'miles';
        break;
      case unit.toUpperCase() == 'KM':
        result = 'kilometers';
        break;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (true) {
      case initUnit.toUpperCase() == 'GAL':
        result = initNum*galToL; 
        result = parseFloat(result.toFixed(5));
        break;
      case initUnit.toUpperCase() == 'L':
        result = initNum/galToL;
        result = parseFloat(result.toFixed(5));
        break;
      case initUnit.toUpperCase() == 'LBS':
        result = initNum*lbsToKg;
        result = parseFloat(result.toFixed(5));
        break;
      case initUnit.toUpperCase() == 'KG':
        result = initNum/lbsToKg;
        result = parseFloat(result.toFixed(5));
        break;
      case initUnit.toUpperCase() == 'MI':
        result = initNum*miToKm;
        result = parseFloat(result.toFixed(5));
        break;
      case initUnit.toUpperCase() == 'KM':
        result = initNum/miToKm;
        result = parseFloat(result.toFixed(5));
        break;
    } 
    return result;
  };
  
  this.getString = function(initNum, initUnitLong, returnNum, returnUnitLong) {
    let result;
    result = `${initNum} ${initUnitLong} ` + 'converts to ' + `${returnNum} ${returnUnitLong}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
