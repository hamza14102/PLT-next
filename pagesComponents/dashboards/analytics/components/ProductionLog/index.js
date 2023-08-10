import { Card } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";

function ProductionLog(produt_id) {
    const [log, setLog] = useState({});
    return (
        <div
            // centered and scrollable
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                overflow: "scroll",
                // height: "90%",
                width: "70%",
                boxShadow: 24,
                // backgroundColor: "black",
                p: 4,
            }}
        >

            {/* {modalContent} */}
            <Card>
                <MDBox
                    variant="gradient"
                    bgColor="dark"
                    borderRadius="lg"
                    coloredShadow="dark"
                    mx={2}
                    mt={0}
                    p={3}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        Log Production
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        Enter your details of production to log for today
                    </MDTypography>
                </MDBox>
                <MDBox >
                    <MDBox mt={2}
                        width="100%"
                        display="flex"
                        justifyContent="space-between"
                    >
                        <Grid container spacing={2} justify="center" style={{ margin: '1rem' }}>
                            <Grid item xs={6}>
                                <MDInput
                                    fullWidth
                                    label="Select Product"
                                    placeholder="Product Name"
                                    name="product_id"
                                    size="small"
                                    variant="outlined"
                                    value={log.product_id || 0}
                                    onChange={(e) => setLog({ ...log, product_id: e.target.value })}
                                // value="123456"
                                // disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MDInput
                                    fullWidth
                                    label="Quantity Produced"
                                    name="Quantity Produced"
                                    size="small"
                                    variant="outlined"
                                    value={log.quantity || 0}
                                    onChange={(e) => setLog({ ...log, quantity: e.target.value })}
                                // disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MDInput
                                    fullWidth
                                    label="Rejected Pieces"
                                    name="rejected"
                                    size="small"
                                    variant="outlined"
                                    value={log.rejected || 0}
                                    onChange={(e) => setLog({ ...log, rejected: e.target.value })}
                                // disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MDInput
                                    fullWidth
                                    label="Shift Number (A or B)"
                                    name="shift"
                                    size="small"
                                    variant="outlined"
                                    value={log.shift || 0}
                                    onChange={(e) => setLog({ ...log, shift: e.target.value })}
                                // disabled
                                />
                            </Grid>
                        </Grid>
                    </MDBox>
                    <MDButton
                        variant="gradient"
                        color="dark"
                        style={{ margin: '1rem' }}
                    >
                        Log Production
                    </MDButton>
                </MDBox>
            </Card>
        </div>
    );
}

export default ProductionLog;