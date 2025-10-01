use client;

export default function ContactPage() {
  return (
    <>
      <h1>Get in touch</h1>
      <p>Contact us using the form below or visit our office at the address listed.</p>
      <form>
        <input type='text' placeholder='Name' />
        <input type='email' placeholder='Email' />
        <textarea placeholder='Message'></textarea>
        <button>Send</button>
      </form>
      <p>Address: 123 Main St, Anytown, USA</p>
    </>
  );
}