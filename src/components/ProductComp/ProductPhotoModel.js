import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  VStack,
  Input,
  SimpleGrid,
  Progress,
  Image,
  HStack,
} from "@chakra-ui/react";
import { FcAddImage, FcVideoCall } from "react-icons/fc";
import { BASE_URL } from "../../Config/Url";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
const ProductPhotoModel = ({ isOpen, onClose, showRow }) => {
  // Update Photos
  const [Images, AddImages] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [UploadedImages, setUploadedImages] = useState(false);

  // FOr Videos
  const [UploadedVideos, setUploadedVideos] = useState(false);
  const [Videoname, setVideoname] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [Videos, AddVideos] = useState([]);

  const [videoURL, setVideoURL] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);

  const [photoProgress, setPhotoProgress] = useState(0);
  const [isProgressBar, setIsProgressBar] = useState(false);

  const photoRef = useRef();
  const videoRef = useRef();

  const P_PhotoUpload_Config = {
    onUploadProgress: (progressEvent) => {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(percentCompleted);
      setIsProgressBar(true);
      setPhotoProgress(percentCompleted);
    },
  };

  const ProductPhotoUpload = async (productImage, productName, purpose) => {
    let formData = new FormData();
    formData.append("UploadPhoto", productImage);
    formData.append("slug", productName);
    formData.append("purpose", purpose);

    return await axios
      .post(`${BASE_URL}/UploadPhoto`, formData, P_PhotoUpload_Config)
      .then((resp) => {
        console.log(resp.data);
        AddImages([...Images, resp.data?.path]);
        // setIsProgressBar(false);
      })
      .catch((error) => {
        console.log(error);
        // setIsProgressBar(false);
      });
  };

  const SelectProductImages = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const previewImage = URL.createObjectURL(e.target.files[0]);
    setUploadedImages(true);
    setPreviewImage(previewImage);
    ProductPhotoUpload(
      e.target.files[0],
      showRow.productname,
      "productPhoto"
    ).then((resp) => {
      setUploadedImages(false);
    });
  };

  // Video Uploading
  const V_VideoUpload_Config = {
    onUploadProgress: (progressEvent) => {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(percentCompleted);
      setIsProgressBar(true);
      setVideoProgress(percentCompleted);
    },
  };

  const ProductVideoUpload = async (productImage, productName, purpose) => {
    let formData = new FormData();
    formData.append("UploadPhoto", productImage);
    formData.append("slug", productName);
    formData.append("purpose", purpose);

    return await axios
      .post(`${BASE_URL}/UploadPhoto`, formData, V_VideoUpload_Config)
      .then((resp) => {
        console.log(resp.data);
        AddVideos([resp.data?.path]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleVideos = async (e) => {
    const file = e.target.files[0];
    if (file !== undefined) {
      setVideoname(file.name);
      console.log(file);

      setUploadedVideos(true);
      ProductVideoUpload(
        e.target.files[0],
        showRow.productname,
        "productVideo"
      ).then((resp) => {
        setUploadedVideos(false);
      });
    }
  };

  useEffect(() => {
    if (showRow.productimage) {
      AddImages(showRow.productimage);
    }
    if (showRow.productvideo) {
      // AddVideos([showRow.productvideo]);
      setVideoURL(showRow.productvideo);
    }
  }, [showRow.productimage, showRow.productvideo]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        AddImages([]);
        setVideoURL("");
        onClose();
      }}
      size={["xs", "lg", "xl"]}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Photo Upload</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Box boxSize={["xxs", "sm", "lg"]}>
              <Box w={"full"}>
                <Text textAlign={"left"}>Photos</Text>
                <Input
                  type="file"
                  onChange={SelectProductImages}
                  hidden
                  ref={photoRef}
                />
                <SimpleGrid columns={3} spacing={[5, 10]}>
                  {Images.map((image, index) => {
                    return (
                      <div
                        key={index.toString()}
                        className="mr-2 hover:cursor-pointer relative"
                        onClick={async () => {
                          // console.log("click");
                          await axios
                            .post(`${BASE_URL}/DeletePhoto`, {
                              photoURL: image,
                              purpose: "DELproductsPhoto",
                            })
                            .then((resp) => {
                              console.log(resp.data);
                              let deleteImage = Images.filter(
                                (img) => img !== image
                              );
                              AddImages(deleteImage);
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        }}
                      >
                        <Box
                          w={"full"}
                          h={"full"}
                          position={"relative"}
                          _hover={{ opacity: 0.5, cursor: "pointer" }}
                        >
                          <Box
                            position={"absolute"}
                            w={"full"}
                            h={"full"}
                            display={"flex"}
                            alignItems={"flex-end"}
                            justifyContent={"end"}
                          >
                            <AiOutlineDelete color="red" size={30} />
                          </Box>
                          <Image src={image} width={"150px"} />
                        </Box>
                      </div>
                    );
                  })}
                  {UploadedImages && (
                    <div>
                      <Image src={previewImage} width={"150px"} />
                      <Progress h={"1"} mt={"2"} value={photoProgress} />
                    </div>
                  )}
                  <Box height="80px">
                    <Box
                      _hover={{ cursor: "pointer" }}
                      onClick={() => photoRef.current.click()}
                    >
                      <FcAddImage fontSize={80} />
                    </Box>
                  </Box>
                </SimpleGrid>
              </Box>
              {/* For Videos */}
              <Box w={"full"}>
                <Text textAlign={"left"}>Videos</Text>
                <Input
                  type="file"
                  onChange={handleVideos}
                  hidden
                  ref={videoRef}
                />
                {/* <HStack>
                  <Input
                    type="text"
                    onChange={(e) => setVideoURL(e.target.value)}
                    value={videoURL}
                  />
                  <Button
                    colorScheme="teal"
                    isLoading={videoLoading}
                    onClick={async () => {
                      setVideoLoading(true);
                      // console.log(showRow.productname);
                      return await axios
                        .post(`${BASE_URL}/ProductVideo`, {
                          productname: showRow.productname,
                          videoURL: videoURL,
                        })
                        .then((resp) => {
                          console.log(resp.data);
                          setVideoLoading(false);
                        })
                        .catch((error) => {
                          console.log(error);
                          setVideoLoading(false);
                        });
                    }}
                  >
                    Save
                  </Button>
                </HStack> */}
                <SimpleGrid columns={4} spacing={10}>
                  {Videos.map((video, index) => {
                    return (
                      <div
                        key={index.toString()}
                        className="mr-2 hover:cursor-pointer relative"
                        onClick={async () => {
                          await axios
                            .post(`${BASE_URL}/DeletePhoto`, {
                              photoURL: video,
                              purpose: "DELproductsVideo",
                            })
                            .then((resp) => {
                              console.log("deleted");
                              AddVideos([]);
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        }}
                      >
                        <Box
                          w={"full"}
                          h={"full"}
                          position={"relative"}
                          _hover={{ opacity: 0.5, cursor: "pointer" }}
                        >
                          <Box
                            position={"absolute"}
                            w={"full"}
                            h={"full"}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"end"}
                          >
                            <AiOutlineDelete color="red" size={30} />
                          </Box>
                          <FcVideoCall fontSize={80} />
                        </Box>
                      </div>
                    );
                  })}
                  {UploadedVideos && (
                    <div>
                      <Box height="80px">
                        <Box
                          _hover={{ cursor: "pointer" }}
                          onClick={() => videoRef.current.click()}
                        >
                          <FcVideoCall fontSize={80} />
                        </Box>
                      </Box>
                      <Text fontSize={"xs"}>{Videoname}</Text>
                      <Progress h={"1"} mt={"2"} value={videoProgress} />
                    </div>
                  )}
                  <Box height="80px">
                    <Box
                      _hover={{ cursor: "pointer" }}
                      onClick={() => videoRef.current.click()}
                    >
                      <FcVideoCall fontSize={80} />
                    </Box>
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              AddImages([]);
              AddVideos([]);
              onClose();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductPhotoModel;
