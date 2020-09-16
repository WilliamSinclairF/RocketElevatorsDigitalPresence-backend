function calcCorpValues(maxOccupantsPerFloor, numFloors) {
  const totalOccupants = maxOccupantsPerFloor * numFloors;
  const numElevators = Math.ceil(totalOccupants / 1000);
  const numColumns = Math.ceil(numFloors / 20);
  const numElevatorPerColumn = Math.ceil(numElevators / numColumns);
  const totalElevators = numElevatorPerColumn * numColumns;
  return { totalElevators, numColumns };
}

module.exports = calcCorpValues;
