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
import ListCategory from "../../components/ListCategory";
import { Review_Data } from "../../Store/Reviews/ReviewActions";

const Sizes = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ReviewState = useSelector((state) => state.Reviews.reviews);
  //   console.log(ReviewState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  function validateName(value) {
    let error;
    if (!value) {
      error = "Size is required";
    }
    return error;
  }

  const getallReviews = async () => {
    setIsLoading(true);
    return await axios
      .get(`${BASE_URL}/Review`)
      .then((resp) => {
        console.log(resp.data);
        dispatch(Review_Data(resp.data.response));
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  const deleteRecord = async (id) => {
    return await axios
      .delete(`${BASE_URL}/Review`, {
        data: {
          id: id,
        },
      })
      .then(() => {
        getallReviews();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const AddSize = async (name) => {
    return await axios
      .post(`${BASE_URL}/Review`, {
        name: name,
      })
      .then((resp) => {
        getallReviews();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    getallReviews();
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
          Reviews
        </Heading>
      </Box>
      <ListCategory
        THeadsList={["Score", "Title", "Description"]}
        ListData={ReviewState}
        deleteRecord={deleteRecord}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default Sizes;
