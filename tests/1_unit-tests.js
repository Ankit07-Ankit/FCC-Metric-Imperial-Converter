const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite("Unit Tests", function() {
  test('Whole number input', function (done) {
    let input = '32L';
    assert.equal(convertHandler.getNum(input), 32);
    done();
  });

  // #2
  test('Decimal number input', function (done) {
    let input = '32.2L';
    assert.equal(convertHandler.getNum(input), 32.2);
    done();
  });

  // #3
  test('Fractional input', function (done) {
    let input = '32/2L';
    assert.equal(convertHandler.getNum(input), 16);
    done();
  });

  // #4
  test('Fractional input with a decimal', function (done) {
    let input = '32.7/2.4L';
    assert.approximately(convertHandler.getNum(input), 13.625, 0.001);
    done();
  });

  // #5
  test('Return an error on a double-fraction', function (done) {
    let input = '3/2/3L';
    assert.equal(convertHandler.getNum(input), false);
    done();
  });

  // #6
  test('Default to a numerical input of 1 when no numerical input is provided', function (done) {
    let input = 'L';
    assert.equal(convertHandler.getNum(input), 1);
    done();
  });

  // #7
  test('Read each valid input unit', function (done) {
    let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    let output = ['gal','L','mi','km','lbs','kg','gal','L','mi','km','lbs','kg'];
    input.map(function (item, index) {
      return assert.equal( convertHandler.getUnit(item), output[index] )
    });
    done();
  });

  // #8
  test('Return an error for an invalid input unit', function (done) {
    let input = '5min';
    let output = false;
    assert.equal(convertHandler.getUnit(input), output);
    done();
  });

  // #9
  test('return the correct return unit for each valid input unit', function (done) {
    let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    let output = ['L','gal','km','mi','kg','lbs','L','gal','km','mi','kg','lbs'];
    input.map(function (item, index) {
      return assert.equal( convertHandler.getReturnUnit(item), output[index] )
    });
    done();
  });

  // #10
  test('Return the spelled-out string unit for each valid input unit', function (done) {
    let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    let output = ['gallons','liters','miles','kilometers','pounds','kilograms','gallons','liters','miles','kilometers','pounds','kilograms'];
    input.map(function (item, index) {
      return assert.equal( convertHandler.spellOutUnit(item), output[index] )
    });
    done();
  });

  // #11
  test('Convert gal to L', function (done) {
    let inputNum = 1;
    let inputUnit = 'gal';
    let output = 3.78541;
    assert.equal( convertHandler.convert(inputNum,inputUnit), output )
    done();
  });

  // #12
  test('Convert L to gal', function (done) {
    let inputNum = 1;
    let inputUnit = 'L';
    let output = 0.26417;
    assert.equal( convertHandler.convert(inputNum,inputUnit), output )
    done();
  });

  // #13
  test('Convert mi to km', function (done) {
    let inputNum = 1;
    let inputUnit = 'mi';
    let output = 1.60934;
    assert.equal( convertHandler.convert(inputNum,inputUnit), output )
    done();
  });

  // #14
  test('Convert km to mi', function (done) {
    let inputNum = 1;
    let inputUnit = 'km';
    let output = 0.62137;
    assert.equal( convertHandler.convert(inputNum,inputUnit), output )
    done();
  });

  // #15
  test('Convert lbs to kg', function (done) {
    let inputNum = 1;
    let inputUnit = 'lbs';
    let output = 0.45359;
    assert.equal( convertHandler.convert(inputNum,inputUnit), output )
    done();
  });

  // #16
  test('Convert kg to lbs', function (done) {
    let inputNum = 1;
    let inputUnit = 'kg';
    let output = 2.20462;
    assert.equal( convertHandler.convert(inputNum,inputUnit), output )
    done();
  });
});