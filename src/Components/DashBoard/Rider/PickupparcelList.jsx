import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { useParcels } from "../../../hooks/useParcels";
import { useState, useEffect } from "react";
import axios from "axios";

const PickupparcelList = () => {
  const { data: initialParcels, isLoading } = useParcels();
  const [parcels, setParcels] = useState([]);

  const [statuses] = useState([
    { label: "Ongoing", value: "Ongoing" },
    { label: "Delivered", value: "Delivered" },
    { label: "Cancel", value: "Cancel" },
  ]);

  useEffect(() => {
    if (initialParcels) {
      setParcels(initialParcels);
    }
  }, [initialParcels]);

  const handleStatusChange = async (value, parcel) => {
    try {
      // Update the local state
      setParcels((prevParcels) =>
        prevParcels.map((p) =>
          p._id === parcel._id ? { ...p, deliveryStatus: value } : p
        )
      );

      await axios.put(`http://localhost:5000/parcel/${parcel._id}`, {
        deliveryStatus: value,
      });
    } catch (error) {
      console.error("Error updating parcel status:", error);
    }
  };

  return (
    <div className=" mx-auto  sm:px-8 ">
      <h2 className="mt-6 font-bold text-2xl">Pickup Parcel List</h2>

      <div className="py-4 w-full">
        <div className="shadow rounded-lg overflow-hidden">
          <DataTable
            value={parcels}
            paginator={parcels?.length > 5}
            rows={5}
            sortMode="multiple"
            className="p-datatable-customers"
            loading={isLoading}
            emptyMessage="No parcels found."
          >
            <Column
              field="Date"
              header="Date"
              sortable
              body={(rowData) => new Date(rowData.Date).toLocaleDateString()}
            />
            <Column field="Merchant_Order_ID" header="CN Number" sortable />
            <Column field="Store_Name" header="Merchant Name" sortable />
            <Column
              field="Customer_Contact_Number"
              header="Merchant Number"
              sortable
            />
            <Column field="Customer_Name" header="Customer Name" sortable />
            <Column field="Customer_Address" header="Pickup Address" sortable />
            <Column field="Customer_District_Name" header="District" sortable />
            <Column
              field="Total_Collection_Amount"
              header="Collectable Amount"
              sortable
            />
            <Column field="Service_Type" header="Status" sortable />
            <Column
              header="Action"
              body={(rowData) => (
                <Dropdown
                  value={rowData.deliveryStatus || "Ongoing"}
                  options={statuses}
                  onChange={(e) => handleStatusChange(e.value, rowData)}
                  placeholder="Select a Status"
                />
              )}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default PickupparcelList;
