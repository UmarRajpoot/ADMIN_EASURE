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
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AddProductModel from "../../components/ProductComp/AddProductModel";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../Config/Url";
import axios from "axios";
import ListProduct from "../../components/ProductComp/ListProduct";
import { Product_Data } from "../../Store/Product/ProductActions";

const Products = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getAllProducts = useSelector((state) => state.Products.Products);

  const getParentCategories = useSelector((state) => state.Categories.PCat);
  const getallPersons = useSelector((state) => state.Categories.PersonCat);
  const getallVarients = useSelector((state) => state.Categories.Varient);
  const getallTypes = useSelector((state) => state.Categories.Type);
  const getallTypeStyles = useSelector((state) => state.Categories.TypeStyle);
  const getallSizes = useSelector((state) => state.Categories.Sizes);
  const getallColors = useSelector((state) => state.Categories.Colors);

  const dispatch = useDispatch();

  // console.log("Out Side", getParentCategories);

  // For Colors
  // const [ColorCategory, setColorCategory] = useState([]);
  // const [currentCategory, setcurrentCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // For Sizes
  const [sizesList, setSizesList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (ColorCategory.length !== 0) {
  //     let filterColorCategory = ColorCategory.filter((filCat) => {
  //       if (filCat.name === currentCategory) {
  //         filCat.name = currentCategory;
  //         filCat.colors = selectedColor;
  //       } else {
  //         return filCat;
  //       }
  //     });

  //     console.log("Color Result", selectedColor);
  //     console.log("Result", ColorCategory);
  //   }
  // }, [ColorCategory, selectedColor]);

  // useEffect(() => {
  //   if (selectedColor.length !== 0) {
  //     console.log("Changed");
  //     setSelectedColor([]);
  //   }
  // }, [ColorCategory]);

  function validateName(value, field) {
    let error;
    if (!value) {
      error = `${field} is required`;
    }
    return error;
  }

  // Get Product Data
  const getProductData = async () => {
    return await axios
      .get(`${BASE_URL}/Product`)
      .then((resp) => {
        // console.log(resp.data);
        dispatch(Product_Data(resp.data.response));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProductData();
  }, []);

  const addProduct = async (
    productname,
    // productimage,
    parentcategory,
    personname,
    varientname,
    typename,
    typestylename,
    price,
    sizes,
    colors
  ) => {
    return await axios
      .post(
        `${BASE_URL}/Product`,
        {
          productname,
          // productimage,
          parentcategory,
          personname,
          varientname,
          typename,
          typestylename,
          price,
          sizes,
          colors,
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        console.log(resp.data);
        getProductData();
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  const delteProductPhoto = async (purpose, photoUrl) => {
    let formData = new FormData();
    formData.append("purpose", purpose);
    formData.append("photoURL", photoUrl);
    return await axios
      .post(`${BASE_URL}/DeletePhoto`, formData)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteDB = async (id) => {
    return await axios
      .delete(`${BASE_URL}/Product`, {
        data: {
          productname: id,
        },
      })
      .then((resp) => {
        console.log("Product Record Deleted.");
        console.log(resp.data);
        getProductData();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const deleteRecord = async (id, photoUrl) => {
    if (photoUrl !== null) {
      await delteProductPhoto("DELproductsPhoto", photoUrl).then((resp) => {
        console.log("Product Photo Deleted.");
        deleteDB(id);
      });
    } else {
      deleteDB(id);
    }
  };

  return (
    <Box>
      <AddProductModel
        isOpen={isOpen}
        onClose={onClose}
        ModalTitle={"Add Product"}
        modelBody={
          <Formik
            initialValues={{
              // productname: "",
              parent_cat_name: "",
              person_name: "",
              varient_name: "",
              type_name: "",
              type_style_name: "",
              price: "",
              // sizes: [],
              // colorsCateg: "",
            }}
            onSubmit={async (values, actions) => {
              // console.log(
              //   `${values.parent_cat_name}-${values.person_name}-${values.type_name}-${values.type_style_name}`,
              //   values.parent_cat_name,
              //   values.person_name,
              //   values.varient_name,
              //   values.type_name,
              //   values.type_style_name,
              //   Number(values.price),
              //   sizesList,
              //   selectedColor
              // );
              await addProduct(
                `${values.parent_cat_name}-${values.person_name}-${values.type_name}-${values.type_style_name}`,
                values.parent_cat_name,
                values.person_name,
                values.varient_name,
                values.type_name,
                values.type_style_name,
                Number(values.price),
                sizesList,
                selectedColor
              )
                .then(() => {
                  // setColorCategory([]);
                  // setSelectedColor([]);
                  setSizesList([]);
                  actions.setSubmitting(false);
                  onClose();
                })
                .catch((error) => {
                  actions.setSubmitting(false);
                });
            }}
          >
            {(props) => (
              <Form>
                <Stack
                  direction={["column", "column", "row"]}
                  alignItems={["center"]}
                  spacing={"5"}
                  // bgColor={"gray.600"}
                  mb={["0", "5"]}
                >
                  <Stack direction={["column", "row"]} w={"full"}>
                    <Stack flex={"1"} direction={["column"]}>
                      <Field
                        name="parent_cat_name"
                        validate={(value) =>
                          validateName(value, "Parent Category")
                        }
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.parent_cat_name &&
                              form.touched.parent_cat_name
                            }
                            isRequired
                          >
                            <FormLabel>Parent Category</FormLabel>
                            <Select {...field} placeholder="Parent Category">
                              {getParentCategories.map((pcat, index) => {
                                return (
                                  <option
                                    value={pcat.name}
                                    key={index.toString()}
                                  >
                                    {pcat.name.toUpperCase()}
                                  </option>
                                );
                              })}
                            </Select>
                            <FormErrorMessage>
                              {form.errors.parent_cat_name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field
                        name="person_name"
                        validate={(value) => validateName(value, "Person Name")}
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.person_name &&
                              form.touched.person_name
                            }
                            isRequired
                          >
                            <FormLabel>Person Name</FormLabel>
                            <Select {...field} placeholder="Person Name">
                              {getallPersons.map((person, index) => {
                                return (
                                  <option
                                    value={person.name}
                                    key={index.toString()}
                                  >
                                    {person.name.toUpperCase()}
                                  </option>
                                );
                              })}
                            </Select>
                            <FormErrorMessage>
                              {form.errors.person_name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field
                        name="varient_name"
                        validate={(value) => validateName(value, "Varient")}
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.varient_name &&
                              form.touched.varient_name
                            }
                            isRequired
                          >
                            <FormLabel>Varient Name</FormLabel>
                            <Select {...field} placeholder="Varient Name">
                              {getallVarients.map((varient, index) => {
                                return (
                                  <option
                                    value={varient.name}
                                    key={index.toString()}
                                  >
                                    {varient.name.toUpperCase()}
                                  </option>
                                );
                              })}
                            </Select>
                            <FormErrorMessage>
                              {form.errors.varient_name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field
                        name="type_name"
                        validate={(value) => validateName(value, "Type")}
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.type_name && form.touched.type_name
                            }
                            isRequired
                          >
                            <FormLabel>Type Name</FormLabel>
                            <Select {...field} placeholder="Type Name">
                              {getallTypes.map((type, index) => {
                                return (
                                  <option
                                    value={type.name}
                                    key={index.toString()}
                                  >
                                    {type.name.toUpperCase()}
                                  </option>
                                );
                              })}
                            </Select>
                            <FormErrorMessage>
                              {form.errors.type_name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Stack>
                    <Stack flex={"1"} direction={["column"]}>
                      <Field
                        name="type_style_name"
                        validate={(value) => validateName(value, "Type Style")}
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.type_style_name &&
                              form.touched.type_style_name
                            }
                            isRequired
                          >
                            <FormLabel>Type Style Name</FormLabel>
                            <Select {...field} placeholder="Type Style Name">
                              {getallTypeStyles.map((typestyle, index) => {
                                return (
                                  <option
                                    value={typestyle.name}
                                    key={index.toString()}
                                  >
                                    {typestyle.name.toUpperCase()}
                                  </option>
                                );
                              })}
                            </Select>
                            <FormErrorMessage>
                              {form.errors.type_style_name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field
                        name="price"
                        validate={(value) => validateName(value, "Price")}
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.price && form.touched.price}
                            isRequired
                          >
                            <FormLabel>Price</FormLabel>
                            <Input {...field} placeholder="Price" />
                            <FormErrorMessage>
                              {form.errors.price}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field
                        name="sizes"
                        validate={(value) => validateName(value, "Sizes")}
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.sizes && form.touched.sizes}
                            isRequired
                            onChange={(e) => {
                              setSizesList((prev) => [...prev, e.target.value]);
                            }}
                          >
                            <FormLabel>Sizes</FormLabel>
                            <Select {...field} placeholder="Sizes">
                              {getallSizes.map((sizes, index) => {
                                return (
                                  <option
                                    value={sizes.name}
                                    key={index.toString()}
                                  >
                                    {sizes.name.toUpperCase()}
                                  </option>
                                );
                              })}
                            </Select>
                            <FormErrorMessage>
                              {form.errors.sizes}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <HStack flexWrap={"wrap"}>
                        {sizesList.map((size, index) => {
                          return (
                            <Box
                              key={index.toString()}
                              bgColor={"gray.300"}
                              px={"3"}
                              py={"1"}
                              rounded={"md"}
                              _hover={{
                                bgColor: "gray.200",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                const deleteSize = sizesList.filter(
                                  (filSize) => filSize !== size
                                );
                                setSizesList(deleteSize);
                              }}
                            >
                              <Text fontSize={"sm"}>{size}</Text>
                            </Box>
                          );
                        })}
                      </HStack>
                      <HStack alignItems={"flex-start"}>
                        {/* <Field
                          name="colorsCateg"
                          validate={(value) =>
                            validateName(value, "Choose Color Category")
                          }
                        >
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.colorsCateg &&
                                form.touched.colorsCateg
                              }
                              isRequired
                              onChange={(e) => {
                                setcurrentCategory(e.target.value);
                                if (ColorCategory.length === 0) {
                                  setColorCategory([
                                    {
                                      name: e.target.value,
                                      colors: [],
                                    },
                                  ]);
                                } else {
                                  let filterCate = ColorCategory?.filter(
                                    (filCat) => filCat.name === e.target.value
                                  );
                                  console.log("Filtered", filterCate.length);
                                  if (filterCate.length === 0) {
                                    setColorCategory((old) => [
                                      ...old,
                                      {
                                        name: e.target.value,
                                        colors: [],
                                      },
                                    ]);
                                  }
                                }
                              }}
                            >
                              <FormLabel>Colors Category</FormLabel>

                              <Select {...field} placeholder="Colors Category">
                                <option value="CLASSIC">CLASSIC</option>
                                <option value="ICONIC">ICONIC</option>
                                <option value="INJECTION">INJECTION</option>
                              </Select>
                              <FormErrorMessage>
                                {form.errors.colorsCateg}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field> */}
                        <Field
                          name="colors"
                          validate={(value) =>
                            validateName(value, "Choose color")
                          }
                        >
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.colors && form.touched.colors
                              }
                              isRequired
                              onChange={(e) => {
                                let colorname = getallColors.find(
                                  (color) => color.colorcode === e.target.value
                                );
                                setSelectedColor({
                                  name: colorname.name,
                                  code: e.target.value,
                                });
                                // else {
                                //   let filterColor = selectedColor.filter(
                                //     (filCat) => filCat === e.target.value
                                //   );
                                //   console.log(
                                //     "Filtered Color",
                                //     filterColor.length
                                //   );
                                //   if (filterColor.length === 0) {
                                //     setSelectedColor((prev) => [
                                //       ...prev,
                                //       e.target.value,
                                //     ]);
                                //   }
                                // }
                              }}
                            >
                              <FormLabel>Colors</FormLabel>

                              <Select {...field} placeholder="Colors">
                                {getallColors.map((colors, index) => {
                                  return (
                                    <option
                                      value={colors.colorcode}
                                      key={index.toString()}
                                    >
                                      {colors.name.toUpperCase()}
                                    </option>
                                  );
                                })}
                              </Select>
                              <FormErrorMessage>
                                {form.errors.colors}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </HStack>
                      {/* <Stack>
                        {ColorCategory.map((coloCat, index) => {
                          return (
                            <Box key={index}>
                              <Text fontSize={"sm"}>{coloCat.name}</Text>
                              {coloCat.colors && (
                                <HStack>
                                  {coloCat.colors.map((color, Cindex) => {
                                    return (
                                      <Box
                                        key={Cindex.toString()}
                                        p={"2"}
                                        bgColor={color}
                                        rounded={"full"}
                                        _hover={{
                                          boxShadow: "outline",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          let filterCateg =
                                            ColorCategory.filter((cate) => {
                                              if (cate.name !== coloCat.name) {
                                                return cate;
                                              }
                                            });
                                          setColorCategory(filterCateg);
                                        }}
                                      ></Box>
                                    );
                                  })}
                                </HStack>
                              )}
                            </Box>
                          );
                        })}
                      </Stack> */}

                      {/* <Field name="slug" validate={validateName}>
                        {({ field, form }) => (
                          <FormControl isRequired isReadOnly>
                            <FormLabel>Slug</FormLabel>
                            <Input {...field} placeholder="Slug" />
                            <FormErrorMessage>
                              {form.errors.slug}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field> */}
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
                    </Stack>
                  </Stack>
                </Stack>
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
      <ListProduct
        THeadsList={[
          "productname",
          "productimage",
          "productvideo",
          "parentcategory",
          "personname",
          "varientname",
          "typename",
          "typestylename",
          "price",
          "sizes",
          // "colors",
        ]}
        ListData={getAllProducts}
        deleteRecord={deleteRecord}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default Products;
