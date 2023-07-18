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
import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";
import DataTable from "/examples/Tables/DataTable";

// Data
import dataTableData from "/pagesComponents/supervisor-search/data/dataTableData";
import { Autocomplete, CircularProgress, Grid, Icon, IconButton, TextField } from "@mui/material";
import { Fragment, use, useEffect, useState } from "react";

function DataTables() {
  const [productName, setProductName] = useState("");
  const [manpower, setManpower] = useState(1);
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [tableData, setTableData] = useState(dataTableData);

  const [open, setOpen] = useState(false);
  const loading = open;

  useEffect(() => {


    let active = true;

    if (!loading) {
      return undefined;
    }

    fetch('https://a7ivt3xloc.execute-api.us-east-2.amazonaws.com/prod-info/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data)
      });

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      // setProducts([]);
    }
  }, [open]);

  useEffect(() => {
    // dataTableData.rows = productData;
    setTableData({ ...dataTableData, rows: productData });
    console.log(tableData);
  }, [productData]);

  useEffect(() => {
    if (productName !== "") {
      const allData = products.find((product) => {
        if (product.product_id === productName) {
          console.log(product);
          setProductData(product.processes);
          return product;
        }
      });
    }
  }, [productName]);


  const handleSubmit = () => {
    // alert("Form submitted!");
    // alert(`Product Name: ${productName}, Manpower: ${manpower}`);
    // find details about the selected product
    // fetch('https://a7ivt3xloc.execute-api.us-east-2.amazonaws.com/prod-info/products')
    //   .then(response => response.json())
    //   .then(data => {
    //     setProducts(data)
    //   });

    // console.log(products);


    // console.log(products);
  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3} sx={{ boxShadow: "none", width: "80%", margin: "auto" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Autocomplete
                id="asynchronous-demo"
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                // getOptionLabel={(option) => option.title}
                // options={options}
                loading={loading}
                // value={productName}
                onChange={(event, newValue) => {
                  setProductName(newValue);
                }
                }
                disablePortal
                sx={{ width: "100%" }}
                // id="combo-box-demo"
                options={products.map((option) => option.product_id)}
                renderInput={(params) => <TextField {...params} label="Product Name" InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {loading ? <CircularProgress color="white" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }} />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MDBox mb={2} display="flex" alignItems="center">
                <TextField
                  id="outlined-number"
                  label="Manpower"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={manpower}
                  onChange={(event) => {
                    setManpower(event.target.value);
                  }}
                />
                <IconButton onClick={handleSubmit}>
                  <Icon color="secondary" fontSize="large">search</Icon>
                </IconButton>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3} sx={{ boxShadow: "none", width: "80%", margin: "auto" }}>
          <Card>
            <MDBox p={3} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Manpower Distribution Search
              </MDTypography>
              <MDTypography variant="button" color="text">
                A helper tool to divide manpower and resources efficiently.
              </MDTypography>
            </MDBox>
            <DataTable table={tableData} />
          </Card>
        </MDBox>

      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
