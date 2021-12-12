import { Divider, Stack, Text, Box } from "@chakra-ui/core";

export default function CustomerData({
    creditCard,
    firstName,
    lastName,
    telephone
}) {
    return(
        <Box>
            <Stack isInline>
                <Box>
                    <Text fontSize="lg" my={4} mx={4}>
                        {firstName} {lastName}
                    </Text>
                </Box>
            </Stack>
            <Divider border="4px" />
            <Stack isInline>
                <Box>
                    <Text fontSize="lg" my={4} mx={4}>
                        {telephone}
                    </Text>
                </Box>
            </Stack>
            <Divider border="4px" />
            <Stack isInline>
                <Box>
                    <Text fontSize="lg" my={4} mx={4}>
                        {creditCard}
                    </Text>
                </Box>
            </Stack>
            <Divider border="4px" />
        </Box>
    )
}