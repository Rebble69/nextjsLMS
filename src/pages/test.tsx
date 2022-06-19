/* eslint-disable react-hooks/rules-of-hooks */
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { trpc } from "../lib/trpc";

const test: NextPage = () => {
  const [book, setBook] = useState<any>("no book yet");

  const mutation = trpc.useMutation(["book.create"]);

  useEffect(() => {
    mutation.mutate({
      isbn: 9780755503261,
      authors: ["the imposter"],
      categories: ["Juvenile Nonfiction"],
      description: "funny among us",
      title: "100% Unofficial Among Us Playbook",
    });
  }, []);

  return <div>{book}</div>;
};

export default test;
