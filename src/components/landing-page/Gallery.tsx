export const Gallery = () => {
  return (
    <section className="p-8 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <img
          src="images/foto-ptar.jpg"
          alt="Interior 1"
          className="rounded-lg shadow-lg"
        />
        <img
          src="images/ptar1.jpg"
          alt="Interior 2"
          className="rounded-lg shadow-lg"
        />
        <img
          src="images/ptar2.jpg"
          alt="Interior 3"
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};
