import React, { useEffect, useState } from "react";
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
import AddCategoryModel from "../../components/AddCategoryModel";
import ListCategory from "../../components/ListCategory";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { BASE_URL } from "../../Config/Url";
import { useDispatch, useSelector } from "react-redux";
import { getallPCat_Data } from "../../Store/ParentCategory/PCActions";

const PCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const getAllCate = useSelector((state) => state.ParentCategory.PCat);

  const dispatch = useDispatch();

  function validateName(value) {
    let error;
    if (!value) {
      error = "Color Name is required";
    }
    return error;
  }

  const getAllParentCategories = async () => {
    setIsLoading(true);
    return await axios
      .get(`${BASE_URL}/PCateg`)
      .then((resp) => {
        dispatch(getallPCat_Data(resp.data.response));
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  const deleteRecord = async (id) => {
    return await axios
      .delete(`${BASE_URL}/PCateg/`, {
        data: {
          name: id,
        },
      })
      .then(() => {
        getAllParentCategories();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const AddParentCategory = async (name) => {
    return await axios
      .post(`${BASE_URL}/PCateg`, {
        name: name,
      })
      .then((resp) => {
        // console.log(resp.data);
        getAllParentCategories();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    getAllParentCategories();
  }, []);

  return (
    <Box>
      <AddCategoryModel
        isOpen={isOpen}
        onClose={onClose}
        ModalTitle={"Add Parent Category"}
        modelBody={
          <Formik
            initialValues={{ parentCategory: "" }}
            onSubmit={(values, actions) => {
              // setTimeout(() => {
              //   alert(JSON.stringify(values, null, 2));
              //   actions.setSubmitting(false);
              // }, 1000);
              AddParentCategory(values.parentCategory)
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
                  <Field name="parentCategory" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.parentCategory &&
                          form.touched.parentCategory
                        }
                        isRequired
                      >
                        <FormLabel>Category Name</FormLabel>
                        <Input {...field} placeholder="Category Name" />
                        <FormErrorMessage>
                          {form.errors.parentCategory}
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
          Parent Category
        </Heading>
        <Button colorScheme="blue" onClick={() => onOpen()}>
          Add Parent Category
        </Button>
      </Box>
      <ListCategory
        ListData={getAllCate}
        deleteRecord={deleteRecord}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default PCategory;
