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

interface props {
  isbn: number;
  title: string;
  bookAuthors?: string[];
  bookCoverUrl?: string;
  totalAmt: number;
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
        <Image h={"120px"} w={"full"} src={bookCoverUrl} objectFit={"cover"} />
        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
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
        </Box>
      </Box>
    </Center>
  );
};

export default socialProfileWithImage;
