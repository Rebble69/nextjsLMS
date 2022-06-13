/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { NextPage } from "next";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

const SpecificBook: NextPage = () => {
  const router = useRouter();

  if (!router.isReady) return <h2>loading...</h2>;

  const { isbn } = router.query;

  return (
    <div>
      <Navbar />
      <h1>{isbn}</h1>
    </div>
  );
};

export default SpecificBook;
