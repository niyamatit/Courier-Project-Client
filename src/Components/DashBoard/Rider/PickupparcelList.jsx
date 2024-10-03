// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Dropdown } from "primereact/dropdown";
// import { useParcels } from "../../../hooks/useParcels";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const PickupparcelList = () => {
//   const { data: initialParcels, isLoading } = useParcels();
//   const [parcels, setParcels] = useState([]);

//   const [statuses] = useState([
//     { label: "Pickuped", value: "Ongoing" },
//     { label: "Hold", value: "Hold" },
//     { label: "Cancel", value: "Cancel" },
//   ]);

//   useEffect(() => {
//     if (initialParcels) {
//       setParcels(initialParcels.map((p, idx) => ({ ...p, idx: idx + 1 })));
//     }
//   }, [initialParcels]);

//   const handleStatusChange = async (value, parcel) => {
//     console.log("ornob", value);
//     try {
//       // Update the local state
//       setParcels((prevParcels) =>
//         prevParcels.map((p, idx) =>
//           p._id === parcel._id ? { ...p, deliveryStatus: value, idx: idx + 1 } : { ...p, idx: idx + 1 }
//         )
//       );

//       await axios.put(`https://courier-server-lake.vercel.app/parcel/${parcel._id}`, {
//         deliveryStatus: value,
//       });
//     } catch (error) {
//       console.error("Error updating parcel status:", error);
//     }
//   };


//   return (
//     <div className=" mx-auto  sm:px-8 ">
//       <h2 className="mt-6 font-bold text-2xl">Pickup Parcel List</h2>

//       <div className="py-4 w-full">
//         <div className="shadow rounded-lg overflow-hidden">
//           <DataTable
//             value={parcels}
//             paginator={parcels?.length > 5}
//             rows={5}
//             sortMode="multiple"
//             className="p-datatable-customers"
//             loading={isLoading}
//             emptyMessage="No parcels found."
//           >

//             <Column
//               field="idx"
//               header="SL"
//             />
//             <Column
//               field="Date"
//               header="Date"
//               sortable
//               body={(rowData) => new Date(rowData.Date).toLocaleDateString()}
//             />
//             <Column field="Merchant_Order_ID" header="CN Number" sortable />
//             <Column field="Store_Name" header="Merchant Name" sortable />
//             <Column
//               field="Customer_Contact_Number"
//               header="Merchant Number"
//               sortable
//             />
//             <Column field="Customer_Name" header="Customer Name" sortable />
//             <Column field="Customer_Address" header="Pickup Address" sortable />
//             <Column field="Customer_District_Name" header="District" sortable />
//             <Column
//               field="Total_Collection_Amount"
//               header="Collectable Amount"
//               sortable
//             />
//             <Column field="Service_Type" header="Status" sortable />
//             <Column
//               header="Action"
//               body={(rowData) => (
//                 <Dropdown
//                   value={rowData.deliveryStatus || "Ongoing"}
//                   options={statuses}
//                   onChange={(e) => handleStatusChange(e.value, rowData)}
//                   placeholder="Select a Status"
//                 />
//               )}
//             />
//           </DataTable>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PickupparcelList;


import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { useParcels } from "../../../hooks/useParcels";
import { useState, useEffect } from "react";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar"; // Import Calendar component for date input

const PickupparcelList = () => {
  const { data: initialParcels, isLoading } = useParcels();
  const [parcels, setParcels] = useState([]);
  const [statuses] = useState([
    { label: "Pickuped", value: "Ongoing" },
    { label: "Hold", value: "Hold" },
    { label: "Cancel", value: "Cancel" },
  ]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [cancelNote, setCancelNote] = useState("");
  const [holdNote, setHoldNote] = useState(""); // State for hold note
  const [holdDate, setHoldDate] = useState(null); // State to store selected hold date
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isHoldModalVisible, setIsHoldModalVisible] = useState(false); // Modal for hold

  useEffect(() => {
    if (initialParcels) {
      setParcels(initialParcels.map((p, idx) => ({ ...p, idx: idx + 1 })));
    }
  }, [initialParcels]);

  const handleStatusChange = async (value, parcel) => {
    if (value === "Cancel") {
      setSelectedParcel(parcel);
      setIsCancelModalVisible(true); // Open the cancel modal
    } else if (value === "Hold") {
      setSelectedParcel(parcel);
      setIsHoldModalVisible(true); // Open the hold modal
    } else {
      updateParcelStatus(value, parcel); // Handle other statuses directly
    }
  };

  const updateParcelStatus = async (status, parcel, additionalData = {}) => {
    try {
      // Update the local state
      setParcels((prevParcels) =>
        prevParcels.map((p, idx) =>
          p._id === parcel._id ? { ...p, deliveryStatus: status, ...additionalData, idx: idx + 1 } : { ...p, idx: idx + 1 }
        )
      );

      // API call to update status
      await axios.put(`https://courier-server.vercel.app/parcel/${parcel._id}`, {
        deliveryStatus: status,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error updating parcel status:", error);
    }
  };

  const handleCancelSubmit = () => {
    if (selectedParcel) {
      // Update the status to 'Cancel' and include the cancel note
      updateParcelStatus("Cancel", selectedParcel, { cancelNote });
      setIsCancelModalVisible(false); // Close the cancel modal
      setCancelNote(""); // Clear the note
    }
  };

  const handleHoldSubmit = () => {
    if (selectedParcel && holdDate) {
      // Update the status to 'Hold' and include the hold date and note
      updateParcelStatus("Hold", selectedParcel, { holdDate, holdNote });
      setIsHoldModalVisible(false); // Close the hold modal
      setHoldDate(null); // Clear the hold date
      setHoldNote(""); // Clear the hold note
    }
  };

  return (
    <div className="mx-auto sm:px-8">
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
            <Column field="idx" header="SL" />
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
            <Column
              field="Customer_District_Name"
              header="District"
              sortable
            />
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

      {/* Cancel Modal */}
      <Dialog
        header="Cancel Parcel"
        visible={isCancelModalVisible}
        style={{ width: "50vw" }}
        onHide={() => setIsCancelModalVisible(false)}
      >
        <p>Please provide a reason for cancelling this parcel:</p>
        <InputTextarea
          value={cancelNote}
          onChange={(e) => setCancelNote(e.target.value)}
          rows={5}
          cols={50}
          placeholder="Enter cancellation note here"
        />
        <div className="pt-3">
          <Button
            label="Submit"
            icon="pi pi-check"
            onClick={handleCancelSubmit}
          />
        </div>
      </Dialog>

      {/* Hold Modal */}
      <Dialog
        header="Hold Parcel"
        visible={isHoldModalVisible}
        style={{ width: "50vw" }}
        onHide={() => setIsHoldModalVisible(false)}
      >
        <p>Please select a hold date for this parcel and provide a note:</p>
        <Calendar
          value={holdDate}
          onChange={(e) => setHoldDate(e.value)}
          showIcon
          placeholder="Select a hold date"
        />
        <div className="pt-3">
          <InputTextarea
            value={holdNote}
            onChange={(e) => setHoldNote(e.target.value)}
            rows={5}
            cols={50}
            placeholder="Enter hold note here"
          />
        </div>
        <div className="pt-3">
          <Button
            label="Submit"
            icon="pi pi-check"
            onClick={handleHoldSubmit}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default PickupparcelList;
