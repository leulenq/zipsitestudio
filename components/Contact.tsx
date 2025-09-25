
import type { ReactNode } from 'react';

const Contact = () => {
  return (
    <section>
      <h2>Get in Touch</h2>
      <form>
        <input type='text' placeholder='Name' />
        <input type='email' placeholder='Email' />
        <textarea placeholder='Message' />
        <button>Send</button>
      </form>
      <p>Phone: 555-555-5555</p>
      <p>Address: 123 Main St, Anytown, WA 12345</p>
    </section>
  );
};

export default Contact;
