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

import Image from "next/image";

// @mui material components
import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";

// Images
import productImageDefault from "/assets/images/Door Stopper.jpg";
// change deafult image to something else
import { useEffect, useState } from "react";

import { getProductImagePresignedUrlFromImageKey } from "apiHelpers/products";

function ProductImage({ product }) {
  const [productImage, setProductImage] = useState(null);
  // const [loading, setLoading] = useState(true);


  useEffect(() => {
    console.log(product);
    // fetch image from s3
    const image_key = product?.image_key;
    if (image_key) {
      getProductImagePresignedUrlFromImageKey(image_key).then((url) => {
        setProductImage(url);
      });
    }
  }, [product]);


  return (
    <Card
      sx={{
        "&:hover .card-header": {
          transform: "translate3d(0, -50px, 0)",
        },
      }}
    >
      <MDBox
        position="relative"
        borderRadius="lg"
        mt={-3}
        mx={2}
        className="card-header"
        sx={{ transition: "transform 300ms cubic-bezier(0.34, 1.61, 0.7, 1)" }}
      >
        <MDBox
          borderRadius="lg"
          shadow="sm"
          width="100%"
          height="16.25rem"
          position="relative"
          zIndex={10}
          mb={2}
          overflow="hidden"
        >
          <Image
            src={productImage ? productImage : productImageDefault}
            alt="Product Image"
            sizes="100%"
            width={1000}
            height={1000}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </MDBox>
      </MDBox>
      <MDBox textAlign="center" pt={2} pb={3} px={3}>
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={-10}
          position="relative"
          zIndex={1}
        >
          <MDBox mr={1}>
            <MDButton variant="gradient" color="dark" size="small">
              edit
            </MDButton>
          </MDBox>
          <MDButton variant="outlined" color="error" size="small">
            remove
          </MDButton>
        </MDBox>
        <MDTypography variant="h5" fontWeight="regular" sx={{ mt: 4 }}>
          Door Stopper
        </MDTypography>
        <MDTypography variant="body2" color="text" sx={{ mt: 1.5, mb: 1 }}>
          Product Description Here!
        </MDTypography>
      </MDBox>
    </Card>
  );
}

export default ProductImage;
