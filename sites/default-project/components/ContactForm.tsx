use client;

export default function ContactForm() {
  return (
    <form>
      <label>Name:</label>
      <input type='text' name='name' />
      <label>Email:</label>
      <input type='email' name='email' />
      <label>Message:</label>
      <textarea name='message'></textarea>
      <button type='submit'>Submit</button>
    </form>
  );
}