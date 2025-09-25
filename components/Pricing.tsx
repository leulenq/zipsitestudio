
import type { ReactNode } from 'react';

const Pricing = () => {
  return (
    <section>
      <h2>Care Levels and Pricing Info</h2>
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Basic</td>
            <td>$100/day</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Pricing;
