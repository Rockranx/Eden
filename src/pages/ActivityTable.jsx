import React from "react";

function formatPrice(payment) {
  if (!payment) return "-";
  const value = Number(payment.quantity) / Math.pow(10, payment.decimals);
  return `${value} ${payment.symbol}`;
}

function formatDate(ts) {
  if (!ts) return "-";
  return new Date(ts * 1000).toLocaleString();
}

function shortenAddress(addr) {
  if (!addr) return "-";
  return addr.slice(0, 5) + "..." + addr.slice(-4);
}

function mapEventToRow(event) {
  switch (event.event_type) {
    case "sale":
      return {
        event: "Sale",
        price: formatPrice(event.payment),
        from: shortenAddress(event.seller),
        to: shortenAddress(event.buyer),
        date: formatDate(event.event_timestamp),
      };
    case "transfer":
      return {
        event: "Transfer",
        price: "-",
        from: shortenAddress(event.from_address),
        to: shortenAddress(event.to_address),
        date: formatDate(event.event_timestamp),
      };
    case "order":
      return {
        event: event.order_type === "listing" ? "Listing" : "Order",
        price: formatPrice(event.payment),
        from: shortenAddress(event.maker),
        to: shortenAddress(event.taker),
        date: formatDate(event.expiration_date || event.event_timestamp),
      };
    default:
      return {
        event: event.event_type,
        price: "-",
        from: "-",
        to: "-",
        date: formatDate(event.event_timestamp),
      };
  }
}

export default function EventsTable({ events }) {
  return (
    <table className="table-container">
      <thead className="bg-gray-100">
        <tr>
          <th className=" px-4 py-2">Event</th>
          <th className=" px-4 py-2">Price</th>
          <th className=" px-4 py-2">From</th>
          <th className=" px-4 py-2">To</th>
          <th className=" px-4 py-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {events.map((e, i) => {
          const row = mapEventToRow(e);
          return (
            <tr key={i} className="hover:bg-gray-50">
              <td className=" px-4 py-2">{row.event}</td>
              <td className=" px-4 py-2">{row.price}</td>
              <td className=" px-4 py-2">{row.from}</td>
              <td className=" px-4 py-2">{row.to}</td>
              <td className=" px-4 py-2">{row.date}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
