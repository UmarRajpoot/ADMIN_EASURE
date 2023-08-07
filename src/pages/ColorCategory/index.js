import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Select,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AddCategoryModel from "../../components/AddCategoryModel";
import { Field, Form, Formik } from "formik";
import { ColorsCategory } from "../../Config/colors";
import axios from "axios";
import { BASE_URL } from "../../Config/Url";
import { useDispatch, useSelector } from "react-redux";
import { Colors_Data } from "../../Store/Categories/CategoriesActions";
import ListCategory from "../../components/ListCategory";

const ColorCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Colors = useSelector((state) => state.Categories.Colors);
  const getallTypes = useSelector((state) => state.Categories.Type);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [colorPhotoFile, setColorPhotoFile] = useState("");

  function validateName(value, field) {
    let error;
    if (!value) {
      error = `${field} is required`;
    }
    return error;
  }

  const getallColors = async () => {
    setIsLoading(true);
    return await axios
      .get(`${BASE_URL}/Colors`)
      .then((resp) => {
        // console.log(resp.data);
        dispatch(Colors_Data(resp.data.response));
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  const delteColorPhoto = async (purpose, photoUrl) => {
    let formData = new FormData();
    formData.append("purpose", purpose);
    formData.append("photoURL", photoUrl);
    return await axios
      .post(`${BASE_URL}/DeletePhoto`, formData)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteDB = async (id) => {
    return await axios
      .delete(`${BASE_URL}/Colors`, {
        data: {
          name: id,
        },
      })
      .then(() => {
        getallColors();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const deleteRecord = async (id, photoUrl) => {
    await delteColorPhoto("DELcolorsCatPhoto", photoUrl).then((resp) => {
      deleteDB(id);
    });
  };

  const AddColors = async (name, code, colorType) => {
    return await axios
      .post(`${BASE_URL}/Colors`, {
        name: name,
        colorcode: code,
        colorType: colorType,
      })
      .then((resp) => {
        getallColors();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    getallColors();
  }, []);

  const config = {
    onUploadProgress: (progressEvent) => {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      // setIsProgressBar(true);
      // setProgress(percentCompleted);
    },
  };

  const ColorsPhotoUpload = async (colorImage, colorname, purpose) => {
    let formData = new FormData();
    formData.append("UploadPhoto", colorImage);
    formData.append("slug", colorname);
    formData.append("purpose", purpose);

    return await axios
      .post(`${BASE_URL}/UploadPhoto`, formData, config)
      .then((resp) => {
        console.log(resp.data);
        // setIsProgressBar(false);
      })
      .catch((error) => {
        console.log(error);
        // setIsProgressBar(false);
      });
  };

  return (
    <Box>
      <AddCategoryModel
        isOpen={isOpen}
        onClose={onClose}
        ModalTitle={"Add Color Category"}
        modelBody={
          <Formik
            initialValues={{ colorname: "", colorCode: "", colorPhoto: "" }}
            onSubmit={async (values, actions) => {
              await AddColors(
                values.colorname,
                values.colorCode,
                values.type_name
              )
                .then(() => {
                  ColorsPhotoUpload(
                    colorPhotoFile,
                    values.colorname,
                    "colorsCatPhoto"
                  ).then(() => {
                    actions.setSubmitting(false);
                    onClose();
                  });
                })
                .catch((error) => {
                  actions.setSubmitting(false);
                  onClose();
                });
            }}
          >
            {(props) => (
              <Form>
                <VStack>
                  <Field
                    name="type_name"
                    validate={(value) => validateName(value, "Type")}
                  >
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.type_name && form.touched.type_name
                        }
                        isRequired
                      >
                        <FormLabel>Type Name</FormLabel>
                        <Select {...field} placeholder="Type Name">
                          {getallTypes.map((type, index) => {
                            return (
                              <option value={type.name} key={index.toString()}>
                                {type.name.toUpperCase()}
                              </option>
                            );
                          })}
                        </Select>
                        <FormErrorMessage>
                          {form.errors.type_name}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name="colorname"
                    validate={(value) => validateName(value, "Color Name")}
                  >
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.colorname && form.touched.colorname
                        }
                        isRequired
                      >
                        <FormLabel>Color Name</FormLabel>
                        <Input {...field} placeholder="Color Name" />
                        <FormErrorMessage>
                          {form.errors.colorname}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name="colorCode"
                    validate={(value) => validateName(value, "Color Code")}
                  >
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.colorCode && form.touched.colorCode
                        }
                        isRequired
                      >
                        <FormLabel>Color Code</FormLabel>
                        <Input {...field} placeholder="Color Code" />
                        <FormErrorMessage>
                          {form.errors.colorCode}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name="colorPhoto"
                    validate={(value) => validateName(value, "Colors Photo")}
                  >
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.colorPhoto && form.touched.colorPhoto
                        }
                        isRequired
                        onChange={(e) => {
                          // console.log(e.target.files[0]);
                          setColorPhotoFile(e.target.files[0]);
                        }}
                      >
                        <FormLabel>Colors Photo</FormLabel>
                        <Input
                          {...field}
                          type="file"
                          placeholder="Colors Photo"
                        />
                        <FormErrorMessage>
                          {form.errors.colorPhoto}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* <Field name="color" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.color && form.touched.color}
                        isRequired
                      >
                        <FormLabel>Color</FormLabel>
                        <HStack>

                          <Select
                            {...field}
                            variant="outline"
                            placeholder="Color"
                          >
                            {ColorsCategory.map((color, index) => {
                              return (
                                <option
                                  key={index.toString()}
                                  value={color.name}
                                >
                                  {color.name}
                                </option>
                              );
                            })}
                          </Select>
                          {ColorsCategory.map((color) => {
                            if (field.value === color.name) {
                              return (
                                <Box
                                  p={"4"}
                                  bgColor={color.code}
                                  rounded={"full"}
                                  border={"1px"}
                                  borderColor={"gray"}
                                ></Box>
                              );
                            }
                          })}
                        </HStack>
                        <FormErrorMessage>{form.errors.color}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field> */}
                </VStack>
                <HStack
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                  mb={"3"}
                >
                  <Button
                    mt={4}
                    colorScheme="gray"
                    onClick={onClose}
                    type="button"
                  >
                    Close
                  </Button>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Add
                  </Button>
                </HStack>
              </Form>
            )}
          </Formik>
        }
      />
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Heading size={"md"} my={"2"}>
          Color Category
        </Heading>
        <Button colorScheme={"blue"} onClick={() => onOpen()}>
          Add New Color
        </Button>
      </Box>
      <ListCategory
        THeadsList={["NAME", "Color", "COLORTYPE", "Photo"]}
        ListData={Colors}
        deleteRecord={deleteRecord}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default ColorCategory;
