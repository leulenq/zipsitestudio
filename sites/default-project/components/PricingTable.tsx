use client;

export default function PricingTable() {
  return (
    <table style={{
      borderCollapse: 'collapse',
      width: '100%'
    }}>
      <thead>
        <tr>
          <th style={{
            backgroundColor: '#f1c40f',
            color: 'black',
            padding: '10px 20px',
            border: '1px solid #ddd'
          }}>Plan</th>
          <th style={{
            backgroundColor: '#f1c40f',
            color: 'black',
            padding: '10px 20px',
            border: '1px solid #ddd'
          }}>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{
            padding: '10px 20px',
            border: '1px solid #ddd'
          }}>Plan 1</td>
          <td style={{
            padding: '10px 20px',
            border: '1px solid #ddd'
          }}>$10</td>
        </tr>
        <tr>
          <td style={{
            padding: '10px 20px',
            border: '1px solid #ddd'
          }}>Plan 2</td>
          <td style={{
            padding: '10px 20px',
            border: '1px solid #ddd'
          }}>$20</td>
        </tr>
        <tr>
          <td style={{
            padding: '10px 20px',
            border: '1px solid #ddd'
          }}>Plan 3</td>
          <td style={{
            padding: '10px 20px',
            border: '1px solid #ddd'
          }}>$30</td>
        </tr>
      </tbody>
    </table>
  );
}