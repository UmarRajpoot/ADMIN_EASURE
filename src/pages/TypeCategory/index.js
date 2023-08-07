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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Types_Data } from "../../Store/Categories/CategoriesActions";
import ListCategory from "../../components/ListCategory";

const TypeCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const TypeCate = useSelector((state) => state.Categories.Type);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  function validateName(value) {
    let error;
    if (!value) {
      error = "Type Name is required";
    }
    return error;
  }

  const getallType = async () => {
    setIsLoading(true);
    return await axios
      .get(`${BASE_URL}/Type`)
      .then((resp) => {
        // console.log(resp.data);
        dispatch(Types_Data(resp.data.response));
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  const deleteRecord = async (id) => {
    return await axios
      .delete(`${BASE_URL}/Type`, {
        data: {
          name: id,
        },
      })
      .then(() => {
        getallType();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const AddType = async (name) => {
    return await axios
      .post(`${BASE_URL}/Type`, {
        name: name,
      })
      .then((resp) => {
        getallType();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    getallType();
  }, []);
  return (
    <Box>
      <AddCategoryModel
        isOpen={isOpen}
        onClose={onClose}
        ModalTitle={"Add Type"}
        modelBody={
          <Formik
            initialValues={{ typename: "" }}
            onSubmit={(values, actions) => {
              AddType(values.typename)
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
                  <Field name="typename" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.typename && form.touched.typename
                        }
                        isRequired
                      >
                        <FormLabel>Type Name</FormLabel>
                        <Input {...field} placeholder="Type Name" />
                        <FormErrorMessage>
                          {form.errors.typename}
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
          Type Category
        </Heading>
        <Button colorScheme={"blue"} onClick={() => onOpen()}>
          Add New Type
        </Button>
      </Box>
      <ListCategory
        THeadsList={["NAME"]}
        ListData={TypeCate}
        deleteRecord={deleteRecord}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default TypeCategory;
