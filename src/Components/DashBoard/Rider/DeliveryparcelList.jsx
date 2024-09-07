import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { useParcels } from "../../../hooks/useParcels";
import { useState, useEffect } from "react";
import axios from "axios";

const DeliveryparcelList = () => {
  const { data: initialParcels, isLoading } = useParcels();
  const [parcels, setParcels] = useState([]);

  const [statuses] = useState([
    { label: "Ongoing", value: "Ongoing" },
    { label: "Delivered", value: "Delivered" },
    { label: "Cancel", value: "Cancel" },
  ]);

  useEffect(() => {
    if (initialParcels) {
      setParcels(initialParcels.map((p, idx) => ({ ...p, idx: idx + 1 })));
    }
  }, [initialParcels]);

  const handleStatusChange = async (value, parcel) => {
    try {
      // Update the local state
      setParcels((prevParcels) =>
        prevParcels.map((p, idx) =>
          p._id === parcel._id ? { ...p, deliveryStatus: value, idx: idx + 1 } : { ...p, idx: idx + 1 }
        )
      );
      await axios.put(`http://localhost:5000/parcel/${parcel._id}`, {
        deliveryStatus: value,
      });
    } catch (error) {
      console.error("Error updating parcel status:", error);
    }
  };

  const statusTemplate = (rowData) => {
    return (
      <Dropdown
        value={rowData.deliveryStatus || "Ongoing"}
        options={statuses}
        onChange={(e) => handleStatusChange(e.value, rowData)}
        placeholder="Select a Status"
      />
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 md:ml-[15%] overflow-auto md:max-w-[85%]">
      <h2 className="mt-6 font-bold text-2xl">Delivery Parcel List</h2>
      <div className="py-4">
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
              field="idx"
              header="SL"
            />
            <Column
              field="Date"
              header="Date"
              sortable
              body={(rowData) => new Date(rowData.Date).toLocaleDateString()}
            />
            <Column field="Customer_Name" header="Customer Name" sortable />
            <Column
              field="Customer_Contact_Number"
              header="Customer Contact"
              sortable
            />
            <Column
              field="Customer_Address"
              header="Customer Address"
              sortable
            />
            <Column field="Status" header="Status" sortable />
            <Column header="Action" body={statusTemplate} />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default DeliveryparcelList;
