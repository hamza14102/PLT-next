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

function ProductInfo({ name }) {
  const [productName, setProductName] = useState("");

  const [editorValue, setEditorValue] = useState(
    `<p>
      Long sleeves black denim jacket with a twisted design. Contrast stitching. Button up closure. White arrow prints on the back.
    </p>`,
  );

  useEffect(() => {
    setProductName(name);
  }, [name]);


  return (
    <Card>
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
              <FormField type="text" label="SKU" defaultValue={2} />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <FormField type="text" label="Buyer" defaultValue="Summer" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormField type="text" label="Price" defaultValue="$90" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormField type="number" label="Quantity" defaultValue={50} />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <MDTypography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                >
                  Description&nbsp;&nbsp;
                  <MDTypography
                    variant="caption"
                    fontWeight="regular"
                    color="text"
                  >
                    (optional)
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <MDEditor value={editorValue} onChange={setEditorValue} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MDBox mt={4.5} mb={3}>
                <MDBox mb={1.625} display="inline-block">
                  {/* <MDTypography
                    component="label"
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    textTransform="capitalize"
                  >
                    Category
                  </MDTypography> */}
                </MDBox>
                <MDDatePicker input={{ placeholder: "Ship by Date" }} />
              </MDBox>
              {/* <MDBox mb={1.625} display="inline-block">
                <MDTypography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  textTransform="capitalize"
                >
                  Color
                </MDTypography>
              </MDBox>
              <Autocomplete
                defaultValue="Black"
                options={["Black", "Blue", "Green", "Orange", "White"]}
                renderInput={(params) => (
                  <MDInput {...params} variant="standard" />
                )}
              /> */}
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ProductInfo;
