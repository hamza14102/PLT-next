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

import Link from "next/link";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";

import { useAuth } from "hooks/use-auth";
import { useRouter } from 'next/navigation';

import { useState, useRef } from "react";

// import { useState } from "react";

// formik components
import { Formik, Form } from "formik";

// @mui material components
import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

// NextJS Material Dashboard 2 PRO components
// import MDBox from "/components/MDBox";
// import MDButton from "/components/MDButton";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";

// NewProduct page components
import ProductInfo from "/pagesComponents/ecommerce/products/new-product/components/ProductInfo";
import Media from "/pagesComponents/ecommerce/products/new-product/components/Media";
import Process from "/pagesComponents/ecommerce/products/new-product/components/Process";
import Pricing from "/pagesComponents/ecommerce/products/new-product/components/Pricing";

// NewUser layout schemas for form and form feilds
import validations from "/pagesComponents/ecommerce/products/new-product/schemas/validations";
import form from "/pagesComponents/ecommerce/products/new-product/schemas/form";
import initialValues from "/pagesComponents/ecommerce/products/new-product/schemas/initialValues";
import MDSnackbar from "/components/MDSnackbar";
import { CircularProgress } from "@mui/material";

import { postToProducts } from "/apiHelpers/products";


function getSteps() {
  // return ["Product Info", "Media", "Process", "Pricing"];
  return ["Product Info", "Process"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <ProductInfo formData={formData} />;
    // case 1:
    //   return <Media formData={formData} />;
    case 1:
      return <Process formData={formData} />;
    // case 2:
    //   return <Pricing formData={formData} />;
    default:
      return null;
  }
}


function Cover() {
  const [errors, setErrors] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const auth = useAuth();
  const router = useRouter();

  const [show, setShow] = useState(false);
  const toggleSnackbar = () => setShow(!show);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  const handleBack = () => setActiveStep(activeStep - 1);

  const submitForm = async (values, actions) => {

    await sleep(1000);
    alert(JSON.stringify(values, null, 2));

    const product_post_response = await postToProducts({
      "_id": values.firstName, "SKU": values.lastName, "Buyer": values.department, "Ship By Date": values.email, "Processes": values.password,
      //  "quantity": values.repeatPassword, "image": values.address1, "processes": values.address2, "tags": values.city, "category": values.zip, "rating": values.twitter, "reviews": values.facebook, "date": values.instagram, "status": values.publicEmail, "featured": values.bio 
    });
    console.log(product_post_response);
    actions.setSubmitting(false);
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <Card> */}
      <MDBox
        variant="gradient"
        bgColor="dark"
        borderRadius="lg"
        coloredShadow="dark"
        mx={2}
        mt={3}
        p={3}
        mb={1}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Create a new product
        </MDTypography>
        <MDTypography display="block" variant="button" color="white" my={1}>
          Fill in the form below to create a new product
        </MDTypography>
      </MDBox>
      <MDBox mb={2}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%", mt: 8 }}
        >
          <Grid item xs={12} lg={8}>
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ height: "100%" }}>
                    <MDBox mx={2} mt={-3}>
                      <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </MDBox>
                    <MDBox p={3}>
                      <MDBox>
                        {getStepContent(activeStep, {
                          values,
                          touched,
                          formField,
                          errors,
                        })}
                        <MDBox
                          mt={2}
                          width="100%"
                          display="flex"
                          justifyContent="space-between"
                        >
                          {activeStep === 0 ? (
                            <MDBox />
                          ) : (
                            <MDButton
                              variant="gradient"
                              color="light"
                              onClick={handleBack}
                            >
                              back
                            </MDButton>
                          )}
                          {isSubmitting ? (
                            <CircularProgress />
                          ) : (
                            <MDButton
                              disabled={isSubmitting}
                              type="submit"
                              variant="gradient"
                              color="dark"
                            >
                              {isLastStep ? "send" : "next"}
                            </MDButton>
                          )}
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mb={3} textAlign="center">
        <MDTypography variant="button" color="text">
          Already have a Registered Product?{" "}
          <Link href="/ecommerce/products/edit-product">
            <MDTypography
              variant="button"
              color="light"
              fontWeight="medium"
              textGradient
            >
              Edit Product
            </MDTypography>
          </Link>
        </MDTypography>
      </MDBox>
      {/* </Card> */}
    </DashboardLayout>
  );
}

export default Cover;
