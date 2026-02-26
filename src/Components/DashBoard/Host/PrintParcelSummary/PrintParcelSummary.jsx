import { useState, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";
import logoImg from "../../../../assets/nexp-update.png";

const PrintParcelSummary = () => {
  const [searchMobile, setSearchMobile] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const printRef = useRef();

  const { data: All_Parcels = [] } = useQuery({
    queryKey: ["All_Parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/packagfhguieormbncdmnn44ge`);
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });

  // ✅ Filter by mobile + date
  const filteredParcels = useMemo(() => {
    return All_Parcels.filter((p) => {
      const mobileMatch = p.senderMobile === searchMobile;

      const bookingDate = new Date(p.booking);

      const fromMatch = fromDate
        ? bookingDate >= new Date(fromDate)
        : true;

      const toMatch = toDate
        ? bookingDate <= new Date(toDate)
        : true;

      return mobileMatch && fromMatch && toMatch;
    });
  }, [All_Parcels, searchMobile, fromDate, toDate]);

  // ✅ Summary
  const summary = useMemo(() => {
    let totalBookings = filteredParcels.length;
    // let totalDelivered = 0;
    // let totalPending = 0;
    let totalReturn = 0;
    let totalAmount = 0;
    let totalCondition = 0;
    let totalConditionCharge = 0;

    filteredParcels.forEach((p) => {
      const amount = Number(p.amount || 0);
      const condition = Number(p.condition || 0);
      const conditionCharge = Number(p.conditionCharge || 0);

      totalAmount += amount;
      totalCondition += condition;
      totalConditionCharge += condition + conditionCharge;

      // if (p.done === "done") totalDelivered++;
      // else totalPending++;

      // if (p.update === "Return") totalReturn++;
    });

    return {
      totalBookings,
      // totalDelivered,
      // totalPending,
      totalReturn,
      totalAmount,
      totalCondition,
      totalConditionCharge,
    };
  }, [filteredParcels]);

  // ✅ Print
  const handlePrint = () => {
  const printContent = printRef.current.innerHTML;

  const win = window.open("", "", "width=900,height=700");

  win.document.write(`
    <html>
      <head>
        <title>Parcel Summary</title>

        <style>

          @page {
            size: A4;
            margin: 10mm;
          }

          body {
            font-family: Arial, sans-serif;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            margin: 0;
            padding: 0;
          }

          .print-wrapper {
            width: 800px;
            margin: auto;
            position: relative;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          td, th {
            border: 1px solid #000;
            padding: 8px;
            font-size: 14px;
          }

          img {
            max-width: 100%;
          }

          /* WATERMARK FIX */
          .absolute {
            position: absolute !important;
          }

        </style>

      </head>

      <body>
        <div class="print-wrapper">
          ${printContent}
        </div>
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

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Sender Mobile"
          value={searchMobile}
          onChange={(e) => setSearchMobile(e.target.value)}
          className="border p-2 rounded"
        />

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

      {/* Printable Area */}
      <div ref={printRef} className="relative bg-white p-6 max-w-[800px]">

        {/* Watermark */}
        <div
          className="absolute inset-0 bg-center bg-repeat-y"
          style={{
            backgroundImage:
              'url("https://i.ibb.co.com/SD8pn0BD/text-logo.png")',
            opacity: 0.08,
            backgroundSize: "80% auto",
            zIndex: 0,
          }}
        ></div>

        <div className="relative z-10">

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <img src={logoImg} className="h-16" />
            <div className="text-center">
              <h2 className="text-xl font-bold">Niyamat Express</h2>
              <p>Chittagong Road, Narayanganj</p>
              <p>09617179001</p>
            </div>
          </div>

          {/* Date */}
          <p className="mb-4">
            <strong>Date:</strong> {fromDate || "All"} — {toDate || "All"}
          </p>
          <p className="mb-4">
            <strong>Number:</strong> {searchMobile}
          </p>

          {/* Summary Table */}
          <table className="w-full border">
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
        </div>
      </div>

      {/* Print Button */}
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