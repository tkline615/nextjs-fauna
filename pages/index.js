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

  const initialFormData = Object.freeze({
    firstName: "",
    lastName: "",
    streetAddress: "", 
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    cardType: "",
    cardNumber: null
  });
  
  const [data, setData] = useState([]);
  const [formData, updateFormData] = useState({});

  async function getData() {
    const res = await fetch("/api/getCustomers");
    const newData = await res.json();
    setData(newData);
  }
  useEffect(() => {
    getData();
  }, []);

const handleChange = (e) => {
  updateFormData( {
    ...formData,
    [e.target.name]: e.target.value 
  })
}

const handleSubmit = (e) => {
  e.preventDefault;
  addCustomer();
}

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
      <Heading as="h4" mt={6} textAlign="center">
        Add a new customer
      </Heading>
      <Flex mt={12} align="center" justify="center">
        <form onSubmit={handleSubmit} method="post">
          <FormControl onChange={handleChange}>

          </FormControl>
        </form>
      </Flex>
    </Box>
  );
}
