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
  Text,
  ThemeProvider
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
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({data: formData})
  }

  async function getData() {
    const res = await fetch("/api/getCustomers");
    const newData = await res.json();
    setData(newData);
  }

  async function addCustomer() {
    await fetch("api/newCustomer", requestOptions).then(() => getData()).catch((e) => console.log(e));
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
    <ThemeProvider>
    <Box>
      <Heading as="h1" my={2} textAlign="center">
        NextJS, FaunaDB, and Serverless
      </Heading>
      <Heading as="h2" my={2} textAlign="center">
        Customer Data
      </Heading>
      <Flex mt={12} align="center" justify="center">
        <Stack>
            <Heading mb={6} as="h4">
              Name:
            </Heading>
            <Heading mb={6} as="h4">
              Phone:
            </Heading>
            <Heading mb={6} as="h4">
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
          <FormControl>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input type="text" name="firstName" id="firstName" onChange={handleChange} />
            
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input type="text" name="lastName" id="lastName" onChange={handleChange} />
            
            <FormLabel htmlFor="streetAddress">Street Address</FormLabel>
            <Input type="text" name="streetAddress" id="streetAddress" onChange={handleChange} />

            <Stack isInline mt={2}>
              <FormLabel mt={2} htmlFor="city">
                City
              </FormLabel>
              <Input type="text" id="city" name="city" onChange={handleChange}/>
              <FormLabel mt={2} htmlFor="state">
                State
              </FormLabel>
              <Input type="text" id="state" name="state" onChange={handleChange}/>
              <FormLabel mt={2} htmlFor="zipCode">
                Zip Code
              </FormLabel>
              <Input type="text" id="zipCode" name="zipCode" onChange={handleChange}/>
            </Stack>
          
            <FormLabel mt={2} htmlFor="phoneNumber">
                Phone Number
            </FormLabel>
            <Input type="text" id="phoneNumber" name="phoneNumber" onChange={handleChange}/>

            <RadioGroup name="cardType" my={4} spacing={8} isInline>
              <Radio onChange={handleChange} name="Visa" value="Visa" label="Visa">
                Visa
              </Radio>
              <Radio onChange={handleChange} name="Mastercard" value="Mastercard" label="Mastercard">
                Mastercard
              </Radio>
              <Radio onChange={handleChange} name="Amex" value="Amex" label="Amex">
                American Express
              </Radio>
            </RadioGroup>
            <FormLabel mt={2} htmlFor="cardNumber">
                Card Number
              </FormLabel>
              <Input type="number" id="cardNumber" name="cardNumber" onChange={handleChange}/>
          <Button type="submit" my={8} ml="20%" width="50%" size="md" border="2px" borderColor="green.500">
            Add Customer
          </Button>
          </FormControl>
        </form>
      </Flex>
    </Box>
    </ThemeProvider>
  );
}
