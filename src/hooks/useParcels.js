import { useContext } from "react";
import { ParcelContext } from "../providers/ParcelProvider";


export const useParcels = () => useContext(ParcelContext);
