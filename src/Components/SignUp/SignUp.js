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
import { useToast } from "@chakra-ui/react";
import { sync } from "framer-motion";
import axios from "axios";
// import useHistory from "react-dom";
import { useHistory, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();
  const toast = useToast();
  // const history = useHistory();
  const history = useNavigate();

  const handleClick = () => setShow(!show);
  const handleClick1 = () => setShow1(!show1);
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please seleted  image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Chat-app");
      data.append("cloud_name", "dnvh5aa0j");
      fetch("https://api.cloudinary.com/v1_1/dnvh5aa0j/image/upload", {
        method: "Post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url);
          console.log(data.url);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please seleted  image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  // ----------------------------
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      toast({
        title: "Password Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://mern-chat-app-server-66of.onrender.com/api/user",
        { name, email, password, pic },
        config
      );
      toast({
        title: "Registration Successfull",
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
          ></Input>
        </FormControl>
        {/* --------- */}
        <FormControl id="email" isRequired className="inputfeild">
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Your email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </FormControl>
        {/* --------- */}
        <FormControl id="password" isRequired className="inputfeild">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
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
        <FormControl id="password" isRequired className="inputfeild">
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={show1 ? "text" : "password"}
              placeholder="Enter Your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Input>
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick1}>
                {show1 ? "Hide" : "show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* --------- */}
        <FormControl id="pic" className="inputfeild">
          <FormLabel>Upload your image</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          ></Input>
        </FormControl>
        {/* --------- */}

        <Button
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          customize_btn
          className="customize_btn"
          isLoading={loading}
        >
          Sign Up
        </Button>
      </VStack>
    </div>
  );
};

export default SignUp;
