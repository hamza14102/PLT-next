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
import { addLogsToProductByID } from "/apiHelpers/products.js";
import { getUsers } from "apiHelpers/users";
import { putToTasks } from "/apiHelpers/tasks";


function NewOrderForm({ product_id }) {
    const [log, setLog] = useState({
        users: {},
    });
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [snackbarContent, setSnackbarContent] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedPFC, setSelectedPFC] = useState([]);
    const [listOfUsers, setListOfUsers] = useState([]);

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
            const users = await getUsers();
            setListOfUsers(users.map((user) => user.name));
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedProduct) {
            // console.log(selectedProduct);
            // flatten the 2d pfc array
            const pfc_flat = selectedProduct.pfc.flat();
            setSelectedPFC(pfc_flat);
            console.log(pfc_flat);
        }
    }, [selectedProduct]);

    return (
        <div>
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
                <MDBox >
                    <MDBox mt={2}
                        width="100%"
                        display="flex"
                        justifyContent="space-between"
                    >
                        <Grid container spacing={2} justify="center" style={{ margin: '1rem' }}>
                            <Grid item xs={6}>
                                <Autocomplete
                                    onChange={(event, newValue) => {
                                        setProductName(newValue);
                                        setSelectedProduct(newValue);
                                        setLog({ ...log, product_id: newValue?._id });
                                    }}
                                    defaultValue={product_id}
                                    disablePortal
                                    sx={{ width: "100%", mr: 1 }}
                                    id="combo-box-demo"
                                    options={products}
                                    getOptionLabel={(option) => `${option.name} (${option._id})`}
                                    renderOption={(props, option) => (
                                        <li {...props} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <MDTypography variant="body2" fontWeight="light" color="text.secondary" style={{ marginRight: 'auto' }}>
                                                {option.name}
                                            </MDTypography>
                                            <MDTypography variant="caption" fontWeight="light" color="text.secondary">
                                                {option._id}
                                            </MDTypography>
                                        </li>
                                    )}
                                    renderInput={(params) => <TextField {...params} label="Product Name" />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MDInput
                                    fullWidth
                                    label="PO/OMS Number"
                                    name="PO/OMS Number"
                                    type="text"
                                    variant="outlined"
                                    value={log['PO/OMS'] ? log['PO/OMS'] : ""}
                                    onChange={(e) => {
                                        setLog({ ...log, ['PO/OMS']: e.target.value })
                                    }}
                                    required
                                // success
                                // disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MDInput
                                    fullWidth
                                    label="Order Quantity"
                                    name="Order Quantity"
                                    type="text"
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
                                    input={{ placeholder: "Shipment Date" }}
                                    value={log.date ? log.date : new Date()}
                                    label="Shipment Date"
                                    type="date"
                                    // set default calendar date to today
                                    onChange={(e) => setLog({ ...log, date: e.target.value })}
                                    required
                                />
                            </Grid>
                            {selectedProduct &&
                                (
                                    <Grid item xs={12}>
                                        <MDTypography variant="h6" fontWeight="medium" color="text" mt={1} mb={1} textAlign="center">
                                            Assign Head of Departments
                                        </MDTypography>
                                    </Grid>
                                )}
                            {selectedPFC && selectedPFC.map((pfc, index) => {
                                const key = `${pfc}|${index}`; // generate unique key
                                return (
                                    <Grid item xs={6} key={key}>
                                        {/* <MDInput
                                            fullWidth
                                            label={pfc}
                                            name={pfc}
                                            type="text"
                                            variant="outlined"
                                            value={log['users'] && log['users'][key] ? log['users'][key] : ""}
                                            onChange={(e) => {
                                                setLog({
                                                    ...log,
                                                    ['users']: {
                                                        ...log['users'],
                                                        [key]: e.target.value
                                                    }
                                                })
                                            }}
                                            required
                                        /> */}
                                        <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            options={listOfUsers}
                                            getOptionLabel={(option) => option}
                                            defaultValue={[]}
                                            onChange={(e, value) => {
                                                setLog({
                                                    ...log,
                                                    ['users']: {
                                                        ...log['users'],
                                                        [key]: value
                                                    }
                                                })
                                            }}
                                            renderInput={(params) => (
                                                <MDInput
                                                    {...params}
                                                    variant="standard"
                                                    label={pfc}
                                                    fullWidth
                                                // placeholder="Users"
                                                />
                                            )}
                                        />
                                    </Grid>
                                );
                            })}
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
                                    // const job_id = uuidv4();
                                    // console.log(log);
                                    // for every element in 'users' object, add a log to the product
                                    for (const [key, value] of Object.entries(log['users'])) {
                                        const job_name = key.split('|')[0];
                                        const job_id = uuidv4();
                                        const logData = {
                                            _id: job_id,
                                            product_id: log.product_id,
                                            quantity: log.quantity,
                                            shipment_date: log.date,
                                            user_ids: value,
                                            status: "started",
                                            'PO/OMS': log['PO/OMS'],
                                            image_key: selectedProduct.image_key,
                                            rejected: 0,
                                            remaining: log.quantity,
                                            job_name: `${selectedProduct.name} | ${job_name}`,
                                        };
                                        const product_post_response = await putToTasks(logData);
                                        console.log(product_post_response);
                                        // console.log(logData);
                                        // await postToProductionLogs(logData);
                                        // await addLogsToProductByID(log.product_id, job_id);
                                    }

                                    setSubmitting(false);
                                }}
                            >
                                Start Order
                            </MDButton>
                    }
                </MDBox>
            </Card>
        </div >
    );
}

export default NewOrderForm;