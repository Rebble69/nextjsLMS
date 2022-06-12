import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

export default Home;
