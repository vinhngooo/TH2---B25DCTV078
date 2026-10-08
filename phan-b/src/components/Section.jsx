// Component bao ngoài: nội dung bên trong được truyền qua props.children
export default function Section({ title, children }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
