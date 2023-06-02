import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  // const history = createBrowserHistroy();
  const history = useNavigate();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email) {
      toast({
        title: "Please fill all feild",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://mern-chat-app-server-66of.onrender.com/api/user/login",
        { name, email, password },
        config
      );
      toast({
        title: "login Successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      history("/chat");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <div>
      <VStack spacing="5px">
        {/* --------- */}
        <FormControl id="first-name" isRequired className="inputfeild">
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></Input>
        </FormControl>
        {/* --------- */}
        <FormControl id="email" isRequired className="inputfeild">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            placeholder="Enter Your email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </FormControl>
        {/* --------- */}
        <FormControl id="password" isRequired className="inputfeild">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              value={password}
              type={show ? "text" : "password"}
              placeholder="Enter Your password"
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {/* --------- */}

        <Button
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          className="customize_btn"
        >
          Login
        </Button>
        {/* ---------------------- */}
        {/* <Button
          variant="solid"
          colorScheme="red"
          width="100%"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
            setName("guest");
          }}
        >
          Get Guest User Credentials
        </Button> */}
      </VStack>
    </div>
  );
};

export default Login;
