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

import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Autocomplete from "@mui/material/Autocomplete";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDEditor from "/components/MDEditor";
import MDInput from "/components/MDInput";

// NewProduct page components
import FormField from "/pagesComponents/ecommerce/products/edit-product/components/FormField";
import MDDatePicker from "/components/MDDatePicker";
import { Icon, IconButton } from "@mui/material";
import MDSnackbar from "/components/MDSnackbar";

function ProductInfo({ product }) {
  const [productName, setProductName] = useState("");
  const [SKU, setSKU] = useState("");
  const [Buyer, setBuyer] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Description, setDescription] = useState("");

  const [show, setShow] = useState(false);

  const toggleSnackbar = () => {
    setShow(!show);
  };


  useEffect(() => {
    setProductName(product ? product.name : "");
    setSKU(product ? product._id : "");
    setBuyer(product ? product.buyer : "");
  }, [product]);


  return (
    <Card>
      <MDSnackbar
        icon="notifications"
        title="Edited Product"
        content="You have successfully edited the product."
        dateTime="now"
        open={show}
        close={toggleSnackbar} />
      <MDBox p={3}>
        <MDTypography variant="h5">Product Information</MDTypography>
        <MDBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField
                type="text"
                label="Name"
                // defaultValue={productName}
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField type="text" label="SKU" value={SKU} onChange={(e) => setSKU(e.target.value)} />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <FormField type="text" label="Buyer" value={Buyer} onChange={(e) => setBuyer(e.target.value)} />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <MDBox >
                    <MDTypography
                      component="label"
                      variant="button"
                      fontSize="large"
                      color="text"
                      textTransform="capitalize"
                    >
                      Save
                    </MDTypography>
                  </MDBox>
                  <IconButton onClick={toggleSnackbar}>
                    <Icon color="secondary" fontSize="large">save</Icon>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ProductInfo;
