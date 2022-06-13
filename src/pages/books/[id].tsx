/* eslint-disable react-hooks/rules-of-hooks */
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";

const isbn: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query);
  }, []);

  console.log(router.query);
  return (
    <div>
      <Flex>
        <h1>buh</h1>
      </Flex>
    </div>
  );
};

export default isbn;
