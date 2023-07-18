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
import Process from "/pagesComponents/ecommerce/products/edit-product/components/Process";
import OrdersOverview from "/pagesComponents/ecommerce/products/edit-product/components/OrdersOverview";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Icon, IconButton } from "@mui/material";

import { useState, useRef, useEffect, Fragment } from "react";
import CircularProgress from '@mui/material/CircularProgress';

function EditProduct() {

  const [productName, setProductName] = useState("");
  const [department, setDepartment] = useState("");
  const [products, setProducts] = useState([]);

  const [open, setOpen] = useState(false);
  const loading = open && products.length === 0;

  useEffect(() => {


    let active = true;

    if (!loading) {
      return undefined;
    }

    fetch('https://a7ivt3xloc.execute-api.us-east-2.amazonaws.com/prod-info/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data)
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
                  }
                  }
                  disablePortal
                  sx={{ width: "100%" }}
                  // id="combo-box-demo"
                  options={products.map((option) => option.product_id)}
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
                  }
                  }
                  disablePortal
                  sx={{ width: "100%", mr: 1 }}
                  id="combo-box-demo"
                  options={["Department 1", "Department 2", "Department 3", "Department 4", "Department 5"]}
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
            <ProductImage />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductInfo name={productName} />
          </Grid>
          <Grid item xs={12} lg={4}>
            {/* <Socials /> */}
            <OrdersOverview />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Process />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EditProduct;
