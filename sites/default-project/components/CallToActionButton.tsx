use client;

export default function CallToActionButton({ text }) {
  return (
    <button style={{
      backgroundColor: '#3498db',
      color: '#ffffff',
      border: 'none',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer'
    }}>
      {text}
    </button>
  );
}