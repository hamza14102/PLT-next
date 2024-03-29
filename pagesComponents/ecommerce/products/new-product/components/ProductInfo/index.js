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
import Autocomplete from "@mui/material/Autocomplete";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDEditor from "/components/MDEditor";
import MDInput from "/components/MDInput";

// NewProduct page components
import FormField from "/pagesComponents/ecommerce/products/new-product/components/FormField";
import MDButton from "/components/MDButton";
import { useAuth } from "hooks/use-auth";

import { getUsers } from "apiHelpers/users";

function ProductInfo({ formData }) {

  // !!! Rename variables to match your schema
  const { formField, values, errors, touched } = formData;
  const { firstName, lastName, department, city } =
    formField;
  const {
    firstName: firstNameV,
    lastName: lastNameV,
    department: departmentV,
    city: cityV,
  } = values;

  const [imageFlag, setImageFlag] = useState(false);
  function handleCityChange(event) {
    values.city = event.target.files[0];
    setImageFlag(true);

    // console.log(event.target.files[0]);
  }



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
              type={department.type}
              label={department.label}
              name={department.name}
              value={departmentV}
              placeholder={department.placeholder}
              error={errors.department && touched.department}
              success={departmentV.length > 0 && !errors.department}
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
          <Grid item xs={12} sm={6}>
            {/* <FormField
              type={city.type}
              label={city.label}
              name={city.name}
              value={cityV}
              placeholder={city.placeholder}
              error={errors.city && touched.city}
              success={cityV.length > 0 && !errors.city}
              accept="image/*"
            /> */}
            {/* input as MDInput */}
            <MDTypography variant="body2" color="white">
              Image
            </MDTypography>
            <MDBox >

              <input
                type="file"
                accept=".png, .jpeg, .jpg"
                onChange={handleCityChange}
              />
            </MDBox>
            <MDTypography variant="body2" color="warning">
              {imageFlag ? "" : "Image is required"}
            </MDTypography>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormField
              type={address1.type}
              label={address1.label}
              name={address1.name}
              value={address1V}
              placeholder={address1.placeholder}
              error={errors.address1 && touched.address1}
              success={address1V.length > 0 && !errors.address1}
            />
          </Grid> */}

          {/* <Grid item xs={12} sm={6}>
            <FormField
              type={email.type}
              label={email.label}
              name={email.name}
              value={emailV}
              placeholder={email.placeholder}
              error={errors.email && touched.email}
              success={emailV.length > 0 && !errors.email}
            />
          </Grid> */}

          {/* <Grid item xs={12} sm={6}>
            <Autocomplete
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
                  label="Assign Head of Departments"
                // placeholder="Users"
                />
              )}
            />
          </Grid> */}
        </Grid>
      </MDBox>
    </MDBox >
  );
}

export default ProductInfo;
