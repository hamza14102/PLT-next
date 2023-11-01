import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import MDBox from '/components/MDBox';
import MDTypography from '/components/MDTypography';

function Process({ formData }) {

  const { formField, values, errors, touched } = formData;
  const { password } =
    formField;
  const {
    password: passwordV,
  } = values;


  const categories = [
    ['Mach Shop', 'Fabrication', 'Finish', 'Outsourced', 'Others'],
    ['Mach Shop', 'Fabrication', 'Finish', 'Outsourced', 'Others'],
    ['Bandsaw', 'Mach Shop', 'Fabrication', 'Finish', 'Outsourced', 'Others'],
    ['Fitting', 'Hall 1', 'Hall 2', 'Hall 3'],
    ['Marble'],
    ['Fabric']
  ];

  const prefix = [
    'M ',
    'M2 ',
    'W ',
    '',
    '',
    ''
  ];

  const departmentNames = ["Metal - I", "Metal - II", "Wood", "Packing", "Marble", "Fabric"];

  const [checked, setChecked] = useState(categories.map((category) => category.map(() => false)));

  const handleCheckboxChange = (event, categoryIndex, checkboxIndex) => {
    const newChecked = [...checked];
    newChecked[categoryIndex][checkboxIndex] = event.target.checked;
    setChecked(newChecked);
  };

  const handleGroupCheckboxChange = (event, categoryIndex) => {
    const newChecked = [...checked];
    newChecked[categoryIndex] = newChecked[categoryIndex].map(() => event.target.checked);
    setChecked(newChecked);
  };

  const isGroupChecked = (categoryIndex) => {
    return checked[categoryIndex].every((checkbox) => checkbox);
  };

  const isGroupIndeterminate = (categoryIndex) => {
    return checked[categoryIndex].some((checkbox) => checkbox);
  };

  const alertChecked = () => {

    const listOfChecked = checked.map((category, categoryIndex) => {
      const groupChecked = category.some((checkbox) => checkbox);
      const groupCheckboxes = category
        .map((checkbox, checkboxIndex) => {
          return {
            name: categories[categoryIndex][checkboxIndex],
            checked: checkbox
          };
        })
        .filter((checkbox) => checkbox.checked);
      const checkedNames = [
        ...(groupChecked ? [`${departmentNames[categoryIndex]}`] : []),
        ...groupCheckboxes.map((checkbox) => checkbox.name)
      ];
      return [...new Set(checkedNames)];
    });
    console.log(listOfChecked);
    // console.log(listOfChecked);
    // alert(listOfChecked);
  };

  useEffect(() => {

    // formData.process = checked;
    const listOfChecked = checked.map((category, categoryIndex) => {
      const groupChecked = category.some((checkbox) => checkbox);
      const groupCheckboxes = category
        .map((checkbox, checkboxIndex) => {
          return {
            name: categories[categoryIndex][checkboxIndex],
            checked: checkbox
          };
        })
        .filter((checkbox) => checkbox.checked);
      const checkedNames = [
        ...(groupChecked ? [`${departmentNames[categoryIndex]}`] : []),
        ...groupCheckboxes.map((checkbox) => `${prefix[categoryIndex]}` + checkbox.name)
      ];
      return [...new Set(checkedNames)];
    });
    values.password = listOfChecked;
    console.log(listOfChecked);
  }, [checked]);


  return (
    <MDBox>
      <MDTypography variant="h5" fontWeight="bold">
        Process
      </MDTypography>
      <MDBox mt={2}>
        <Grid container spacing={0}>
          {categories.map((category, categoryIndex) => (
            <Grid item xs={12 / categories.length} key={categoryIndex}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isGroupIndeterminate(categoryIndex)}
                    indeterminate={isGroupIndeterminate(categoryIndex)}
                    onChange={(event) => handleGroupCheckboxChange(event, categoryIndex)}
                    name={`${departmentNames[categoryIndex]}`}
                  />
                }
                label={`${departmentNames[categoryIndex]}`}
              />
              {category.map((checkboxLabel, checkboxIndex) => (
                <FormControlLabel
                  key={checkboxIndex}
                  control={
                    <Checkbox
                      checked={checked[categoryIndex][checkboxIndex]}
                      onChange={(event) => handleCheckboxChange(event, categoryIndex, checkboxIndex)}
                      name={`Category ${categoryIndex + 1} Checkbox ${checkboxIndex + 1}`}
                    />
                  }
                  label={checkboxLabel}
                />
              ))}
            </Grid>
          ))}
        </Grid>
        {/* <Button onClick={alertChecked}>Check</Button> */}
      </MDBox>
    </MDBox>
  );
}

export default Process;