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

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Icon, IconButton } from "@mui/material";

function EditProduct() {
  const handleSubmit = (values) => {
    alert("Form submitted!");
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
                  disablePortal
                  sx={{ width: "100%" }}
                  id="combo-box-demo"
                  options={["Product 1", "Product 2", "Product 3", "Chair 1", "Sofa 1"]}
                  renderInput={(params) => <TextField {...params} label="Product Name" />}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} lg={4}>
              <MDBox mt={1} mb={2} display="flex" alignItems="center">
                <Autocomplete
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
            <ProductInfo />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Socials />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Pricing />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EditProduct;
