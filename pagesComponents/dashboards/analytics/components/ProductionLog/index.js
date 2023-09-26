import { Card, CircularProgress } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import Grid from "@mui/material/Grid";
import { use, useState } from "react";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";

import { getAllProducts } from "/apiHelpers/products.js";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect } from "react";
import { postToProductionLogs } from "/apiHelpers/productionLogs.js";
import { v4 as uuidv4 } from 'uuid';
import MDDatePicker from "/components/MDDatePicker";
import { Switch } from "@mui/material";
import { useAuth } from "hooks/use-auth";
import MDSnackbar from "/components/MDSnackbar";
import { addLogsToTaskByID } from "/apiHelpers/tasks";


function ProductionLog({ product_id, task_id }) {
    const [log, setLog] = useState({ shift: 'A' });
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState("");
    const [selectedProduct, setSelectedProduct] = useState({});
    const [snackbarContent, setSnackbarContent] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setSnackbarContent({
            color: "success",
            icon: "notifications",
            title: "LOG SUCCESSFUL",
            content: "Successfully logged production",
            autoHideDuration: 6000,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            message: "Successfully logged production",
            severity: "success"
        });
    }, []);


    const handleShiftChange = (event) => {
        setLog({ ...log, shift: event.target.checked ? 'B' : 'A' });
    };

    const { isLoading, user } = useAuth();

    const getCurrentUser = () => {
        if (!isLoading && user) {
            return user.find((attr) => attr.Name === "name").Value;
        }
        return [];
    };


    useEffect(() => {
        async function fetchData() {
            const data = await getAllProducts();
            setProducts(data);
        }
        fetchData();
    }, []);

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
            <MDSnackbar
                open={open}
                color={snackbarContent.color}
                icon={snackbarContent.icon}
                title={snackbarContent.title}
                content={snackbarContent.content}
                autoHideDuration={snackbarContent.autoHideDuration}
                anchorOrigin={snackbarContent.anchorOrigin}
                close={() => setOpen(!open)}
                message={snackbarContent.message}

            />

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
                                {/* <Autocomplete
                                    onChange={(event, newValue) => {
                                        setProductName(newValue);
                                        setSelectedProduct(products.filter((product) => product._id === newValue)[0]);
                                        setLog({ ...log, product_id: newValue });
                                    }
                                    }
                                    defaultValue={product_id}
                                    disablePortal
                                    sx={{ width: "100%", mr: 1 }}
                                    id="combo-box-demo"
                                    options={products.map((option) => option._id)}
                                    renderInput={(params) => <TextField {...params} label="Product Name" />}
                                /> */}
                                <MDInput
                                    fullWidth
                                    label="Product ID"
                                    name="product_id"
                                    size="small"
                                    variant="outlined"
                                    value={product_id}
                                    // onChange={(e) => setLog({ ...log, product_id: e.target.value })}
                                    required
                                // disabled
                                />
                            </Grid>
                            <Grid container justify="flex-end" alignItems="center" item xs={6}>
                                <Grid item>
                                    <MDTypography variant="body2" fontWeight="light" color="white">
                                        Shift {log.shift}
                                    </MDTypography>
                                </Grid>
                                <Grid item>
                                    <Switch
                                        checked={log.shift === 'B' ? true : false}
                                        onChange={handleShiftChange}
                                        name="Shift"
                                        inputProps={{ 'aria-label': 'toggle between two values' }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <MDInput
                                    fullWidth
                                    label="Quantity Planned"
                                    name="Quantity Planned"
                                    type="text"
                                    size="small"
                                    variant="outlined"
                                    value={log.planned ? log.planned : ""}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, ''); // remove non-numeric characters
                                        setLog({ ...log, planned: value })
                                    }}
                                    required
                                // success
                                // disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MDInput
                                    fullWidth
                                    label="Quantity Achieved"
                                    name="Quantity Achieved"
                                    type="text"
                                    size="small"
                                    variant="outlined"
                                    value={log.quantity ? log.quantity : ""}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, ''); // remove non-numeric characters
                                        setLog({ ...log, quantity: value })
                                    }}
                                    required
                                    success
                                // disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MDInput
                                    fullWidth
                                    label="Quantity Rejected"
                                    name="rejected"
                                    size="small"
                                    variant="outlined"
                                    value={log.rejected ? log.rejected : ""}
                                    type="text"
                                    pattern="[0-9]*"
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, ''); // remove non-numeric characters
                                        setLog({ ...log, rejected: value });
                                    }}
                                    // required
                                    error
                                // disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MDInput
                                    fullWidth
                                    label="Failure Reason"
                                    name="failure reason"
                                    size="small"
                                    variant="outlined"
                                    value={log.reason ? log.reason : ""}
                                    type="text"
                                    onChange={(e) => setLog({ ...log, reason: e.target.value })}
                                    // required if rejected > 0
                                    required={log.rejected > 0 ? true : false}
                                // error
                                // disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MDInput
                                    fullWidth
                                    label="Manpower"
                                    name="manpower"
                                    size="small"
                                    variant="outlined"
                                    value={log.manpower ? log.manpower : ""}
                                    type="text"
                                    onChange={(e) => setLog({ ...log, manpower: e.target.value })}
                                    required
                                // error
                                // disabled
                                />
                            </Grid>
                            {/* <Grid item xs={6}>
                                <MDInput
                                    fullWidth
                                    input={{ placeholder: "Log Date" }}
                                    value={log.date ? log.date : new Date()}
                                    label="Log Date"
                                    type="date"
                                    // set default calendar date to today
                                    onChange={(e) => setLog({ ...log, date: e.target.value })}
                                    required
                                />
                            </Grid> */}
                        </Grid>
                    </MDBox>
                    {
                        submitting ?
                            <CircularProgress />
                            :
                            <MDButton
                                variant="gradient"
                                color="dark"
                                style={{ margin: '1rem' }}
                                onClick={async () => {
                                    setSubmitting(true);
                                    // console.log(log);
                                    // check if all fields are filled
                                    // console.log("logged by: ", getCurrentUser());
                                    log.logged_by = getCurrentUser();
                                    log.product_id = product_id;
                                    if (!log.product_id || !log.quantity || !log.shift || !log.planned || !log.manpower) {
                                        // alert("Please fill all essential fields");
                                        setSnackbarContent({
                                            ...snackbarContent,
                                            color: "error",
                                            icon: "notifications",
                                            title: "LOG FAILED",
                                            content: "Please fill all essential fields",
                                            message: "Please fill all essential fields",
                                        });
                                        setOpen(true);

                                        setSubmitting(false);
                                        return;
                                    }
                                    if (!log.rejected) {
                                        log.rejected = 0;
                                    }
                                    // reason is required if rejected > 0
                                    if (log.rejected > 0 && !log.reason) {
                                        // alert("Please fill the reason for rejection");
                                        setSnackbarContent({
                                            ...snackbarContent,
                                            color: "error",
                                            icon: "notifications",
                                            title: "LOG FAILED",
                                            content: "Please fill the reason for rejection",
                                            message: "Please fill the reason for rejection",
                                        });
                                        setOpen(true);
                                        setSubmitting(false);
                                        return;
                                    }
                                    // create a new log _id 
                                    log._id = uuidv4();

                                    // set date to today in UTC+5:30, and keep only date as a string
                                    log.date = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
                                    // change format to DD-MM-YYYY
                                    log.date = log.date.toLocaleDateString();
                                    // log.date = log.date.toISOString().split('T')[0];

                                    // log.date = log.date.toLocaleDateString();
                                    const resp = await postToProductionLogs(log);
                                    // close modal
                                    // alert("Successfully logged production");
                                    setSnackbarContent({
                                        ...snackbarContent,
                                        open: true,
                                        color: "success",
                                        icon: "notifications",
                                        title: "LOG SUCCESSFUL",
                                        content: "Successfully logged production",
                                        message: "Successfully logged production",
                                    });
                                    setOpen(true);
                                    addLogsToTaskByID(task_id, log.quantity, log.rejected);
                                    setSubmitting(false);
                                    // reset log
                                    setLog({ shift: 'A' });
                                }}
                            >
                                Log Production
                            </MDButton>
                    }
                </MDBox>
            </Card>
        </div >
    );
}

export default ProductionLog;