export default function App({ text }) {
  return (
    <div className="column">
      <div
        className="notification is-primary has-text-centered subtitle"
        style={{ cursor: "pointer" }}
        onClick={() => (location.href = "/" + text)}
      >
        {text}
      </div>
    </div>
  );
}
