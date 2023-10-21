const generateFloors = () => {
  const floors = [];

  // Define the desired number of floors (in this case, 10)
  const NUMBER_OF_FLOORS = 10;
  
  // Loop to add objects until the array reaches the desired number of floors
  for (let i = 1; i <= NUMBER_OF_FLOORS; i++) {
    floors.push({
      id: i.toString(),
      floorNumber: i,
    });
  }

  return floors;
};

export default generateFloors;
