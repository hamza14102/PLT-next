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

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDEditor from "/components/MDEditor";
import MDInput from "/components/MDInput";

// NewProduct page components
import FormField from "/pagesComponents/ecommerce/products/new-product/components/FormField";

function ProductInfo({ formData }) {
  const [editorValue, setEditorValue] = useState(
    "<p>Some initial <strong>bold</strong> text</p><br><br><br><br>",
  );

  const { formField, values, errors, touched } = formData;
  const { firstName, lastName, department, email, password, repeatPassword } =
    formField;
  const {
    firstName: firstNameV,
    lastName: lastNameV,
    department: departmentV,
    email: emailV,
    password: passwordV,
    repeatPassword: repeatPasswordV,
  } = values;

  return (
    <MDBox>
      <MDTypography variant="h5">Product Information</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={firstName.type}
              label={firstName.label}
              name={firstName.name}
              value={firstNameV}
              placeholder={firstName.placeholder}
              error={errors.firstName && touched.firstName}
              success={firstNameV.length > 0 && !errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={lastName.type}
              label={lastName.label}
              name={lastName.name}
              value={lastNameV}
              placeholder={lastName.placeholder}
              error={errors.lastName && touched.lastName}
              success={lastNameV.length > 0 && !errors.lastName}
            />
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
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
                <MDTypography variant="caption" color="text">
                  (optional)
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDEditor value={editorValue} onChange={setEditorValue} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDBox mb={3}>
              {/* <MDBox mb={2} display="inline-block">
                <MDTypography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  textTransform="capitalize"
                >
                  Category
                </MDTypography>
              </MDBox> */}
              <FormField
                type={department.type}
                label={department.label}
                name={department.name}
                value={departmentV}
                placeholder={department.placeholder}
                error={errors.department && touched.department}
                success={departmentV.length > 0 && !errors.department}
              />
              {/* <Autocomplete
                defaultValue="Clothing"
                options={[
                  "Clothing",
                  "Electronics",
                  "Furniture",
                  "Others",
                  "Real Estate",
                ]}
                renderInput={(params) => (
                  <MDInput {...params} variant="standard" />
                )}
              /> */}
            </MDBox>
            {/* <MDBox mb={2} display="inline-block">
              <MDTypography
                component="label"
                variant="button"
                fontWeight="regular"
                color="text"
                textTransform="capitalize"
              >
                Size
              </MDTypography>
            </MDBox> */}
            {/* <Autocomplete
              defaultValue="Medium"
              options={[
                "Extra Large",
                "Extra Small",
                "Large",
                "Medium",
                "Small",
              ]}
              renderInput={(params) => (
                <MDInput {...params} variant="standard" />
              )}
            /> */}
            <FormField
              type={department.type}
              label={department.label}
              name={department.name}
              value={departmentV}
              placeholder={department.placeholder}
              error={errors.department && touched.department}
              success={departmentV.length > 0 && !errors.department}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default ProductInfo;
