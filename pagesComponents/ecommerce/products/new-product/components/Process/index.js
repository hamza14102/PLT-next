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


function Process({ formData }) {
  const [processes, setProcesses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [numProcesses, setNumProcesses] = useState([0]);
  const [numDepartments, setNumDepartments] = useState(1);

  const { formField, values, errors, touched } = formData;
  const { password } =
    formField;
  const {
    password: passwordV,
  } = values;

  // set passwordV to be processes every time processes changes
  // !!! USE THIS LOGIC FOR AUTOCOMPLETE AND TAGS !!!
  useEffect(() => {
    // convert processes to string
    if (processes.length === 0) {
      return;
    }
    values.password = JSON.stringify(processes);
    // console.log(values.password);
  }, [processes]);


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

  const handleDepartmentNameChange = (departmentIndex, name) => {
    setDepartments((prevState) => {
      const newDepartments = [...prevState];
      newDepartments[departmentIndex] = name;
      return newDepartments;
    });
    setProcesses((prevState) => {
      const newProcesses = [...prevState];
      if (!newProcesses[departmentIndex]) {
        newProcesses[departmentIndex] = { name: name, processes: [] };
      } else {
        newProcesses[departmentIndex].name = name;
      }
      return newProcesses;
    });
  };

  return (
    <MDBox>
      <MDTypography variant="h5" fontWeight="bold">
        Process
      </MDTypography>
      <MDBox mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MDInput
              fullWidth
              type="number"
              label="Number of Departments"
              value={numDepartments}
              onChange={(e) => {
                const newNumDepartments = parseInt(e.target.value);
                setNumDepartments(newNumDepartments);
                setDepartments((prevState) => {
                  const newDepartments = [...prevState];
                  if (newNumDepartments > newDepartments.length) {
                    for (let i = newDepartments.length; i < newNumDepartments; i++) {
                      newDepartments.push("");
                    }
                  } else if (newNumDepartments < newDepartments.length) {
                    newDepartments.splice(newNumDepartments, newDepartments.length - newNumDepartments);
                  }
                  return newDepartments;
                });
                setNumProcesses((prevState) => {
                  const newNumProcesses = [...prevState];
                  if (newNumDepartments > newNumProcesses.length) {
                    for (let i = newNumProcesses.length; i < newNumDepartments; i++) {
                      newNumProcesses.push(0);
                    }
                  } else if (newNumDepartments < newNumProcesses.length) {
                    newNumProcesses.splice(newNumDepartments, newNumProcesses.length - newNumDepartments);
                  }
                  return newNumProcesses;
                });
              }}
            />
          </Grid>
          {departments.map((department, i) => (
            <Grid item xs={12} key={i}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label={`Department Name ${i + 1}`}
                  value={department}
                  onChange={(e) => handleDepartmentNameChange(i, e.target.value)}
                />
              </MDBox>
              <MDInput
                fullWidth
                type="number"
                label={`Number of Processes for ${department} Department`}
                value={numProcesses[i]}
                onChange={(e) => handleDepartmentProcessesChange(i, parseInt(e.target.value))}
              />
              {Array.from({ length: numProcesses[i] }).map((_, j) => (
                <Grid container spacing={2} key={j} mt={1}>

                  <Grid item xs={6}>
                    <MDInput
                      fullWidth
                      type="text"
                      label={`Process Name for ${department} Department, Process ${j + 1}`}
                      value={processes[i]?.processes?.[j]?.name || ""}
                      onChange={(e) => handleProcessNameChange(i, j, e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MDInput
                      fullWidth
                      type="text"
                      label={`Process Time for ${department} Department, Process ${j + 1}`}
                      value={processes[i]?.processes?.[j]?.time || ""}
                      onChange={(e) => handleProcessTimeChange(i, j, e.target.value)}
                    />
                  </Grid>

                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default Process;
