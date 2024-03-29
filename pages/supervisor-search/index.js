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
import MDSnackbar from "/components/MDSnackbar";
import MiniStatisticsCard from "/examples/Cards/StatisticsCards/MiniStatisticsCard";
import { getFromSupervisorSearch } from "/apiHelpers/supervisorSearch";

function DataTables() {
  const [productName, setProductName] = useState("");
  const [manpower, setManpower] = useState(1);
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [tableData, setTableData] = useState(dataTableData);
  const [output, setOutput] = useState(0);

  const [searching, setSearching] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const [snackTitle, setSnackTitle] = useState("");
  const [show2, setShow2] = useState(false);

  const toggleSnackbar = () => {
    setShow(!show);
  };
  const toggleSnackbar2 = () => {
    setShow2(!show2);
  };


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

  }, [productData]);

  useEffect(() => {
    if (data.length !== 0 && data !== undefined) {
      // console.log({ ...dataTableData, rows: data });
      // add data to table
      // console.log(data);
      // tableData.rows.forEach(element => {
      //   console.log(data);
      //   // element.manpower = data.lastNames[element.name].lastName;
      // });
      setTableData({ ...dataTableData, rows: data });
    }
  }, [data]);


  useEffect(() => {
    if (productName !== "") {
      const allData = products.find((product) => {
        if (product.product_id === productName) {
          // console.log(product);
          setProductData(product.processes);
          return product;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productName]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (productName === "" || manpower === 0) {
      toggleSnackbar2();
      return;
    }
    const firstNames = productData.map((product) => product.name);
    const lastNames = productData.map((product) => product.time);
    const number = manpower;
    // console.log(firstNames, lastNames, number);


    const apiGatewayUrl = 'https://4110ohgv2h.execute-api.us-east-2.amazonaws.com/launch';
    const resourcePath = '/p1';
    const queryParams = `firstNames=${firstNames.join(',')}&lastNames=${lastNames.join(',')}&number=${number}`;

    setSearching(true);

    // create a list of possible outputs
    const outputs = [];

    await getFromSupervisorSearch(firstNames, lastNames, number).then(data => {
      outputs.push(data);
      // console.log(data);
      // console.log(outputs);
    });
    await getFromSupervisorSearch(firstNames, lastNames, number - 1).then(data => {
      outputs.push(data);
    });
    await getFromSupervisorSearch(firstNames, lastNames, number - 2).then(data => {
      outputs.push(data);
    });

    // console.log(outputs);

    const bestOutput = outputs.reduce((prev, current, index) => {
      return (Math.abs(3600 / current.number - 3600 / number) <= Math.abs(3600 / prev.number - 3600 / number) ? { ...current, index } : { ...prev, index: prev.index });
    });

    console.log(bestOutput);
    let temp = {}

    temp.manpower = bestOutput.lastNames;
    // delete data.lastNames;
    temp.name = bestOutput.firstNames;
    // delete data.firstNames;
    setOutput(3600 / bestOutput.number);

    temp = temp.name.map((name, index) => {
      return { name: name, manpower: temp.manpower[index] };
    });
    setData(temp);
    setLoaded(true);
    setSearching(false);
    if (!bestOutput.index) {
      setSnackTitle(`Suggested Ideal Manpower: ${number} \nIdeal Output: ${Math.round(3600 / bestOutput.number)}`);
    } else {
      setSnackTitle(`Suggested Ideal Manpower: ${number - bestOutput.index} \nIdeal Output: ${Math.round(3600 / bestOutput.number)}`);
    }

    // if snackbar is close then open it
    if (!show) {
      toggleSnackbar();
    }




    // await fetch(`${apiGatewayUrl}${resourcePath}?${queryParams}`)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     // console.log(data);
    //     // rename data.lastNames to data.manpower
    //     data.manpower = data.lastNames;
    //     delete data.lastNames;
    //     data.name = data.firstNames;
    //     delete datia.frstNames;
    //     // console.log(data);
    //     // 3600 seconds in an hour / number of seconds per product
    //     setOutput(3600 / data.number);

    //     // combine two arrays into one
    //     data = data.name.map((name, index) => {
    //       return { name: name, manpower: data.manpower[index] };
    //     });
    //     // console.log(data);
    //     setData(data);
    //     setLoaded(true);
    //     setSearching(false);
    //   })
    //   .catch(error => {
    //     alert('There was an error submitting the form. Please try again later.');
    //     setSearching(false);
    //   });


    // let queryParamsCopy = `firstNames=${firstNames.join(',')}&lastNames=${lastNames.join(',')}&number=${number - 2}`;
    // await fetch(`${apiGatewayUrl}${resourcePath}?${queryParamsCopy}`)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(data2 => {
    //     // console.log(data2);
    //     // rename data.lastNames to data.manpower
    //     if (3600 / data2.number == output) {
    //       // alert(`Suggested Ideal Manpower: ${number - 2} \nIdeal Output: ${3600 / data2.number}`);
    //       setSnackTitle(`Suggested Ideal Manpower: ${number - 2} \nIdeal Output: ${3600 / data2.number}`);
    //       toggleSnackbar();
    //     } else {
    //       queryParamsCopy = `firstNames=${firstNames.join(',')}&lastNames=${lastNames.join(',')}&number=${number - 1}`;
    //       fetch(`${apiGatewayUrl}${resourcePath}?${queryParamsCopy}`)
    //         .then(response => {
    //           if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //           }
    //           return response.json();
    //         })
    //         .then(data2 => {
    //           // console.log(data2);
    //           // rename data.lastNames to data.manpower
    //           if (3600 / data2.number == output) {
    //             // alert(`Suggested Ideal Manpower: ${number - 1} \nIdeal Output: ${3600 / data2.number}`);
    //             setSnackTitle(`Suggested Ideal Manpower: ${number - 1} \nIdeal Output: ${3600 / data2.number}`);
    //             toggleSnackbar();
    //           }
    //         });
    //     }
    //   })
    //   .catch(error => {
    //     alert('There was an error submitting the form. Please try again later.');
    //     setSearching(false);
    //   });

  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDSnackbar
        icon="notifications"
        color="success"
        title="Distribution Calculated"
        content={snackTitle}
        dateTime="now"
        open={show}
        close={toggleSnackbar}
      />
      <MDSnackbar
        icon="notifications"
        color="warning"
        title="Product Not Found"
        content="The product you searched for was not found. Please try again."
        dateTime="now"
        open={show2}
        close={toggleSnackbar2}
      />
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
                    setManpower(Math.abs(event.target.value));
                  }}
                />
                <IconButton onClick={handleSubmit}>
                  <Icon color="secondary" fontSize="large">search</Icon>
                </IconButton>
                <CircularProgress color="secondary" size={30} sx={{ display: searching ? "block" : "none" }} />
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
            <MiniStatisticsCard
              title={{ text: "Ideal Output per hour" }}
              count={output}
              icon={{ color: "dark", component: "output" }}
              direction="right"
            />
          </Card>
        </MDBox>

      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
