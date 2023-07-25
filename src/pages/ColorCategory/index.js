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
import React, { useState } from "react";
import AddCategoryModel from "../../components/AddCategoryModel";
import { Field, Form, Formik } from "formik";
import { ColorsCategory } from "../../Config/colors";

const ColorCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function validateName(value) {
    let error;
    if (!value) {
      error = "Color Name is required";
    }
    return error;
  }
  return (
    <Box>
      <AddCategoryModel
        isOpen={isOpen}
        onClose={onClose}
        ModalTitle={"Add Color Category"}
        modelBody={
          <Formik
            initialValues={{ colorname: "", color: "", colorCode: "" }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props) => (
              <Form>
                <VStack>
                  <Field name="colorname" validate={validateName}>
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
                  <Field name="colorCode" validate={validateName}>
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
                  <Field name="color" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.color && form.touched.color}
                        isRequired
                      >
                        <FormLabel>Color</FormLabel>
                        <HStack>
                          {/* <Input {...field} list="color" placeholder="Color" /> */}
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
                          {/* <Box
                            p={"4"}
                            bgColor={"black"}
                            rounded={"full"}
                            onClick={() => console.log(field.value)}
                          ></Box> */}
                        </HStack>
                        <FormErrorMessage>{form.errors.color}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
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
                    Submit
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
    </Box>
  );
};

export default ColorCategory;
