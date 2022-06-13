/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";

interface props {
  isbn: number;
  title: string;
  bookAuthors: string[] | null;
  bookCoverUrl: string | null;
  isAvaliable: boolean;
}

const socialProfileWithImage: NextPage<props> = ({
  isbn,
  title,
  bookCoverUrl,
  bookAuthors,
  isAvaliable,
}) => {
  return (
    <Center py={6}>
      <Box
        maxW={"270px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={
            bookCoverUrl ||
            "https://cdn-d8.nypl.org/s3fs-public/blogs/J5LVHEL.jpg"
          }
          objectFit={"cover"}
        />
        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading
              fontSize={"20"}
              textAlign="center"
              fontWeight={500}
              fontFamily={"body"}
            >
              {title}
            </Heading>
            <Text color={"gray.500"}>
              {bookAuthors?.join(", ") || "[NO AUTHORS]"}
            </Text>
          </Stack>
          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text
                fontWeight={600}
                style={{ color: isAvaliable ? "green" : "red" }}
              >
                {isAvaliable ? "AVALIABLE" : "UNAVALIABLE"}
              </Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Avaliablity
              </Text>
            </Stack>
          </Stack>
          <Link href={`/books/${isbn}`}>
            <Button
              w={"full"}
              mt={8}
              bg={useColorModeValue("#151f21", "gray.900")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Details
            </Button>
          </Link>
        </Box>
      </Box>
    </Center>
  );
};

export default socialProfileWithImage;
