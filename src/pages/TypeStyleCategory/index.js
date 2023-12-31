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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../Config/Url";
import ListCategory from "../../components/ListCategory";
import { TypesStyle_Data } from "../../Store/Categories/CategoriesActions";

const TypeStyleCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const TypeStyleCate = useSelector((state) => state.Categories.TypeStyle);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  function validateName(value) {
    let error;
    if (!value) {
      error = "Type Style is required";
    }
    return error;
  }

  const getallTypeStyle = async () => {
    setIsLoading(true);
    return await axios
      .get(`${BASE_URL}/TypeStyle`)
      .then((resp) => {
        // console.log(resp.data);
        dispatch(TypesStyle_Data(resp.data.response));
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  const deleteRecord = async (id) => {
    return await axios
      .delete(`${BASE_URL}/TypeStyle`, {
        data: {
          name: id,
        },
      })
      .then(() => {
        getallTypeStyle();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const AddTypeStyle = async (name) => {
    return await axios
      .post(`${BASE_URL}/TypeStyle`, {
        name: name,
      })
      .then((resp) => {
        getallTypeStyle();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    getallTypeStyle();
  }, []);
  return (
    <Box>
      <AddCategoryModel
        isOpen={isOpen}
        onClose={onClose}
        ModalTitle={"Add Type Style"}
        modelBody={
          <Formik
            initialValues={{ typestylename: "" }}
            onSubmit={async (values, actions) => {
              await AddTypeStyle(values.typestylename)
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
                  <Field name="typestylename" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.typestylename &&
                          form.touched.typestylename
                        }
                        isRequired
                      >
                        <FormLabel>Type Style Name</FormLabel>
                        <Input {...field} placeholder="Type Style Name" />
                        <FormErrorMessage>
                          {form.errors.typestylename}
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
          Type Style Category
        </Heading>
        <Button colorScheme={"blue"} onClick={() => onOpen()}>
          Add New Type Style
        </Button>
      </Box>
      <ListCategory
        THeadsList={["NAME"]}
        ListData={TypeStyleCate}
        deleteRecord={deleteRecord}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default TypeStyleCategory;
