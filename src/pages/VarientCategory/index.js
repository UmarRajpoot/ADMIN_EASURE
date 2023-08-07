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
import { BASE_URL } from "../../Config/Url";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ListCategory from "../../components/ListCategory";
import { Varients_Data } from "../../Store/Categories/CategoriesActions";

const VarientCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const VarientCateg = useSelector((state) => state.Categories.Varient);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  function validateName(value) {
    let error;
    if (!value) {
      error = "Varient Name is required.";
    }
    return error;
  }

  const getAllVartient = async () => {
    setIsLoading(true);
    return await axios
      .get(`${BASE_URL}/Varient`)
      .then((resp) => {
        dispatch(Varients_Data(resp.data.response));
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  const deleteRecord = async (id) => {
    return await axios
      .delete(`${BASE_URL}/Varient`, {
        data: {
          name: id,
        },
      })
      .then(() => {
        getAllVartient();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const AddVarientCategory = async (name) => {
    return await axios
      .post(`${BASE_URL}/Varient`, {
        name: name,
      })
      .then((resp) => {
        getAllVartient();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    getAllVartient();
  }, []);

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
              AddVarientCategory(values.varientname)
                .then(() => {
                  actions.setSubmitting(false);
                  onClose();
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
                  <Field name="varientname" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.varientname && form.touched.varientname
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
      <ListCategory
        THeadsList={["NAME"]}
        ListData={VarientCateg}
        deleteRecord={deleteRecord}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default VarientCategory;
