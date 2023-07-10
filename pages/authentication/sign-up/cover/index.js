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

// Authentication layout components
import CoverLayout from "/pagesComponents/authentication/components/CoverLayout";

// Images
import bgImage from "/assets/images/bg-sign-up-cover.jpeg";

import { useAuth } from "hooks/use-auth";
import { useRouter } from 'next/navigation';

import { useState, useRef } from "react";

function Cover() {
  const [errors, setErrors] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('submitting');

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

    if (!email || !password || !name) {
      setErrors('Please fill in all fields');
      return;
    }
    // check valid regex for email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors('Please enter a valid email');
      return;
    }
    // ensure password is at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    if (!/^(?=.*[0-9])(?=.*[!@#$%.^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]/.test(password)) {
      setErrors('Password must be at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character');
      return;
    }

    try {
      await auth.signUp(email, name, password);
      router.push('/');
    } catch (err) {
      // helpers.setStatus({ success: false });
      // helpers.setErrors({ submit: err.message });
      // helpers.setSubmitting(false);
      console.log(err);
      setErrors(err.message);
    }

    // Do something with the email and password values
  };

  return (
    <CoverLayout image={bgImage} style={{ paddingBottom: '10vh' }}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="dark"
          borderRadius="lg"
          coloredShadow="dark"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Name" variant="standard" fullWidth inputRef={nameRef} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                inputRef={emailRef}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                inputRef={passwordRef}
              />
            </MDBox>
            <MDTypography color="warning" variant="caption">{errors}</MDTypography>
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="dark"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="dark" fullWidth onClick={handleSubmit}>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <Link href="/authentication/sign-in/basic">
                  <MDTypography
                    variant="button"
                    color="dark"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
                  </MDTypography>
                </Link>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
