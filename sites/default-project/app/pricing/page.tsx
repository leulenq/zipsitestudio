use client;

export default function PricingPage() {
  return (
    <>
      <h1>Pricing</h1>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Service 1</td>
            <td>$100</td>
          </tr>
          <tr>
            <td>Service 2</td>
            <td>$200</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}