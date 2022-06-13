import { Flex } from "@chakra-ui/react";
import React from "react";
import BookCard from "../../components/BookCard";
import Navbar from "../../components/Navbar";
import { SimpleGrid, GridItem } from "@chakra-ui/react";

const arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

function BookList() {
  return (
    <>
      <Navbar />
      <Flex justifyContent="center" alignItems="center">
        <header style={{ marginTop: "1%", fontSize: "200%" }}>Book List</header>
      </Flex>

      <SimpleGrid templateColumns="repeat(auto-fill, minmax(250px, 1fr))">
        {arr.map((book) => {
          return (
            <div key={book + "1"} style={{ margin: 10, padding: 0 }}>
              <GridItem padding={0} margin={0}>
                <BookCard
                  isAvaliable={true}
                  key={book}
                  totalAmt={12}
                  title="lorem"
                  bookAuthors={["John Doe", "Jane Doe"]}
                  isbn={93849839843}
                  bookCoverUrl="https://books.google.com/books/content?id=2xaUrgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                />
              </GridItem>
            </div>
          );
        })}
      </SimpleGrid>
    </>
  );
}

export default BookList;
