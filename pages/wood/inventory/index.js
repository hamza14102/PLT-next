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

// @mui material components
import Grid from "@mui/material/Grid";
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import MDSnackbar from "/components/MDSnackbar";

import InventoryView from "pagesComponents/wood/inventory";


function Cover() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);


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
                <MDSnackbar
                    open={snackbarOpen}
                    color="success"
                    icon="notifictions"
                    title="Successfully assigned a new task!"
                    content="You have successfully assigned a new task."
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    close={() => setSnackbarOpen(false)}
                    message="You have successfully assigned a new task."
                />

                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                    Wood Intake Inventory
                </MDTypography>
                <MDTypography display="block" variant="button" color="white" my={1}>
                    Find Statistics and Reports of Wood Intake here
                </MDTypography>
            </MDBox>
            <MDBox mb={2}>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: "100%", mt: 8 }}
                >
                    <Grid item xs={12} lg={10}>
                        {/* Add a form here  */}
                        <InventoryView />

                    </Grid>
                </Grid>
            </MDBox>
            {/* </Card> */}
        </DashboardLayout>
    );
}

export default Cover;
