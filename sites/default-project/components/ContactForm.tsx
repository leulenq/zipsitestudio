use client;

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required value={name} onChange={(event) => setName(event.target.value)} />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" required value={message} onChange={(event) => setMessage(event.target.value)}></textarea>
      <button type="submit">Submit</button>
      {submitted && <p>Thank you for submitting the form.</p>}
    </form>
  );
}