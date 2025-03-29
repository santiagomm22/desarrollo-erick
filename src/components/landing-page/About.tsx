import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <section className="flex flex-col md:flex-row items-center p-8">
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold" style={{ color: "#2d6c0d" }}>
          Award Winning Interior Design Studio
        </h2>
        <p className="mt-4 text-gray-600">
          We are a residential interior design firm located in Portland. Our
          boutique studio offers more than 20 years experience in custom
          renovations, new home finishes and furnishing design. We can help with
          all aspects of your project: from design concepts and putting together
          the construction team, to sourcing furniture and art. While tending to
          the thousands of details it takes to create a custom home tailored to
          your lifestyle.
        </p>
        <Button
          style={{ backgroundColor: "#2d6c0d" }}
          asChild
          className="mt-4 text-white hover:bg-teal-900 rounded-full px-6 py-2 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Link to="/login">Ingresar</Link>
        </Button>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0 p-4 bg-white rounded-lg shadow-lg">
        <p className="text-gray-600 italic">
          "It was a very smooth process working with the team of Interio. The
          technicians are well experienced and were able to understand my
          requirements thoroughly."
        </p>
        <p className="mt-4 font-semibold">Lisa B.</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">★★★★★</span>
          <span className="ml-2 text-gray-600">48 reviews at Yelp</span>
        </div>
      </div>
    </section>
  );
};
