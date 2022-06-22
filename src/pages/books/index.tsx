import { Flex } from "@chakra-ui/react";
import React from "react";
import BookCard from "../../components/BookCard";
import Navbar from "../../components/Navbar";
import { SimpleGrid, GridItem } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import {
  Author,
  AuthorsOnBook,
  Book,
  CategoriesOnBook,
  Category,
} from "@prisma/client";
import { prisma } from "../../db/client";

interface props {
  books: (Book & {
    authors: (AuthorsOnBook & {
      author: Author;
    })[];
    categories: (CategoriesOnBook & {
      category: Category;
    })[];
  })[];
}

const BookList: NextPage<props> = ({ books }) => {
  return (
    <>
      <Navbar />
      <Flex justifyContent="center" alignItems="center">
        <header style={{ marginTop: "1%", fontSize: "200%" }}>Book List</header>
      </Flex>

      <SimpleGrid templateColumns="repeat(auto-fill, minmax(250px, 1fr))">
        {books &&
          books.map((book) => {
            return (
              <div key={book.isbn} style={{ margin: 10, padding: 0 }}>
                <GridItem padding={0} margin={0}>
                  <BookCard
                    isAvaliable={true}
                    key={book.isbn}
                    title={book.title}
                    bookAuthors={book.authors?.map(
                      (author) => author.author.name
                    )}
                    isbn={book.isbn}
                    bookCoverUrl={book.thumbnailUrl}
                  />
                </GridItem>
              </div>
            );
          })}
      </SimpleGrid>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const books = await prisma.book.findMany({
    include: {
      authors: { include: { author: true } },
      categories: { include: { category: true } },
    },
  });

  return {
    props: { books },
  };
};

export default BookList;
