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

// Sales dashboard components
import ProductCell from "/pagesComponents/dashboards/sales/components/ProductCell";
import RefundsCell from "/pagesComponents/dashboards/sales/components/RefundsCell";
import DefaultCell from "/pagesComponents/dashboards/sales/components/DefaultCell";

// Images
import nikeV22 from "/assets/images/ecommerce/blue-shoe.jpeg";
import businessKit from "/assets/images/ecommerce/black-mug.jpeg";
import blackChair from "/assets/images/ecommerce/black-chair.jpeg";
import wirelessCharger from "/assets/images/ecommerce/bang-sound.jpeg";
import tripKit from "/assets/images/ecommerce/photo-tools.jpeg";

const dataTableData = {
  columns: [
    { Header: "product", accessor: "product", width: "55%" },
    { Header: "cost efficiency", accessor: "cost_efficiency" },
    { Header: "manpower", accessor: "adsSpent", align: "center" },
    { Header: "rejection", accessor: "refunds", align: "center" },
  ],

  rows: [
    {
      product: (
        <ProductCell image={nikeV22} name="Employee 1" orders={8.232} />
      ),
      cost_efficiency: <DefaultCell>123%</DefaultCell>,
      adsSpent: <DefaultCell>95</DefaultCell>,
      refunds: <DefaultCell>5%</DefaultCell>,
      // refunds: (
      //   <RefundsCell
      //     value={5}
      //     icon={{ color: "success", name: "keyboard_arrow_up" }}
      //   />
      // ),
    },
    {
      product: (
        <ProductCell
          image={businessKit}
          name="Employee 2"
          orders={12.821}
        />
      ),
      cost_efficiency: <DefaultCell>118%</DefaultCell>,
      adsSpent: <DefaultCell>20</DefaultCell>,
      refunds: <DefaultCell>3%</DefaultCell>,
      // refunds: (
      //   <RefundsCell
      //     value={3}
      //     icon={{ color: "error", name: "keyboard_arrow_down" }}
      //   />
      // ),
    },
    {
      product: (
        <ProductCell image={blackChair} name="Employee 3" orders={2.421} />
      ),
      cost_efficiency: <DefaultCell>105%</DefaultCell>,
      adsSpent: <DefaultCell>43</DefaultCell>,
      refunds: <DefaultCell>6%</DefaultCell>,
      // refunds: (
      //   <RefundsCell
      //     value={6}
      //     icon={{ color: "success", name: "keyboard_arrow_up" }}
      //   />
      // ),
    },
  ],
};

export default dataTableData;
