const calcSubTotal = require('../../functions/subtotal');
const calcInstallFee = require('../../functions/install-fee');
const calcTotal = require('../../functions/total');

function calcCom(quoteValues) {
  const { numShafts, shaftDollarCostToMultiply, percentValue } = quoteValues;

  const subTotal = calcSubTotal(shaftDollarCostToMultiply, numShafts);
  const installFee = calcInstallFee(subTotal, percentValue);
  const total = calcTotal(subTotal, installFee);

  console.log('total shafts:', numShafts);
  console.log('subtotal:', subTotal);
  console.log('install fee:', installFee);
  console.log('total:', total);

  const result = {
    totalShafts: numShafts,
    installFee: installFee,
    subTotal: subTotal,
    total: total,
  };

  return result;
}

module.exports = calcCom;
