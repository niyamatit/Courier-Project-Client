import { useState, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import logoImg from '../../../../assets/nexp-update.png';
import Swal from "sweetalert2";
const PrintParcelSummary = () => {

  const [searchMobile, setSearchMobile] =
    useState("");
const [isGenerating, setIsGenerating] =
  useState(false);

const [isPrinting, setIsPrinting] =
  useState(false);
  const [branchName, setBranchName] =
    useState("");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [selectedMerchant, setSelectedMerchant] =
    useState(null);

  const [isDropdownOpen, setIsDropdownOpen] =
    useState(false);

  const printRef = useRef();

  const [verifiedUser] = useUsersData();

  // ================= PARCELS =================

  const { data: All_Parcels = [] } = useQuery({
    queryKey: ["All_Parcels"],

    queryFn: async () => {

      const res = await axiosSecure.get(
        `/packagfhguieormbncdmnn44ge`
      );

      return Array.isArray(res.data)
        ? res.data
        : res.data
        ? [res.data]
        : [];
    },
  });

  // ================= USERS =================

  const { data: users = [] } = useQuery({
    queryKey: ["users"],

    queryFn: async () => {

      const res = await axiosSecure.get(
        "/shfjksdhfjdjkfhxnbcnbc67437gch"
      );

      return res.data || [];
    },
  });

  // ================= DATE FORMAT =================

  const formatDate = (date) => {

    const d = new Date(date);

    const day = String(
      d.getDate()
    ).padStart(2, "0");

    const month = String(
      d.getMonth() + 1
    ).padStart(2, "0");

    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // ================= BRANCH LIST =================

  const branchList = useMemo(() => {

    const names = All_Parcels
      .map((p) => p.Branch_Name)
      .filter(Boolean);

    return [...new Set(names)];

  }, [All_Parcels]);

  // ================= MERCHANT FILTER =================

  const filteredMerchants = users.filter(
    (user) => {

      const searchTerm =
        searchQuery.toLowerCase();

      return (
        user?.role === "merchant" &&
        (
          user?.name
            ?.toLowerCase()
            .includes(searchTerm) ||

          user?.merchantID
            ?.toLowerCase()
            .includes(searchTerm)
        )
      );
    }
  );

  // ================= FILTER CHECK =================

  const isFilterApplied =
    searchMobile ||
    branchName ||
    fromDate ||
    toDate;

  // ================= FILTERED PARCELS =================

  const filteredParcels = useMemo(() => {

    if (!isFilterApplied) return [];

    return All_Parcels.filter((p) => {

      const mobileMatch = searchMobile
        ? p.senderMobile === searchMobile
        : true;

      const branchMatch = branchName
        ? p.Branch_Name === branchName
        : true;

      

      const bookingDate =
        new Date(p.booking);

      const fromMatch = fromDate
        ? bookingDate >= new Date(fromDate)
        : true;

      const toMatch = toDate
        ? bookingDate <=
          new Date(toDate + "T23:59:59")
        : true;

      return (
        mobileMatch &&
        branchMatch &&
        fromMatch &&
        toMatch
      );
    });

  }, [
    All_Parcels,
    searchMobile,
    branchName,
    fromDate,
    toDate,
    
    isFilterApplied,
  ]);

  // ================= SUMMARY =================

  const summary = useMemo(() => {

    let totalBookings = filteredParcels.length;

    let totalAmount = 0;

    let totalCondition = 0;

    let totalConditionCharge = 0;

    filteredParcels.forEach((p) => {

      const amount =
        Number(p.amount || 0);

      const condition =
        Number(p.condition || 0);

      const conditionCharge =
        Number(p.conditionCharge || 0);

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

  // ================= TABLE TOTALS =================

  const tableTotals = useMemo(() => {

    let totalAmount = 0;

    let totalCondition = 0;

    let totalCharge = 0;

    filteredParcels.forEach((p) => {

      totalAmount += Number(
        p.amount || 0
      );

      totalCondition += Number(
        p.condition || 0
      );

      totalCharge += Number(
        p.conditionCharge || 0
      );
    });

    return {
      totalAmount,
      totalCondition,
      totalCharge,
      grandTotal:
        totalAmount +
        totalCondition +
        totalCharge,
    };

  }, [filteredParcels]);

  // ================= GENERATE PDF =================
const groupedParcels = useMemo(() => {

  const groups = {};

  filteredParcels.forEach((parcel) => {

    const date =
      formatDate(parcel.booking);

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(parcel);
  });

  return groups;

}, [filteredParcels]);
 const handleGenerateInvoice =
  async () => {

    try {

      setIsGenerating(true);

      const result =
        await Swal.fire({
          title:
            "Generate Invoice?",

          text:
            "Invoice PDF will be generated.",

          icon: "question",

          showCancelButton: true,

          confirmButtonText:
            "Generate",

          cancelButtonText:
            "Cancel",
        });

      if (!result.isConfirmed) {

        setIsGenerating(false);

        return;
      }

      const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );

      // ================= COMPANY LOGO =================

      const logo =
        new Image();

      logo.src = logoImg;

      pdf.addImage(
        logo,
        "PNG",
        14,
        10,
        28,
        28
      );

      // ================= WATERMARK IMAGE =================

      const watermark =
        new Image();

      watermark.src =
        "https://i.ibb.co.com/SD8pn0BD/text-logo.png";

      pdf.addImage(
        watermark,
        "PNG",
        25,
        70,
        160,
        160,
        "",
        "FAST"
      );

      // ================= HEADER =================

      pdf.setTextColor(0);

      pdf.setFontSize(24);

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.text(
        "Niyamat Express",
        60,
        20
      );

      pdf.setFontSize(10);

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.text(
        "Chittagong Road, Narayanganj 1430",
        55,
        28
      );

      pdf.text(
        "Web: https://niyamatexpress.com",
        58,
        34
      );

      pdf.text(
        "Email: support@niyamatexpress.com",
        50,
        40
      );

      pdf.text(
        "Tel: 09617179001, 09617179177",
        54,
        46
      );

      // ================= LINE =================

      pdf.line(
        14,
        52,
        195,
        52
      );

      // ================= TITLE =================

      pdf.setFontSize(16);

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.text(
        "Parcel Summary Invoice",
        14,
        62
      );

      // ================= DATE =================

      pdf.setFontSize(11);

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.text(
        `Invoice Date: ${new Date().toLocaleString()}`,
        14,
        70
      );

      pdf.text(
        `Filter Date: ${
          fromDate || "All"
        } - ${toDate || "All"}`,
        14,
        77
      );

      pdf.text(
        `Branch: ${
          branchName || "All"
        }`,
        14,
        84
      );

      pdf.text(
        `Mobile: ${
          searchMobile || "N/A"
        }`,
        14,
        91
      );

      // ================= MERCHANT =================

      pdf.text(
        `Merchant Name: ${
          selectedMerchant?.name ||
          "N/A"
        }`,
        14,
        98
      );

      pdf.text(
        `Merchant ID: ${
          selectedMerchant?.merchantID ||
          "N/A"
        }`,
        14,
        105
      );

      // ================= TABLE DATA =================

      const tableData = [];

      Object.entries(
        groupedParcels
      ).forEach(
        ([date, parcels]) => {

          let dateTotal = 0;

          parcels.forEach(
            (p, index) => {

              const total =
                Number(
                  p.amount || 0
                ) +
                Number(
                  p.condition || 0
                ) +
                Number(
                  p.conditionCharge || 0
                );

              dateTotal += total;

              tableData.push([
                index + 1,
                date,
                p.CnNumber,
                p.senderMobile,
                p.recipientName,
                p.recipientMobile,
                p.Branch_Name,
                p.paymentOption,
                p.amount,
                p.qty,
                p.condition,
                p.conditionCharge,
                total,
              ]);
            }
          );

          // DATE TOTAL

          tableData.push([
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "Date Total",
            `${dateTotal} TK`,
          ]);
        }
      );

      // GRAND TOTAL

      tableData.push([
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Grand Total",
        `${tableTotals.grandTotal} TK`,
      ]);

      

      autoTable(pdf, {

        startY: 114,

        head: [[
          "SL",
          "Date",
          "Parcel",
          "Sender",
          "Receiver",
          "Receiver Phone",
          "Branch",
          "Payment",
          "Amount",
          "Quantity",
          "Cond",
          "Charge",
          "Total",
        ]],

        body: tableData,

        styles: {
          fontSize: 7,
        },

        headStyles: {
          fillColor: [
            37,
            99,
            235,
          ],
        },
      });

      // ================= FOOTER =================

      const finalY =
        pdf.lastAutoTable.finalY + 10;

      pdf.setFontSize(10);

      pdf.text(
        "Generated By Niyamat Express System",
        14,
        finalY
      );

      // ================= PDF BLOB =================

      const pdfBlob =
        pdf.output("blob");

      // ================= CLOUDINARY =================

      const formData =
        new FormData();

      formData.append(
        "file",
        pdfBlob,
        `${selectedMerchant?.name}-Invoice .pdf`
      );

      formData.append(
        "upload_preset",
        "Merchant_Invoice.pdf"
      );

      const cloudinaryRes =
        await fetch(
          "https://api.cloudinary.com/v1_1/dhhlztslk/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

      const cloudinaryData =
        await cloudinaryRes.json();

      console.log(
        cloudinaryData
      );

      // ================= PDF URL =================

      const pdfUrl =
        `https://res.cloudinary.com/dhhlztslk/image/upload/fl_attachment/${cloudinaryData.public_id}.pdf`;

      // ================= SAVE DATABASE =================

      await axiosSecure.post(
        "/save-invoice",
        {
          pdfUrl,

          merchantName:
            selectedMerchant?.name ||
            null,

          merchantID:
            selectedMerchant?.merchantID ||
            null,

          merchantEmail:
            selectedMerchant?.email ||
            null,

          createdAt:
            new Date(),

          Who_Added:
            verifiedUser?.name ||
            "Unknown",

          Who_Added_Email:
            verifiedUser?.email ||
            "Unknown",
        }
      );

      // ================= OPEN PDF =================

      window.open(
        pdfUrl,
        "_blank",
        "noopener,noreferrer"
      );

      Swal.fire({
        icon: "success",

        title:
          "Invoice Generated",

        text:
          "Invoice generated successfully.",
      });

    } catch (error) {

      console.log(error);

      Swal.fire({
        icon: "error",

        title: "Error",

        text:
          "Failed to generate invoice.",
      });

    } finally {

      setIsGenerating(false);
    }
  };
  // ================= PRINT =================

  const handlePrint = () => {

    const printContent =
      printRef.current.innerHTML;

    const win = window.open(
      "",
      "",
      "width=900,height=700"
    );

    win.document.write(`
      <html>
        <head>
          <title>Parcel Summary</title>

          <style>

            body {
              font-family: Arial;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            td, th {
              border: 1px solid black;
              padding: 8px;
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

      <h1 className="text-xl font-bold mb-4">
        Parcel Summary
      </h1>

      <div className="flex gap-3 mb-4 flex-wrap">

        {/* MOBILE */}

        <input
          type="text"
          placeholder="Sender Mobile"
          value={searchMobile}
          onChange={(e) =>
            setSearchMobile(e.target.value)
          }
          className="border p-2 rounded"
        />

        {/* BRANCH */}

        <select
          value={branchName}
          onChange={(e) =>
            setBranchName(e.target.value)
          }
          className="border p-2 rounded"
        >
          <option value="">
            All Branch
          </option>

          {branchList.map(
            (name, index) => (
              <option
                key={index}
                value={name}
              >
                {name}
              </option>
            )
          )}
        </select>

        {/* DATE */}

        <input
          type="date"
          value={fromDate}
          onChange={(e) =>
            setFromDate(e.target.value)
          }
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) =>
            setToDate(e.target.value)
          }
          className="border p-2 rounded"
        />

        {/* MERCHANT */}

        <div className="relative min-w-[300px]">

          <input
            type="text"

            placeholder="Search Merchant (Optional)"

            value={searchQuery}

            onChange={(e) => {

              setSearchQuery(
                e.target.value
              );

              setIsDropdownOpen(true);
            }}

            onClick={() =>
              setIsDropdownOpen(true)
            }

            className="border p-2 rounded w-full"
          />

          {isDropdownOpen && (

            <div className="absolute z-50 bg-white border w-full max-h-60 overflow-auto shadow rounded">

              <div
                className="p-2 hover:bg-gray-100 cursor-pointer"

                onClick={() => {

                  setSelectedMerchant(
                    null
                  );

                  setSearchQuery("");

                  setIsDropdownOpen(
                    false
                  );
                }}
              >
                All Merchants
              </div>

              {filteredMerchants.map(
                (user) => (

                  <div
                    key={user._id}

                    className="p-2 hover:bg-gray-100 cursor-pointer"

                    onClick={() => {

                      setSelectedMerchant(
                        user
                      );

                      setSearchQuery(
                        `${user?.name} (${user?.merchantID})`
                      );

                      setIsDropdownOpen(
                        false
                      );
                    }}
                  >
                    {user?.name}
                    {" "}
                    (
                    {user?.merchantID}
                    )
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* PRINT AREA */}

      <div
        ref={printRef}

        className="p-6 max-w-[800px]"

        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
      >

        <p className="mb-2">
          <strong>Date:</strong>

          {" "}

          {fromDate
            ? formatDate(fromDate)
            : "All"}

          {" "}—

          {" "}

          {toDate
            ? formatDate(toDate)
            : "All"}
        </p>

        <p className="mb-2">
          <strong>Number:</strong>
          {" "}
          {searchMobile || "N/A"}
        </p>

        <p className="mb-2">
          <strong>Merchant:</strong>
          {" "}
          {selectedMerchant?.name || "All"}
        </p>

        <p className="mb-4">
          <strong>Merchant ID:</strong>
          {" "}
          {selectedMerchant?.merchantID || "N/A"}
        </p>

        {branchName && (
          <p className="mb-4">
            <strong>Branch:</strong>
            {" "}
            {branchName}
          </p>
        )}

        {/* SUMMARY */}

        <table className="w-full border mb-6">

          <tbody>

            <tr>
              <td>Total Booking</td>
              <td>
                {summary.totalBookings}
              </td>
            </tr>

            <tr>
              <td>Total Amount</td>
              <td>
                {summary.totalAmount}
              </td>
            </tr>
           

            <tr>
              <td>Total Condition</td>
              <td>
                {summary.totalCondition}
              </td>
            </tr>

            <tr>
              <td>
                Total Condition + Charge
              </td>

              <td>
                {
                  summary.totalConditionCharge
                }
              </td>
            </tr>

          </tbody>
        </table>

        {/* TABLE */}

        <table className="w-full border">

          <thead
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
            }}
            className="text-sm"
          >

            <tr>

              <th className="p-2 border">
                SL
              </th>

              <th className="p-2 border">
                Date
              </th>

              <th className="p-2 border">
                Parcel Code
              </th>

              <th className="p-2 border">
                Sender Phone
              </th>

              <th className="p-2 border">
                Receiver Name
              </th>

              <th className="p-2 border">
                Receiver Phone
              </th>

              <th className="p-2 border">
                Booking Branch
              </th>

              <th className="p-2 border">
                Payment Mode
              </th>
<th className="p-2 border">
                Quantity
              </th>
              <th className="p-2 border">
                Amount
              </th>
              

              <th className="p-2 border">
                Condition Amt
              </th>

              <th className="p-2 border">
                Condition + Charge
              </th>

              <th className="p-2 border">
                Total
              </th>
            </tr>
          </thead>

          <tbody>

            {!isFilterApplied && (

              <tr>

                <td
                  colSpan="12"
                  className="text-center p-4"
                >
                  Please apply filter
                </td>

              </tr>
            )}

            {filteredParcels.map(
              (p, index) => {

                const amount =
                  Number(
                    p.amount || 0
                  );

                const condition =
                  Number(
                    p.condition || 0
                  );

                const charge =
                  Number(
                    p.conditionCharge || 0
                  );

                return (

                  <tr key={p._id}>

                    <td className="border p-2">
                      {index + 1}
                    </td>

                    <td className="border p-2">
                      {formatDate(
                        p.booking
                      )}
                    </td>

                    <td className="border p-2">
                      {p.CnNumber}
                    </td>

                    <td className="border p-2">
                      {p.senderMobile}
                    </td>

                    <td className="border p-2">
                      {p.recipientName}
                    </td>

                    <td className="border p-2">
                      {p.recipientMobile}
                    </td>

                    <td className="border p-2">
                      {p.Branch_Name}
                    </td>

                    <td className="border p-2">
                      {p.paymentOption}
                    </td>
<td className="border p-2">
                      {p.qty}
                    </td>
                    <td className="border p-2">
                      {amount}
                    </td>
                    

                    <td className="border p-2">
                      {condition}
                    </td>

                    <td className="border p-2">
                      {charge}
                    </td>

                    <td className="border p-2">
                      {
                        amount +
                        condition +
                        charge
                      }
                    </td>
                  </tr>
                );
              }
            )}

            {isFilterApplied &&
              filteredParcels.length > 0 && (

              <tr
                className="font-bold"

                style={{
                  backgroundColor:
                    "#e5e7eb",
                }}
              >

                <td
                  colSpan="9"
                  className="border p-2 text-right"
                >
                  Total
                </td>

                <td className="border p-2">
                  {
                    tableTotals.totalAmount
                  }
                </td>

                <td className="border p-2">
                  {
                    tableTotals.totalCondition
                  }
                </td>

                <td className="border p-2">
                  {
                    tableTotals.totalCharge
                  }
                </td>

                <td className="border p-2">
                  {
                    tableTotals.grandTotal
                  }
                </td>

              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* BUTTONS */}

      <button
        onClick={handlePrint}

        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Print Summary
      </button>

      <button
  onClick={handleGenerateInvoice}

  disabled={isGenerating}

  className="mt-4 ml-3 bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
>
  {isGenerating
    ? "Generating..."
    : "Generate Invoice"}
</button>
    </div>
  );
};

export default PrintParcelSummary;