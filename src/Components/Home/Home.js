import React, { useEffect } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // const history = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      // history("/chat");
    }
  }, []);

  return (
    <Container maxW="xl">
      <Box
        p={3}
        bg={"white"}
        w="100%"
        m="0px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        className="logtitile"
      >
        <Text fontSize="2xl">Meet-All</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb="1rm">
            <Tab width="100%">Login</Tab>
            <Tab width="100%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login></Login>
            </TabPanel>
            <TabPanel>
              <SignUp></SignUp>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
