function calcInstallFee(subtotal, percentvalue) {
  const installFee = (subtotal / 100) * percentvalue;
  return installFee;
}

module.exports = calcInstallFee;
