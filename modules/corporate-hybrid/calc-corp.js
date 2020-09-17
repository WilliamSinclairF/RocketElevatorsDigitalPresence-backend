const calcCorpValues = require('./ch-item-quant');
const calcSubTotal = require('../../functions/subtotal');
const calcInstallFee = require('../../functions/install-fee');
const calcTotal = require('../../functions/total');

function calcCorp(quoteValues) {
  const {
    numFloors,
    maxOccupantsPerFloor,
    shaftDollarCostToMultiply,
    percentValue,
  } = quoteValues;

  const { totalElevators, numColumns } = calcCorpValues(
    maxOccupantsPerFloor,
    numFloors
  );

  const subTotal = calcSubTotal(shaftDollarCostToMultiply, totalElevators);
  const installFee = calcInstallFee(subTotal, percentValue);
  const total = calcTotal(subTotal, installFee);

  console.log('total shafts:', totalElevators, 'total columns:', numColumns);
  console.log('subtotal:', subTotal);
  console.log('install fee:', installFee);
  console.log('total:', total);

  const result = {
    totalShafts: totalElevators,
    totalColumns: numColumns,
    installFee: installFee,
    subTotal: subTotal,
    total: total,
  };

  if (total === 0) {
    return;
  } else {
    return result;
  }
}

module.exports = calcCorp;
