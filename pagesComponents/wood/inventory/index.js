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
import { getInventoryByPONo } from "apiHelpers/wood";



function InventoryView() {
    const [submitting, setSubmitting] = useState(false);
    const [orderNo, setOrderNo] = useState(0);
    const [inventory, setInventory] = useState(null);
    const [analyzedInventory, setAnalyzedInventory] = useState(null);
    const [billNoOptions, setBillNoOptions] = useState([]);
    const [billNo, setBillNo] = useState(null);


    const handleSubmit = async () => {
        console.log('submitting');
        setSubmitting(true);
        // setInventory(tempInventory[orderNo]);
        const inventory = await getInventoryByPONo(orderNo).then(
            (data) => {
                console.log(data);
                // setInventory(data[0]);
                return data;
            }
        );

        const billNos = inventory.map((inv) => inv.billNumber);
        console.log(billNos);
        setBillNoOptions(billNos);
        setSubmitting(false);

    }

    useEffect(() => {
        if (billNo) {
            const inventory = tempInventory[billNo];
            setInventory(inventory);
        }
    }, [billNo])


    useEffect(() => {
        const analyzed = AnalyzeInventory();
        console.log(analyzed);
        setAnalyzedInventory(analyzed);

    }, [inventory])

    const AnalyzeInventory = () => {
        if (inventory) {
            console.log(inventory);
            const planks = inventory.planks;
            const analyzedPlanks = [];
            // get all planks that are not rejected
            const goodPlanks = planks.filter((plank) => !plank.rejectionReason);
            // get total CFT of good planks
            const totalCFT = goodPlanks.reduce((total, plank) => {
                return total + plank.H * plank.W * plank.L / 12;
            }, 0);
            // get rejected planks
            const rejectedPlanks = planks.filter((plank) => plank.rejectionReason);
            // get total CFT of rejected planks
            const rejectedCFT = rejectedPlanks.reduce((total, plank) => {
                return total + plank.H * plank.W * plank.L / 12;
            }, 0);
            // get rejection percentage
            const rejectionPercentage = rejectedCFT / (totalCFT + rejectedCFT) * 100;
            return {
                totalCFT,
                rejectedCFT,
                rejectionPercentage
            }
        }
    }


    const tempInventory = {
        '1': {
            'id': '1',
            'planks': [
                { H: 10, W: 1, L: 3 },
                { H: 10, W: 1, L: 21 },
                { H: 10, W: 1, L: 38, rejectionReason: "size" },
                { H: 10, W: 1, L: 47 },
                { H: 10, W: 1, L: 21, rejectionReason: "knots" },
                { H: 10, W: 1, L: 8 },
                { H: 10, W: 1, L: 5 },
                { H: 10, W: 1, L: 18 },
                { H: 10, W: 1, L: 29 },
                { H: 10, W: 1, L: 41, rejectionReason: "cracks" },
                { H: 10, W: 1, L: 39 },
                { H: 10, W: 1, L: 51 },
                { H: 10, W: 1, L: 50 },
                { H: 10, W: 1, L: 44, rejectionReason: "bugs" },
            ]
        },
        '2': {
            'id': '2',
            'planks': [
                { H: 10, W: 1, L: 3 },
                { H: 10, W: 1, L: 21 },
                { H: 10, W: 1, L: 11, rejectionReason: "knots" },
                { H: 10, W: 1, L: 28 },
                { H: 10, W: 1, L: 38, rejectionReason: "size" },
                { H: 10, W: 1, L: 47 },
                { H: 10, W: 1, L: 21, rejectionReason: "knots" },
                { H: 10, W: 1, L: 29 },
                { H: 10, W: 1, L: 41, rejectionReason: "cracks" },
                { H: 10, W: 1, L: 39 },
                { H: 10, W: 1, L: 51 },
                { H: 10, W: 1, L: 50 },
                { H: 10, W: 1, L: 21, rejectionReason: "size" }
            ]
        },
        '3':
        {
            'id': '3',
            'planks': [
                { H: 10, W: 1, L: 3 },
                { H: 10, W: 1, L: 21 },
                { H: 10, W: 1, L: 15 },
                { H: 10, W: 1, L: 11, rejectionReason: "knots" },
                { H: 10, W: 1, L: 28 },
                { H: 10, W: 1, L: 47 },
                { H: 10, W: 1, L: 21, rejectionReason: "knots" },
                { H: 10, W: 1, L: 8 },
                { H: 10, W: 1, L: 5 },
                { H: 10, W: 1, L: 18 },
                { H: 10, W: 1, L: 29 },
                { H: 10, W: 1, L: 41, rejectionReason: "cracks" },
                { H: 10, W: 1, L: 39 },
                { H: 10, W: 1, L: 51 },
                { H: 10, W: 1, L: 50 },
                { H: 10, W: 1, L: 44, rejectionReason: "bugs" },
            ]
        },
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
                            <Grid item xs={7}>
                                <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
                                    PO Number
                                </MDTypography>
                                <MDInput
                                    fullWidth
                                    onChange={(e) => setOrderNo(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                {/* give margin to align with input line */}

                                {/* Search Button */}
                                {
                                    submitting ?
                                        <CircularProgress
                                            style={{ marginTop: '2.25rem' }}
                                        /> :
                                        <MDButton
                                            color="primary"
                                            variant="gradient"
                                            onClick={() => {
                                                toast('Searching for Job Number ' + orderNo, {
                                                    position: "top-right",
                                                    autoClose: 5000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                });
                                                handleSubmit();
                                            }}
                                            disabled={submitting}
                                            style={{ marginTop: '2.25rem' }}
                                        >
                                            <Icon
                                            >
                                                search
                                            </Icon>
                                        </MDButton>
                                }
                            </Grid>

                            <Grid item xs={4}>
                                <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
                                    Bill Number
                                </MDTypography>
                                <Autocomplete
                                    fullWidth
                                    id="combo-box-demo"
                                    options={billNoOptions}
                                    onChange={(event, newValue) => {
                                        setBillNo(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>


                            {
                                inventory && analyzedInventory &&
                                <Grid item xs={12}>
                                    <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
                                        Inventory
                                    </MDTypography>
                                    <MDBox
                                        variant="gradient"
                                        bgColor="dark"
                                        borderRadius="lg"
                                        coloredShadow="dark"
                                        mx={2}
                                        mt={3}
                                        p={3}
                                        mb={1}
                                        textAlign="center"
                                    >
                                        <Grid container spacing={1} justify="center" >
                                            <Grid item xs={12} sm={6} >
                                                <MDTypography variant="h5" fontWeight="medium" color="white" align="center" style={{ border: '1px solid white', borderRadius: '10px', }}>
                                                    Planks - {inventory.planks.length.toFixed(2)}
                                                </MDTypography>
                                            </Grid>
                                            <Grid item xs={12} sm={6} >
                                                <MDTypography variant="h5" fontWeight="medium" color="white" align="center" style={{ border: '1px solid white', borderRadius: '10px', }}>
                                                    Usable CFT - {analyzedInventory.totalCFT.toFixed(2)}
                                                </MDTypography>
                                            </Grid>
                                            <Grid item xs={12} sm={6} >
                                                <MDTypography variant="h5" fontWeight="medium" color="white" align="center" style={{ border: '1px solid white', borderRadius: '10px', }}>
                                                    Rejected CFT - {analyzedInventory.rejectedCFT.toFixed(2)}
                                                </MDTypography>
                                            </Grid>
                                            <Grid item xs={12} sm={6} >
                                                <MDTypography variant="h5" fontWeight="medium" color="white" align="center" style={{ border: '1px solid white', borderRadius: '10px', }}>
                                                    Rejection % - {analyzedInventory.rejectionPercentage.toFixed(2)}
                                                </MDTypography>
                                            </Grid>
                                        </Grid>
                                    </MDBox>
                                </Grid>
                            }
                        </Grid>
                    </MDBox>
                </MDBox>
            </Card>
        </div >
    );
}

export default InventoryView;