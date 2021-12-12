import { useEffect, useState } from "react";
import {
  Heading,
  Flex,
  Stack,
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio
} from "@chakra-ui/core";

export default function Home() {
  const [data, setData] = useState([]);
  async function getData() {
    const res = await fetch("/api/getCustomers");
    const newData = await res.json();
    setData(newData);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box>
      <Heading as="h1" my={2} textAlign="center">
        NextJS, FaunaDB, and Serverless
      </Heading>
      <Heading as="h3" my={2} textAlign="center">
        Customer Data
      </Heading>
    </Box>
  );
}
