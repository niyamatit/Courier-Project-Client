const MerchantInvoices = () => {
  const invoices = [
    {
      date: "7/8/2024",
      paymentId: "MPAY-01873",
      totalParcel: 34,
      amountToBeCollect: 7940,
      collected: 7940,
      totalCharge: 3579.1,
      paymentAmount: 436,
      status: "Paid",
    },
    {
      date: "6/23/2024",
      paymentId: "MPAY-01720",
      totalParcel: 11,
      amountToBeCollect: 80,
      collected: 80,
      totalCharge: 112,
      paymentAmount: -104,
      status: "Paid",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">All Invoices</h1>
      <div className="bg-white p-4 shadow rounded-lg">
        <div className="flex justify-between mb-4">
          <div>
            <input
              type="text"
              className="border rounded p-2"
              placeholder="Date/Date Range"
            />
          </div>
          <div>
            <input
              type="text"
              className="border rounded p-2"
              placeholder="Search..."
            />
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">DATE</th>
              <th className="py-2 px-4 border-b">PAYMENT ID</th>
              <th className="py-2 px-4 border-b">TOTAL PARCEL</th>
              <th className="py-2 px-4 border-b">AMOUNT TO BE COLLECT</th>
              <th className="py-2 px-4 border-b">COLLECTED</th>
              <th className="py-2 px-4 border-b">TOTAL CHARGE</th>
              <th className="py-2 px-4 border-b">PAYMENT AMOUNT</th>
              <th className="py-2 px-4 border-b">STATUS</th>
              <th className="py-2 px-4 border-b">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{invoice.date}</td>
                <td className="py-2 px-4 border-b">{invoice.paymentId}</td>
                <td className="py-2 px-4 border-b">{invoice.totalParcel}</td>
                <td className="py-2 px-4 border-b">
                  {invoice.amountToBeCollect}
                </td>
                <td className="py-2 px-4 border-b">{invoice.collected}</td>
                <td className="py-2 px-4 border-b">{invoice.totalCharge}</td>
                <td className="py-2 px-4 border-b">{invoice.paymentAmount}</td>
                <td className="py-2 px-4 border-b">
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded">
                    {invoice.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <div>
            <select className="border rounded p-2">
              <option>Show 10</option>
              <option>Show 20</option>
              <option>Show 50</option>
            </select>
          </div>
          <div>
            <button className="px-4 py-2 bg-gray-300 rounded">Previous</button>
            <span className="px-4 py-2">Page 1 of 1</span>
            <button className="px-4 py-2 bg-gray-300 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantInvoices;
