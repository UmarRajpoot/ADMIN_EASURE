import React, { useEffect } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { BiSolidDashboard, BiCategory } from "react-icons/bi";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { FaProductHunt } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { BsPersonPlus } from "react-icons/bs";
import { PiGraphLight } from "react-icons/pi";
import { FiType } from "react-icons/fi";
import { RxFontStyle } from "react-icons/rx";
import { MdOutlineFormatSize } from "react-icons/md";
import { FiPackage } from "react-icons/fi";

import {
  Link as BrowserRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../Config/Url";
import axios from "axios";
import {
  Colors_Data,
  PCat_Data,
  PersonCat_Data,
  Sizes_Data,
  TypesStyle_Data,
  Types_Data,
  Varients_Data,
} from "../../Store/Categories/CategoriesActions";
import { Auth_Data } from "../../Store/Auth/AuthActions";

const LinkItems = [
  { name: "Home", icon: BiSolidDashboard, To: "/" },
  { name: "Parent Category", icon: BiCategory, To: "/parent-category" },
  {
    name: "Person Category",
    icon: BsPersonPlus,
    To: "/person-category",
  },
  { name: "Varient Category", icon: PiGraphLight, To: "/varient-category" },
  { name: "Type Category", icon: FiType, To: "/type-category" },
  { name: "Type Style", icon: RxFontStyle, To: "/type-style-category" },
  { name: "Sizes", icon: MdOutlineFormatSize, To: "/sizes-category" },
  { name: "Color Category", icon: HiOutlineColorSwatch, To: "/color-category" },
  { name: "Products", icon: FaProductHunt, To: "/products" },
  { name: "Orders", icon: FiPackage, To: "/orders" },
  { name: "Reviews", icon: MdReviews, To: "/reviews" },
];

const SidebarWithHeader = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

const SidebarContent = ({ onClose, ...rest }) => {
  const location = useLocation();

  const dispatch = useDispatch();

  let urls = [
    `${BASE_URL}/PCateg`,
    `${BASE_URL}/PersonCateg`,
    `${BASE_URL}/Varient`,
    `${BASE_URL}/Type`,
    `${BASE_URL}/TypeStyle`,
    `${BASE_URL}/Sizes`,
    `${BASE_URL}/Colors`,
    `${BASE_URL}/Order`,
  ];

  const requests = urls.map(async (url) => await axios.get(url));

  const getAllAxiosResponses = async () => {
    return await axios
      .all(requests)
      .then((responses) => {
        dispatch(PCat_Data(responses[0].data.response));
        dispatch(PersonCat_Data(responses[1].data.response));
        dispatch(Varients_Data(responses[2].data.response));
        dispatch(Types_Data(responses[3].data.response));
        dispatch(TypesStyle_Data(responses[4].data.response));
        dispatch(Sizes_Data(responses[5].data.response));
        dispatch(Colors_Data(responses[6].data.response));
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    getAllAxiosResponses();
  }, []);
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box w={"full"} h={"100vh"} overflow={"auto"}>
        {LinkItems.map((link, index) => (
          <Link
            key={index.toString()}
            as={BrowserRouter}
            to={link.To}
            style={{ textDecoration: "none" }}
          >
            <NavItem
              key={link.name}
              icon={link.icon}
              bgColor={link.To === location.pathname ? "blue.500" : "white"}
              color={link.To === location.pathname ? "white" : "black"}
            >
              {link.name}
            </NavItem>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "blue.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="20"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const AuthState = useSelector((state) => state.Auths.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // console.log("Nav", AuthState);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1621382616908-0b7509149871?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{AuthState?.firstname}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              {/* <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem> */}
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  dispatch(Auth_Data([]));
                  navigate("/auth");
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default SidebarWithHeader;
