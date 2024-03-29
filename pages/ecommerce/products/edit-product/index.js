/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";

// EditProduct page components
import ProductImage from "/pagesComponents/ecommerce/products/edit-product/components/ProductImage";
import ProductInfo from "/pagesComponents/ecommerce/products/edit-product/components/ProductInfo";
import Socials from "/pagesComponents/ecommerce/products/edit-product/components/Socials";
import Pricing from "/pagesComponents/ecommerce/products/edit-product/components/Pricing";
import SingleDepartment from "/pagesComponents/ecommerce/products/edit-product/components/SingleDepartment";
import OrdersOverview from "/pagesComponents/ecommerce/products/edit-product/components/OrdersOverview";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Icon, IconButton } from "@mui/material";

import { useState, useRef, useEffect, Fragment, use } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { getUsers } from "apiHelpers/users";
import MDInput from "/components/MDInput";
import { addUsersToProductByID } from "apiHelpers/products";
import { Card } from "@mui/material";

function EditProduct() {

  const [productName, setProductName] = useState("");
  const [department, setDepartment] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);

  const [open, setOpen] = useState(false);
  const loading = open && products.length === 0;

  const [listOfUsers, setListOfUsers] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  useEffect(() => {
    const getUsersFromApi = async () => {
      const users = await getUsers();
      setListOfUsers(users.map((user) => user.name));
    };
    getUsersFromApi();
  }, []);

  const handleChange = (value) => {
    setAssignedUsers(value);
  };

  useEffect(() => {
    if (selectedProduct && selectedProduct.pfc) {
      // create a list of names of processes for the selected product
      setDepartments(selectedProduct.pfc);
      // console.log(departments);
    }
  }, [selectedProduct]);


  useEffect(() => {


    let active = true;

    if (!loading) {
      return undefined;
    }

    fetch('https://kbet2pop50.execute-api.us-east-2.amazonaws.com/default/ProductsAPILambda/?TableName=Products')
      .then(response => response.json())
      .then(data => {
        setProducts(data['Items'])
      });

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setProducts([]);
    }
  }, [open]);

  const handleSubmit = () => {
    // alert("Form submitted!");
    alert(`Product Name: ${productName}, Department: ${department}`);
    // console.log(products);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox mb={6}>
          <MDTypography variant="h4" fontWeight="medium">
            Edit Product
          </MDTypography>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} lg={8}>
              <MDBox mt={1} mb={2} display="flex" alignItems="center">
                {/* <Icon>shopping_cart</Icon> */}
                <Autocomplete
                  id="asynchronous-demo"
                  open={open}
                  onOpen={() => {
                    setOpen(true);
                  }}
                  onClose={() => {
                    setOpen(false);
                  }}
                  // getOptionLabel={(option) => option.title}
                  // options={options}
                  loading={loading}
                  // value={productName}
                  onChange={(event, newValue) => {
                    setProductName(newValue);
                    setSelectedProduct(products.filter((product) => product._id === newValue)[0]);
                  }
                  }
                  disablePortal
                  sx={{ width: "100%" }}
                  // id="combo-box-demo"
                  options={products.map((option) => option._id)}
                  renderInput={(params) => <TextField {...params} label="Product Name" InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {loading ? <CircularProgress color="white" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                  }} />}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} lg={4}>
              <MDBox mt={1} mb={2} display="flex" alignItems="center">
                <Autocomplete
                  onChange={(event, newValue) => {
                    setDepartment(newValue);
                    setSelectedDepartment(departments.filter((department) => department.name === newValue)[0]);
                  }
                  }
                  disablePortal
                  sx={{ width: "100%", mr: 1 }}
                  id="combo-box-demo"
                  options={departments.map((option) => option.name)}
                  renderInput={(params) => <TextField {...params} label="Department Name" />}
                />
                <IconButton onClick={handleSubmit}>
                  <Icon color="secondary" fontSize="large">search</Icon>
                </IconButton>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <ProductImage product={selectedProduct} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductInfo product={selectedProduct} />
          </Grid>
          <Grid item xs={12} lg={4}>
            {/* <Socials /> */}
            <OrdersOverview />
          </Grid>
          <Grid item xs={12} lg={8}>
            {/* <Grid item xs={12} lg={12} sx={{ display: "flex", alignItems: "center", gap: 2 }} >
              <Card
                sx={
                  {
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }
                }
              >
                <Autocomplete
                  sx={{ width: "50%" }}
                  multiple
                  id="tags-standard"
                  options={listOfUsers}
                  getOptionLabel={(option) => option}
                  defaultValue={[]}
                  onChange={(event, value) => handleChange(value)}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      variant="standard"
                      label="Add Team Members"
                    // placeholder="Users"
                    />
                  )}
                />
                <MDButton
                  variant="gradient"
                  color="dark"
                  onClick={async () => {
                    if (selectedProduct && selectedProduct._id && assignedUsers && assignedUsers.length > 0) {

                      const response = await addUsersToProductByID(selectedProduct._id, assignedUsers);
                      alert("Users added successfully!");
                    } else {
                      alert("Please select a product and add users to it!");
                    }
                  }
                  }
                >
                  Add
                </MDButton>
              </Card>
            </Grid> */}
            <Grid item xs={12} lg={12}>
              <SingleDepartment department={selectedDepartment} />
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EditProduct;
