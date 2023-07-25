import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import ProductList from "./ProductList";
import AddCategoryModel from "../../components/AddCategoryModel";
import { Field, Form, Formik } from "formik";

const Products = () => {
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
        ModalTitle={"Add Product"}
        modelBody={
          <Formik
            initialValues={{ productname: "" }}
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
                  <Field name="productname" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.productname && form.touched.productname
                        }
                        isRequired
                      >
                        <FormLabel>Product Name</FormLabel>
                        <Input {...field} placeholder="Product Name" />
                        <FormErrorMessage>
                          {form.errors.productname}
                        </FormErrorMessage>
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
          Products
        </Heading>
        <Button colorScheme="blue" onClick={() => onOpen()}>
          Add New Product
        </Button>
      </Box>
      <ProductList />
    </Box>
  );
};

export default Products;
