import { NextPage } from "next";
import React, { useState } from "react";
import SidebarWithNav from "../../components/SidebarWithNav";

import {
  Flex,
  FormControl,
  Input,
  FormLabel,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { GBAPIResponse } from "../../typings/GBApiResponse";
import { trpc } from "../../lib/trpc";

const AddBook: NextPage = () => {
  const toast = useToast();
  const abMutatation = trpc.useMutation(["book.create"]);
  const [bookInfo, setBookInfo] = useState<GBAPIResponse>(
    "no book yet" as unknown as GBAPIResponse
  );

  const addSelectedBookToDB = async () => {
    const {
      imageLinks,
      industryIdentifiers,
      authors,
      categories,
      language,
      title,
      description,
    } = bookInfo.items[0].volumeInfo;

    console.log(categories);

    const isbn = parseInt(
      industryIdentifiers.find((identifier) => identifier.type === "ISBN_13")
        ?.identifier!
    );

    const thumbnailUrl = imageLinks.thumbnail;

    await abMutatation.mutate({
      title,
      description,
      isbn,
      thumbnailUrl,
      authors,
      categories,
      language,
    });
  };

  const gBookApiLookup = async (isbn: string) => {
    const bookInfo = (
      await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
      )
    ).data as GBAPIResponse;

    console.log(bookInfo.totalItems);

    if (bookInfo.totalItems === 0) {
      toast({
        title: "error",
        description:
          "could not automatically find book info, please enter details manually",
        colorScheme: "red",
        duration: 5000,
        status: "error",
        isClosable: true,
      });
      return;
    }

    setBookInfo(bookInfo);
  };

  return (
    <SidebarWithNav>
      <Flex justifyContent="center" alignItems="center">
        <FormControl>
          <FormLabel>ISBN</FormLabel>
          <Input
            type="text"
            onKeyDown={(e) =>
              e.key === "Enter" ? gBookApiLookup(e.currentTarget.value) : null
            }
          ></Input>
          <Button colorScheme="teal" size="lg" onClick={addSelectedBookToDB}>
            Create Book On DB
          </Button>
        </FormControl>
      </Flex>

      <Text fontSize={17}>{JSON.stringify(bookInfo, null, "\t")}</Text>
    </SidebarWithNav>
  );
};

export default AddBook;
