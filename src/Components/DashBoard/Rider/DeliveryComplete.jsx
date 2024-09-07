import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useParcels } from "../../../hooks/useParcels";

const DeliveryComplete = () => {
  const { data, isLoading } = useParcels();

  const parcels = data.map((d, idx) => ({ ...d, idx: idx + 1 }))

  return (
    <div className="container mx-auto px-4 sm:px-8  overflow-auto md:max-w-[85%]">
      <h2 className="mt-6 font-bold text-2xl">Delivery Complete Parcel List</h2>
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
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default DeliveryComplete;
