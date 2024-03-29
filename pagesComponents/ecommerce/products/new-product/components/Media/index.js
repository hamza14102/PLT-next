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

import { useMemo, useRef } from "react";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDDropzone from "/components/MDDropzone";

function Media() {

  const dropzoneRef = useRef();

  return (
    <MDBox>
      <MDTypography variant="h5">Media</MDTypography>
      <MDBox mt={3}>
        <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
          <MDTypography
            component="label"
            variant="button"
            fontWeight="regular"
            color="text"
          >
            Product Image
          </MDTypography>
        </MDBox>
        {useMemo(
          () => (
            <MDDropzone options={{ addRemoveLinks: true }} dropzoneRef={dropzoneRef} />
          ),
          [],
        )}
      </MDBox>
      <button onClick={() => console.log(dropzoneRef.current.dropzone.getAcceptedFiles())}>Get Files</button>
    </MDBox>
  );
}

export default Media;
