import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Form from "./components/form";
import Footer from "./components/footer";

const App = () => {
  return (
    <div className="font-poppins">
      <Navbar />
      <Hero />
      <Form />
      <Footer />
    </div>
  );
};

export default App;
