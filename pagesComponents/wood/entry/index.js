import { Button, ButtonGroup, Card, CircularProgress, FormControl, FormControlLabel, Icon, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import Grid from "@mui/material/Grid";
import { use, useState } from "react";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";


import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Switch } from "@mui/material";
import { useAuth } from "hooks/use-auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postToGateEntries } from "apiHelpers/wood";



function EntryLog() {
    const [submitting, setSubmitting] = useState(false);
    const [entryDetails, setEntryDetails] = useState({});


    const handleSubmit = async () => {
        setSubmitting(true);
        // wait 2 seconds
        // make sure all fields are filled otherwise show error through toast
        if (!entryDetails.billNumber || !entryDetails.billDate || !entryDetails.PONumber || !entryDetails.vehicleNumber || !entryDetails.inTime || !entryDetails.inDate) {
            toast.error('Please fill all the fields');
            setSubmitting(false);
            return;
        }

        const entry = {
            ...entryDetails,
            _id: uuidv4(),
            name: getCurrentUser(),
        }
        // console.log(entry);
        const response = await postToGateEntries(entry);
        // console.log(response);

        setSubmitting(false);
    }



    const { isLoading, user } = useAuth();

    const getCurrentUser = () => {
        if (!isLoading && user) {
            return user.find((attr) => attr.Name === "name").Value;
        }
        return [];
    };

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Card>
                <MDBox >
                    <MDBox mt={2}
                        width="100%"
                        display="flex"
                        justifyContent="space-between"
                    >
                        <Grid container spacing={2} justify="center" style={{ margin: '1rem' }}>
                            <Grid item xs={4}>
                                <MDInput
                                    fullWidth
                                    label="Bill Number"
                                    variant="outlined"
                                    size="large"
                                    onChange={(e) => setEntryDetails({ ...entryDetails, billNumber: e.target.value })}
                                />
                            </Grid>
                            {/* <Grid item xs={4}>
                                <MDInput
                                    fullWidth
                                    label="Supplier Name"
                                    variant="outlined"
                                    size="large"
                                    onChange={(e) => setEntryDetails({ ...entryDetails, supplierName: e.target.value })}
                                />
                            </Grid> */}
                            <Grid item xs={4}>
                                <MDInput
                                    fullWidth
                                    label="Bill Date"
                                    type="date"
                                    value={entryDetails.billDate ? entryDetails.billDate : new Date()}
                                    onChange={(e) => setEntryDetails({ ...entryDetails, billDate: e.target.value })}
                                />

                            </Grid>

                            <Grid item xs={4}>
                                <MDInput
                                    fullWidth
                                    label="PO Number"
                                    variant="outlined"
                                    size="large"
                                    onChange={(e) => setEntryDetails({ ...entryDetails, PONumber: e.target.value })}
                                />
                            </Grid>
                            {/* <Grid item xs={4}>
                                <MDInput
                                    fullWidth
                                    label="Part Description"
                                    variant="outlined"
                                    size="large"
                                    onChange={(e) => setEntryDetails({ ...entryDetails, partDescription: e.target.value })}
                                />
                            </Grid> */}
                            {/* <Grid item xs={4}>
                                <MDInput
                                    fullWidth
                                    label="Quantity Received"
                                    variant="outlined"
                                    size="large"
                                    onChange={(e) => setEntryDetails({ ...entryDetails, qtyReceieved: e.target.value })}
                                />
                            </Grid> */}
                            {/* <Grid item xs={4}>
                                <MDInput
                                    fullWidth
                                    label="Quantity Unit"
                                    variant="outlined"
                                    size="large"
                                    onChange={(e) => setEntryDetails({ ...entryDetails, qtyUnit: e.target.value })}
                                />
                            </Grid> */}
                            <Grid item xs={4}>
                                <MDInput
                                    fullWidth
                                    label="Vehicle Number"
                                    variant="outlined"
                                    size="large"
                                    onChange={(e) => setEntryDetails({ ...entryDetails, vehicleNumber: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <MDInput
                                    fullWidth
                                    label="In Time"
                                    variant="outlined"
                                    size="large"
                                    type="time"
                                    value={entryDetails.inTime ? entryDetails.inTime : new Date()}
                                    onChange={(e) => setEntryDetails({ ...entryDetails, inTime: e.target.value })}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <MDInput
                                    fullWidth
                                    label="In Date"
                                    type="date"
                                    value={entryDetails.billDate ? entryDetails.inDate : new Date().toTimeString()}
                                    onChange={(e) => setEntryDetails({ ...entryDetails, inDate: e.target.value })}
                                />
                            </Grid>

                            {/* <Grid item xs={4}>
                                <MDInput
                                    fullWidth
                                    label="Rate Per CFT"
                                    variant="outlined"
                                    size="large"
                                    onChange={(e) => setEntryDetails({ ...entryDetails, rate: e.target.value })}
                                />
                            </Grid> */}

                            {/* <Grid item xs={4}>
                                <MDInput
                                    fullWidth
                                    label="Total Amount"
                                    variant="outlined"
                                    size="large"
                                    onChange={(e) => setEntryDetails({ ...entryDetails, totalAmount: e.target.value })}
                                />
                            </Grid> */}

                            {/* submit button */}
                            <Grid item xs={12}>
                                {submitting ?
                                    <CircularProgress />
                                    :
                                    <MDButton
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </MDButton>
                                }
                            </Grid>

                        </Grid>

                    </MDBox>
                </MDBox>
            </Card>
        </div >
    );
}

export default EntryLog;