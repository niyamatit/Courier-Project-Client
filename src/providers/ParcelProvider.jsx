import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";

export const ParcelContext = createContext(null);

export const ParcelProvider = ({ children }) => {
  const queryResponse = useQuery({
    queryKey: ["Parcels"],
    queryFn: async () => {
      const res = await axios.get("https://courier-server-rho.vercel.app/parcelhkdbjsbdjkshujsbh");
      
    },
  });
// console.log(queryResponse)
  return (
    <ParcelContext.Provider value={queryResponse}>
      {children}
    </ParcelContext.Provider>
  );
};
