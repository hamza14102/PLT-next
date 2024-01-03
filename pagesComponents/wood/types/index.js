import { Card, CircularProgress } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import Grid from "@mui/material/Grid";
import { use, useState } from "react";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";


import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect } from "react";
import { postToProductionLogs } from "/apiHelpers/productionLogs.js";
import { v4 as uuidv4 } from 'uuid';
import MDDatePicker from "/components/MDDatePicker";
import { Switch } from "@mui/material";
import { useAuth } from "hooks/use-auth";
import MDSnackbar from "/components/MDSnackbar";



function NewOrderForm({ product_id }) {
    const [log, setLog] = useState({
        name: "",
        id: "",
        sizes: [],
    });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [snackbarContent, setSnackbarContent] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const [numSizes, setNumSizes] = useState(0);

    useEffect(() => {
        setSnackbarContent({
            color: "success",
            icon: "notifications",
            title: "NEW TASK SUCCESSFUL",
            content: "Successfully created new task",
            autoHideDuration: 6000,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            message: "Successfully created new task",
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
                            <Grid item xs={5}>
                                <MDInput
                                    fullWidth
                                    label="Wood Name"
                                    name="Wood Name"
                                    type="text"
                                    variant="outlined"
                                    value={log.name ? log.name : ""}
                                    onChange={(e) => {
                                        setLog({ ...log, name: e.target.value })
                                    }}
                                    required
                                // success
                                // disabled
                                />

                            </Grid>
                            <Grid item xs={5}>
                                <MDInput
                                    fullWidth
                                    label="Wood ID"
                                    name="Wood ID"
                                    type="text"
                                    variant="outlined"
                                    value={log.id ? log.id : ""}
                                    onChange={(e) => {
                                        setLog({ ...log, id: e.target.value })
                                    }}
                                    required
                                // success
                                // disabled
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <MDButton
                                    color="dark"
                                    variant="gradient"
                                    onClick={() => {
                                        // console.log(log);
                                        setLog({
                                            ...log,
                                            sizes: [...log.sizes, {
                                                H: 0,
                                                W: 0,
                                                D: 0,
                                            }],

                                        });
                                    }
                                    }
                                >
                                    Add Size
                                </MDButton>
                            </Grid>
                            {log.sizes.length > 0 ?
                                log.sizes.map((size, index) => {
                                    // list all the sizes (W, H, D)
                                    return (
                                        <Grid container spacing={2} justify="center" style={{ margin: '1rem' }} key={index}>
                                            <Grid item xs={3}>
                                                <MDInput
                                                    fullWidth
                                                    label="Height"
                                                    name="Height"
                                                    type="number"
                                                    variant="outlined"
                                                    value={size.H}
                                                    onChange={(e) => {
                                                        const new_sizes = [...log.sizes];
                                                        new_sizes[index].H = e.target.value;
                                                        setLog({ ...log, sizes: new_sizes })
                                                    }}
                                                    required
                                                // success
                                                // disabled
                                                />

                                            </Grid>
                                            <Grid item xs={3}>
                                                <MDInput
                                                    fullWidth
                                                    label="Width"
                                                    name="Width"
                                                    type="number"
                                                    variant="outlined"
                                                    value={size.W}
                                                    onChange={(e) => {
                                                        const new_sizes = [...log.sizes];
                                                        new_sizes[index].W = e.target.value;
                                                        setLog({ ...log, sizes: new_sizes })
                                                    }}
                                                    required
                                                // success
                                                // disabled
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <MDInput
                                                    fullWidth
                                                    label="Depth"
                                                    name="Depth"
                                                    type="number"
                                                    variant="outlined"
                                                    value={size.D}
                                                    onChange={(e) => {
                                                        const new_sizes = [...log.sizes];
                                                        new_sizes[index].D = e.target.value;
                                                        setLog({ ...log, sizes: new_sizes })
                                                    }}
                                                    required
                                                // success
                                                // disabled
                                                />
                                            </Grid>
                                            {/* button to remove this row */}
                                            <Grid item xs={3}>
                                                <MDButton
                                                    color="dark"
                                                    variant="gradient"
                                                    onClick={() => {
                                                        // console.log(log);
                                                        const new_sizes = [...log.sizes];
                                                        new_sizes.splice(index, 1);
                                                        setLog({ ...log, sizes: new_sizes })
                                                    }
                                                    }
                                                >
                                                    Remove
                                                </MDButton>
                                            </Grid>
                                        </Grid>
                                    )

                                })
                                :
                                null
                            }


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
                                    // save log in local file
                                    // console.log(log);
                                    setSubmitting(true);
                                    const newLog = {
                                        ...log,
                                        id: uuidv4(),
                                        date: new Date().toISOString(),
                                        user: getCurrentUser(),
                                    };
                                    console.log(newLog);


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