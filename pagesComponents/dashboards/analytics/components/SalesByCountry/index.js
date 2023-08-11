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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// NextJS Material Dashboard 2 PRO examples
import SalesTable from "/examples/Tables/SalesTable";

// Data
import salesTableData from "/pagesComponents/dashboards/analytics/components/SalesByCountry/data/salesTableData";

import { getFromProductsByAssignedUser } from "apiHelpers/products";
import { useAuth } from "hooks/use-auth";
import { CircularProgress } from "@mui/material";

function SalesByCountry() {
  const [products, setProducts] = useState([]);
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const getCurrentUserID = () => {
    if (!auth.isLoading && auth.user) {
      return auth.user.find((attr) => attr.Name === "name").Value;
    }
    return [];
  };

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const jsVectorMap = require("jsvectormap");
    require("jsvectormap/dist/maps/world-merc.js");


    const userID = getCurrentUserID();

    getFromProductsByAssignedUser(userID).then((res) => {

      // change variable names to match your schema
      res = res.map((product) => {
        return {
          name: product._id,
          quantity: product.Quantity,
          // total: product.price * product.quantity,
          'Shipment Date': product['Ship By Date'],
          Buyer: product.Buyer,
          Rejection: product.Rejection ? product.Rejection : "0%",
          // status: product.status,
          // createdAt: product.createdAt,
        };
      });

      setProducts(res);
      setLoading(false);
    });
    // console.log(prod);

    // console.log(prod);

    const createMap = () =>
      new jsVectorMap({
        selector: "#map",
        map: "world_merc",
        zoomOnScroll: false,
        zoomButtons: false,
        selectedMarkers: [],
        markersSelectable: false,
        markers: [
          // {
          //   name: "USA",
          //   coords: [40.71296415909766, -74.00437720027804],
          // },
          // {
          //   name: "Germany",
          //   coords: [51.17661451970939, 10.97947735117339],
          // },
          // {
          //   name: "Brazil",
          //   coords: [-7.596735421549542, -54.781694323779185],
          // },
          // {
          //   name: "Russia",
          //   coords: [62.318222797104276, 89.81564777631716],
          // },
          {
            name: "India",
            coords: [20.5937, 78.9629],
          },
        ],
        markerStyle: {
          initial: {
            fill: "#1A73E8",
          },
          hover: {
            fill: "#1A73E8",
          },
          selected: {
            fill: "#191919",
          },
        },
      });

    if (mapContainer && mapContainer.children.length === 0) createMap();

    () => mapContainer.children[0].remove();
  }, []);

  return (
    <Card sx={{ width: "100%" }}>
      <MDBox display="flex">
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          variant="gradient"
          bgColor="success"
          color="white"
          shadow="md"
          borderRadius="xl"
          ml={3}
          mt={-2}
        >
          <Icon fontSize="medium" color="inherit">
            language
          </Icon>
        </MDBox>
        <MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }}>
          Production by Product
        </MDTypography>
        {
          loading && (
            <CircularProgress
              sx={{
                position: "absolute",
                right: "1rem",
                top: "1rem",
              }}

            />
          )
        }
      </MDBox>
      <MDBox p={2}>
        <Grid container>
          <Grid item xs={12} md={7} lg={6}>
            <SalesTable rows={products} shadow={false} />
          </Grid>
          <Grid item xs={12} md={5} lg={6} sx={{ mt: { xs: 5, lg: 0 } }}>
            <MDBox id="map" width="100%" height="100%" mt={-3} />
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default SalesByCountry;
