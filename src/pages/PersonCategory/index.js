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
import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import AddCategoryModel from "../../components/AddCategoryModel";
import ListCategory from "../../components/ListCategory";
import { BASE_URL } from "../../Config/Url";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { PersonCat_Data } from "../../Store/Categories/CategoriesActions";

const PersonCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getAllPersonCateg = useSelector((state) => state.Categories.PersonCat);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  function validateName(value) {
    let error;
    if (!value) {
      error = "Person Name is required.";
    }
    return error;
  }

  const getAllPersonCategories = async () => {
    setIsLoading(true);
    return await axios
      .get(`${BASE_URL}/PersonCateg`)
      .then((resp) => {
        dispatch(PersonCat_Data(resp.data.response));
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  const deleteRecord = async (id) => {
    return await axios
      .delete(`${BASE_URL}/PersonCateg`, {
        data: {
          name: id,
        },
      })
      .then(() => {
        getAllPersonCategories();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const AddPersonCategory = async (name) => {
    return await axios
      .post(`${BASE_URL}/PersonCateg`, {
        name: name,
      })
      .then((resp) => {
        getAllPersonCategories();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    getAllPersonCategories();
  }, []);

  return (
    <Box>
      <AddCategoryModel
        isOpen={isOpen}
        onClose={onClose}
        ModalTitle={"Add Person"}
        modelBody={
          <Formik
            initialValues={{ personname: "" }}
            onSubmit={(values, actions) => {
              AddPersonCategory(values.personname)
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
                  <Field name="personname" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.personname && form.touched.personname
                        }
                        isRequired
                      >
                        <FormLabel>Person Name</FormLabel>
                        <Input {...field} placeholder="Person Name" />
                        <FormErrorMessage>
                          {form.errors.personname}
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
          Person Category
        </Heading>
        <Button colorScheme={"blue"} onClick={() => onOpen()}>
          Add New Person
        </Button>
      </Box>
      <ListCategory
        THeadsList={["NAME"]}
        isLoading={isLoading}
        ListData={getAllPersonCateg}
        deleteRecord={deleteRecord}
      />
    </Box>
  );
};

export default PersonCategory;
