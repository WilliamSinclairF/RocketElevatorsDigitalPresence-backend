function calcResItems(numFloors, numBasements, numApartments) {
  let numColumns = 1;

  let doorsPerFloorAvg = Math.ceil(numApartments / (numFloors - numBasements));

  let totalShafts = Math.ceil(doorsPerFloorAvg / 6);

  if (numFloors > 20) {
    for (let i = 20; i < numFloors; i++) {
      if (i % 20 === 0) {
        numColumns++;
      }
    }
    totalShafts = totalShafts * numColumns;
  }
  return { totalShafts, numColumns };
}

module.exports = calcResItems;
