import { useState, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";


const PrintParcelSummary = () => {
  const [searchMobile, setSearchMobile] = useState("");
  const [branchName, setBranchName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const printRef = useRef();

  const { data: All_Parcels = [] } = useQuery({
    queryKey: ["All_Parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/packagfhguieormbncdmnn44ge`);
      // const res = await axiosSecure.get(`/packaageForPrint`);
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });

  // ✅ DATE FORMAT FUNCTION (ADDED)
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const branchList = useMemo(() => {
    const names = All_Parcels.map((p) => p.Branch_Name).filter(Boolean);
    return [...new Set(names)];
  }, [All_Parcels]);

  const isFilterApplied =
    searchMobile || branchName || fromDate || toDate;

  const filteredParcels = useMemo(() => {
    if (!isFilterApplied) return [];

    return All_Parcels.filter((p) => {
      const mobileMatch = searchMobile
        ? p.senderMobile === searchMobile
        : true;

      const branchMatch = branchName
        ? p.Branch_Name === branchName
        : true;

      const bookingDate = new Date(p.booking);

      const fromMatch = fromDate
        ? bookingDate >= new Date(fromDate)
        : true;

      const toMatch = toDate
        ? bookingDate <= new Date(toDate + "T23:59:59")
        : true;

      return mobileMatch && branchMatch && fromMatch && toMatch;
    });
  }, [All_Parcels, searchMobile, branchName, fromDate, toDate, isFilterApplied]);

  const summary = useMemo(() => {
    let totalBookings = filteredParcels.length;
    let totalAmount = 0;
    let totalCondition = 0;
    let totalConditionCharge = 0;

    filteredParcels.forEach((p) => {
      const amount = Number(p.amount || 0);
      const condition = Number(p.condition || 0);
      const conditionCharge = Number(p.conditionCharge || 0);

      totalAmount += amount;
      totalCondition += condition;
      totalConditionCharge += conditionCharge;
    });

    return {
      totalBookings,
      totalAmount,
      totalCondition,
      totalConditionCharge,
    };
  }, [filteredParcels]);

  const tableTotals = useMemo(() => {
    let totalAmount = 0;
    let totalCondition = 0;
    let totalCharge = 0;

    filteredParcels.forEach((p) => {
      totalAmount += Number(p.amount || 0);
      totalCondition += Number(p.condition || 0);
      totalCharge += Number(p.conditionCharge || 0);
    });

    return {
      totalAmount,
      totalCondition,
      totalCharge,
      grandTotal: totalAmount + totalCondition + totalCharge,
    };
  }, [filteredParcels]);

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;

    const win = window.open("", "", "width=900,height=700");

    win.document.write(`
      <html>
        <head>
          <title>Parcel Summary</title>
          <style>
            @page { size: A4; margin: 10mm; }

            body {
              font-family: Arial;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              margin: 0;
              padding: 0;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            td, th {
              border: 1px solid black;
              padding: 8px;
            }

            img {
              height: 60px !important;
              width: auto !important;
              max-width: 200px !important;
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);

    win.document.close();

    setTimeout(() => {
      win.print();
      win.close();
    }, 500);
  };

  return (
    <div className="p-6">

      <h1 className="text-xl font-bold mb-4">Parcel Summary</h1>

      <div className="flex gap-3 mb-4 flex-wrap">

        <input
          type="text"
          placeholder="Sender Mobile"
          value={searchMobile}
          onChange={(e) => setSearchMobile(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={branchName}
          onChange={(e) => setBranchName(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Branch</option>
          {branchList.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded"
        />

      </div>

      <div ref={printRef} className="bg-white p-6 max-w-[800px]">

        <p className="mb-2">
          <strong>Date: </strong> 
                   {fromDate ? formatDate(fromDate) : "All"} — {toDate ? formatDate(toDate) : "All"}
        </p>

        <p className="mb-2">
          <strong>Number:</strong> {searchMobile || "N/A"}
        </p>

        {branchName && (
          <p className="mb-4">
            <strong>Branch:</strong> {branchName}
          </p>
        )}

        <table className="w-full border mb-6">
          <tbody>
            <tr>
              <td>Total Booking</td>
              <td>{summary.totalBookings}</td>
            </tr>
            <tr>
              <td>Total Amount</td>
              <td>{summary.totalAmount}</td>
            </tr>
            <tr>
              <td>Total Condition</td>
              <td>{summary.totalCondition}</td>
            </tr>
            <tr>
              <td>Total Condition + Charge</td>
              <td>{summary.totalConditionCharge}</td>
            </tr>
          </tbody>
        </table>

        <table className="w-full border">

          <thead className="bg-blue-600 text-white text-sm">
            <tr>
              <th className="p-2 border">SL</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Parcel Code</th>
              <th className="p-2 border">Sender Phone</th>
              <th className="p-2 border">Receiver Name</th>
              <th className="p-2 border">Receiver Phone</th>
              <th className="p-2 border">Booking Branch</th>
              <th className="p-2 border">Payment Mode</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Condition Amt</th>
              <th className="p-2 border">Condition + Charge</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>

          <tbody>

            {!isFilterApplied && (
              <tr>
                <td colSpan="12" className="text-center p-4">
                  Please apply filter to see data
                </td>
              </tr>
            )}

            {filteredParcels.map((p, index) => {

              const amount = Number(p.amount || 0);
              const condition = Number(p.condition || 0);
              const charge = Number(p.conditionCharge || 0);

              return (
                <tr key={p._id}>
                  <td className="border p-2">{index + 1}</td>

                  {/* ✅ UPDATED DATE HERE */}
                  <td className="border p-2">
                    {formatDate(p.booking)}
                  </td>

                  <td className="border p-2">{p.CnNumber}</td>
                  <td className="border p-2">{p.senderMobile}</td>
                  <td className="border p-2">{p.recipientName}</td>
                  <td className="border p-2">{p.recipientMobile}</td>
                  <td className="border p-2">{p.Branch_Name}</td>
                  <td className="border p-2">{p.paymentOption}</td>
                  <td className="border p-2">{amount}</td>
                  <td className="border p-2">{condition}</td>
                  <td className="border p-2">{charge}</td>
                  <td className="border p-2">
                    {amount + condition + charge}
                  </td>
                </tr>
              );
            })}

            {isFilterApplied && filteredParcels.length > 0 && (
              <tr className="bg-gray-200 font-bold">
                <td colSpan="8" className="border p-2 text-right">
                  Total
                </td>

                <td className="border p-2">{tableTotals.totalAmount}</td>
                <td className="border p-2">{tableTotals.totalCondition}</td>
                <td className="border p-2">{tableTotals.totalCharge}</td>
                <td className="border p-2">{tableTotals.grandTotal}</td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      <button
        onClick={handlePrint}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Print Summary
      </button>

    </div>
  );
};

export default PrintParcelSummary;