const calcResItems = require('./residential-item-quant');
const calcSubTotal = require('../../functions/subtotal');
const calcInstallFee = require('../../functions/install-fee');
const calcTotal = require('../../functions/total');

function calcRes(quoteValues) {
  const {
    numFloors,
    numBasements,
    numApartments,
    shaftDollarCostToMultiply,
    percentValue,
  } = quoteValues;

  const { totalShafts, numColumns } = calcResItems(
    numFloors,
    numBasements,
    numApartments
  );

  const subTotal = calcSubTotal(shaftDollarCostToMultiply, totalShafts);
  const installFee = calcInstallFee(subTotal, percentValue);
  const total = calcTotal(subTotal, installFee);

  console.log('total shafts:', totalShafts, 'total columns:', numColumns);
  console.log('subtotal:', subTotal);
  console.log('install fee:', installFee);
  console.log('total:', total);

  const result = {
    totalShafts: totalShafts,
    totalColumns: numColumns,
    installFee: installFee,
    subTotal: subTotal,
    total: total,
  };

  return result;
}

module.exports = calcRes;
