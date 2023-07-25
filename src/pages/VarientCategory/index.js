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
import React from "react";
import AddCategoryModel from "../../components/AddCategoryModel";
import { Field, Form, Formik } from "formik";
import { ColorsCategory } from "../../Config/colors";

const VarientCategory = () => {
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
        ModalTitle={"Add Varient"}
        modelBody={
          <Formik
            initialValues={{ varientname: "" }}
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
                  <Field name="varientname" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.personname && form.touched.varientname
                        }
                        isRequired
                      >
                        <FormLabel>Varient Name</FormLabel>
                        <Input {...field} placeholder="Varient Name" />
                        <FormErrorMessage>
                          {form.errors.varientname}
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
          Varient Category
        </Heading>
        <Button colorScheme={"blue"} onClick={() => onOpen()}>
          Add New Varient
        </Button>
      </Box>
    </Box>
  );
};

export default VarientCategory;
