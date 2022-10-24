import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const App = () => {
  return (
    <div className="font-poppins">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default App;
