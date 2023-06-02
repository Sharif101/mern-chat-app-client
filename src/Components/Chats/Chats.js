import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../miscellaneous/SideDrawer";
import { Box } from "@chakra-ui/react";
import MyChats from "../MyChats";
import ChatBox from "../ChatBox";
import "./Chats.css";
// import chatData from "../../../../backend/data/data";

const Chats = () => {
  // let [chats, setChats] = useState([]);
  // const fetchChats = async () => {
  //   const { data } = await axios.get("https://mern-chat-app-server-66of.onrender.com/api/chat");
  //   setChats(data);
  // };

  // useEffect(() => {
  //   fetchChats();
  // }, []);

  // --------------------

  //   let [chatData, setChaData] = useState([]);

  //   useEffect(() => {
  //     fetch("")
  //       .then((res) => res.json())
  //       .then((data) => setChaData(data));
  //   }, []);

  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
      {/* {chats.map((chat) => (
        <div>{chat.chatName}</div>
      ))} */}
    </div>
  );
};

export default Chats;
