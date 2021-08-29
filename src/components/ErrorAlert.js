import {Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton} from "@chakra-ui/react";

const ErrorAlert = ({errorMessage}) => {
    return (
        <Alert status="error">
            <AlertIcon/>
            <Box flex="1">
                <AlertTitle>Authentication has failed</AlertTitle>
                <AlertDescription display="block">
                    {errorMessage}
                </AlertDescription>
            </Box>
            <CloseButton position="absolute" right="8px" top="8px"/>
        </Alert>
    );
}

export default ErrorAlert;

