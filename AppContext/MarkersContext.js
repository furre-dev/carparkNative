import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const VehiclesContext = createContext({});
const VehiclesProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([
  ]);

  useEffect(() => {
    // Load the stored vehicles list on app startup
    AsyncStorage.getItem('VEHICLES_LIST')
      .then((storedVehicles) => {
        if (storedVehicles) {
          setVehicles(JSON.parse(storedVehicles));
        }
      })
      .catch((error) => {
        console.log('Error loading vehicles list:', error);
      });
  }, []);

  useEffect(() => {
    // Save the vehicles list whenever it changes
    AsyncStorage.setItem('VEHICLES_LIST', JSON.stringify(vehicles))
      .catch((error) => {
        console.log('Error saving vehicles list:', error);
      });
  }, [vehicles]);


  const handleAddVehicle = (vName, regNum, lat ,long, color) => {
    const newTodo = {
      id: Math.random().toString(),
      vName: vName,
      regNum: regNum,
      lat: lat,
      long: long,
      color: color,
    };
    setVehicles((prevVehicles) => [...prevVehicles, newTodo]);
  };
  const deleteVehicle = (itemId) => {
    const updateVehicles = vehicles.filter((todo) => todo.id !== itemId);
    setVehicles(updateVehicles);
  };

  return (
    <VehiclesContext.Provider
      value={{
        vehicles,
        handleAddVehicle,
        setVehicles,
        deleteVehicle,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
};

export { VehiclesProvider, VehiclesContext };