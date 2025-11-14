export default function TestButton() {
  return (
    <button
      onClick={() => alert('React is working!')}
      style={{
        backgroundColor: '#14b8a6',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
      }}
    >
      TEST - Click Me
    </button>
  );
}
