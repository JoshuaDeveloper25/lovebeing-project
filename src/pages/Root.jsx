import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../styles/animations.css'

const Root = () => {
  return (
    <section>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer></footer>
    </section>
  );
};

export default Root;
