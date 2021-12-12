import { useEffect, useState } from "react";
import CustomerData from "../components/customerData";
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
  Radio,
  Text
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
      <Heading as="h2" my={2} textAlign="center">
        Customer Data
      </Heading>
      <Flex mt={12} align="center" justify="center">
        <Stack>
            <Heading mb={6} as="h2">
              Name:
            </Heading>
            <Heading mb={6} as="h2">
              Phone:
            </Heading>
            <Heading mb={6} as="h2">
              Credit Card:
            </Heading>
        </Stack>
        {data.length > 0 ? (
          data.map((d) => (
            <CustomerData key={d.data.telephone} creditCard={d.data.creditCard.number} firstName={d.data.firstName} lastName={d.data.lastName} telephone={d.data.telephone} 
            />
          ))
        ) : (
          <>
            <Text>Loading</Text>
          </>
        )}
      </Flex>
    </Box>
  );
}
