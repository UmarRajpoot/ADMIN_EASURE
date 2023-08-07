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
import AddCategoryModel from "../../components/AddCategoryModel";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { BASE_URL } from "../../Config/Url";
import { useDispatch, useSelector } from "react-redux";
import { Sizes_Data } from "../../Store/Categories/CategoriesActions";
import ListCategory from "../../components/ListCategory";

const Sizes = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Sizes = useSelector((state) => state.Categories.Sizes);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  function validateName(value) {
    let error;
    if (!value) {
      error = "Size is required";
    }
    return error;
  }

  const getallSizes = async () => {
    setIsLoading(true);
    return await axios
      .get(`${BASE_URL}/Sizes`)
      .then((resp) => {
        // console.log(resp.data);
        dispatch(Sizes_Data(resp.data.response));
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  const deleteRecord = async (id) => {
    return await axios
      .delete(`${BASE_URL}/Sizes`, {
        data: {
          name: id,
        },
      })
      .then(() => {
        getallSizes();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const AddSize = async (name) => {
    return await axios
      .post(`${BASE_URL}/Sizes`, {
        name: name,
      })
      .then((resp) => {
        getallSizes();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    getallSizes();
  }, []);

  return (
    <Box>
      <AddCategoryModel
        isOpen={isOpen}
        onClose={onClose}
        ModalTitle={"Add Sizes"}
        modelBody={
          <Formik
            initialValues={{ sizes: "" }}
            onSubmit={async (values, actions) => {
              await AddSize(values.sizes)
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
                  <Field name="sizes" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.sizes && form.touched.sizes}
                        isRequired
                      >
                        <FormLabel>Size Name</FormLabel>
                        <Input {...field} placeholder="Size Name" />
                        <FormErrorMessage>{form.errors.sizes}</FormErrorMessage>
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
          Sizes
        </Heading>
        <Button colorScheme="blue" onClick={() => onOpen()}>
          Add New Size
        </Button>
      </Box>
      <ListCategory
        THeadsList={["NAME"]}
        ListData={Sizes}
        deleteRecord={deleteRecord}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default Sizes;
