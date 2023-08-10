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

// NewProduct page components
import FormField from "/pagesComponents/ecommerce/products/new-product/components/FormField";

import { useEffect, useState } from "react";
import MDInput from "/components/MDInput";
import { Card, Icon, IconButton } from "@mui/material";


function SingleDepartment({ department }) {
    const [processes, setProcesses] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        console.log(department);
    }, [department]);

    // set passwordV to be processes every time processes changes
    // !!! USE THIS LOGIC FOR AUTOCOMPLETE AND TAGS !!!

    const handleProcessNameChange = (departmentIndex, processIndex, name) => {
        setProcesses((prevState) => {
            const newProcesses = [...prevState];
            if (!newProcesses[departmentIndex]) {
                newProcesses[departmentIndex] = { name: departments[departmentIndex], processes: [] };
            }
            newProcesses[departmentIndex].processes[processIndex].name = name;
            return newProcesses;
        });
    };

    const handleProcessTimeChange = (departmentIndex, processIndex, time) => {
        setProcesses((prevState) => {
            const newProcesses = [...prevState];
            if (!newProcesses[departmentIndex]) {
                newProcesses[departmentIndex] = { name: departments[departmentIndex], processes: [] };
            }
            newProcesses[departmentIndex].processes[processIndex].time = time;
            return newProcesses;
        });
    };

    const handleDepartmentProcessesChange = (departmentIndex, numProcesses) => {
        setProcesses((prevState) => {
            const newProcesses = [...prevState];
            const currentNumProcesses = newProcesses[departmentIndex]?.processes?.length || 0;
            if (numProcesses > currentNumProcesses) {
                if (!newProcesses[departmentIndex]) {
                    newProcesses[departmentIndex] = { name: departments[departmentIndex], processes: [] };
                }
                for (let i = currentNumProcesses; i < numProcesses; i++) {
                    newProcesses[departmentIndex].processes.push({ name: "", time: "" });
                }
            } else if (numProcesses < currentNumProcesses) {
                newProcesses[departmentIndex]?.processes?.splice(numProcesses, currentNumProcesses - numProcesses);
            }
            return newProcesses;
        });
        setNumProcesses((prevState) => {
            const newNumProcesses = [...prevState];
            newNumProcesses[departmentIndex] = numProcesses;
            return newNumProcesses;
        });
    };

    return (
        <Card>
            <MDBox p={3}>
                <MDTypography variant="h5" fontWeight="bold">
                    Process
                </MDTypography>
                <MDBox mt={2}>
                    {department && department.processes && department.processes.map((process) => (
                        // <Grid key={process.name} item xs={6}>
                        //     <MDInput style={{ display: 'inline-block' }} value={process.name} />
                        //     <MDInput style={{ display: 'inline-block' }} value={process.time} />
                        // </Grid>
                        <Grid container spacing={2} key={process.name} mt={1}>

                            <Grid item xs={6}>
                                <MDInput
                                    fullWidth
                                    type="text"
                                    label={`Process Name`}
                                    value={process.name || ""}
                                    // onChange={(e) => handleProcessNameChange(i, j, e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MDInput
                                    fullWidth
                                    type="text"
                                    label={`Process Time`}
                                    value={process.time || ""}
                                    // onChange={(e) => handleProcessTimeChange(i, j, e.target.value)}
                                    required
                                />
                            </Grid>

                        </Grid>


                    ))}
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
                            <IconButton onClick={
                                () => {
                                    alert(JSON.stringify(processes));
                                }
                            }>
                                <Icon color="secondary" fontSize="large">save</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </MDBox>
            </MDBox>
        </Card>
    );
}

export default SingleDepartment;
