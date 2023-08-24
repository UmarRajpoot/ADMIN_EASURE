import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";

import { FaUserAlt, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../Config/Url";
import { Auth_Data } from "../../Store/Auth/AuthActions";
import { useNavigate } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const AuthState = useSelector((state) => state.Auths.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loginAdmin = async () => {
    return await axios
      .post(`${BASE_URL}/login`, {
        email: email,
        password: password,
      })
      .then((resp) => {
        // console.log(resp.data);
        dispatch(Auth_Data(resp.data.response));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome To EASURE</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Stack
            spacing={4}
            p="1rem"
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
          >
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.700" />}
                />
                <Input
                  type="email"
                  placeholder="email address"
                  bgColor={"gray.200"}
                  color={"black"}
                  _placeholder={{ color: "gray.600" }}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.700" />}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  bgColor={"gray.200"}
                  color={"black"}
                  _placeholder={{ color: "gray.600" }}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    bgColor={"gray.300"}
                    onClick={handleShowClick}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
              onClick={() => {
                if (email !== "" && password !== "") {
                  loginAdmin();
                }
              }}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Auth;
