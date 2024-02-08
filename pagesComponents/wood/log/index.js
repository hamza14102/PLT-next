import { Button, ButtonGroup, Card, CircularProgress, FormControl, FormControlLabel, Icon, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import Grid from "@mui/material/Grid";
import { use, useState } from "react";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";


import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect } from "react";
import { postToInspectionLogs, getFromGateEntriesByPONumber } from "apiHelpers/wood";
import { v4 as uuidv4 } from 'uuid';
import MDDatePicker from "/components/MDDatePicker";
import { Switch } from "@mui/material";
import { useAuth } from "hooks/use-auth";
import MDSnackbar from "/components/MDSnackbar";
import { LowPriority } from "@mui/icons-material";



function WoodEntryForm({ product_id }) {
    const [submitting, setSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [orderNo, setOrderNo] = useState(0);
    const [PONumber, setPONumber] = useState(0);

    const [billNoOptions, setBillNoOptions] = useState([]);

    // for loop from 1 to 100
    const list = [];
    for (let i = 1; i <= 96; i++) {
        list.push(i);
    }

    const [lengthoptions, setLengthOptions] = useState(list);


    // console.log(lengthoptions);
    const [selectedValue, setSelectedValue] = useState(options[0]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const [height, setHeight] = useState(1);
    const [width, setWidth] = useState(1);
    const [length, setLength] = useState(0);

    const handleHeightChange = (event) => {
        // console.log(event);
        setHeight(event.target.value);
    }
    const handleWidthChange = (event) => {
        // cast to number

        setWidth(Number(event));
    }
    const handleLengthChange = (event) => {
        setLength(event);
        if (length === 0) {
            return;
        }
        setPlanks([...planks, { 'H': height, 'W': width, 'L': length }]);
    }

    const handleRejectReasonChange = (index, value) => {
        setPlanks(planks.map((plank, i) => i === index ? { ...plank, rejectionReason: value } : plank));
    };

    const handleSubmit = async () => {
        console.log(orderNo);
        console.log(planks);
        setSubmitting(true);
        // wait for 1 sec
        const report = {
            'PONumber': PONumber,
            'jobNo': uuidv4(),
            'billNumber': orderNo,
            'planks': planks,
            'createdAt': new Date().toISOString(),
        }

        // post to api
        const response = await postToInspectionLogs(report);
        setSubmitting(false);
        setPlanks([]);
    }

    const [planks, setPlanks] = useState([]);

    // useEffect(() => {
    //     // console.log([height, width, length]);
    //     // append {height, width, length} to planks

    // }, [length]);



    const searchForPo = async () => {
        const response = await getFromGateEntriesByPONumber(PONumber);
        console.log(response);

        if (response.length === 0) {
            setOpen(true);
            return;
        }
        // extract bill numbers from response
        const billNos = response.map((item) => item.billNumber);
        setBillNoOptions(billNos);
        console.log(billNos);
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
            {/* {modalContent} */}
            <Grid container spacing={1} justify="center">
                <Grid item lg={8} sm={12}>
                    <Card>
                        <MDBox >
                            <MDBox mt={2}
                                width="100%"
                                display="flex"
                                justifyContent="space-between"
                            >
                                <Grid container spacing={2} justify="center" style={{ margin: '1rem' }}>
                                    <Grid container spacing={2} justify="center" style={{ margin: '1rem' }}>
                                        <Grid item xs={4}>
                                            <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
                                                PO नंबर
                                            </MDTypography>
                                            <MDInput
                                                fullWidth
                                                onChange={(e) => setPONumber(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            {/* search button */}
                                            <MDButton
                                                color="primary"
                                                variant="gradient"
                                                // justifyContent="center"
                                                onClick={() => {
                                                    console.log('search clicked');
                                                    searchForPo();
                                                }}
                                                disabled={submitting}
                                                style={{ marginTop: '2.25rem' }}
                                            >
                                                <Icon
                                                >
                                                    Search
                                                </Icon>
                                            </MDButton>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
                                                बिल नंबर
                                            </MDTypography>
                                            {/* <MDInput
                                                fullWidth
                                                // label="लकड़ी - प्रवेश सूचना"
                                                // name="लकड़ी - प्रवेश सूचना"
                                                onChange={(e) => setOrderNo(e.target.value)}
                                            /> */}
                                            <Autocomplete
                                                fullWidth
                                                id="combo-box-demo"
                                                options={billNoOptions}
                                                onChange={(event, newValue) => {
                                                    setOrderNo(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Grid>
                                        {/* make a list of checkboxes with only one selection at a time */}
                                        <Grid item xs={2}>
                                            <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
                                                ऊंचाई
                                            </MDTypography>
                                            <FormControl fullWidth >
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={height}
                                                    onChange={handleHeightChange}
                                                    style={{ height: '40px' }}
                                                >
                                                    <MenuItem value={1}>1&quot;</MenuItem>
                                                    <MenuItem value={1.5}>1.5&quot;</MenuItem>
                                                    <MenuItem value={2}>2&quot;</MenuItem>
                                                    <MenuItem value={2.5}>2.5&quot;</MenuItem>
                                                    <MenuItem value={3}>3&quot;</MenuItem>
                                                </Select>
                                            </FormControl>

                                        </Grid>


                                        <Grid item xs={2}>
                                            <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
                                                चौड़ाई
                                            </MDTypography>
                                            <Grid container spacing={1}>
                                                {options.map((option, index) => (
                                                    <Grid item key={index}>
                                                        <Button
                                                            key={index}
                                                            variant={width === option ? 'contained' : 'outlined'}
                                                            onClick={() => handleWidthChange(option)}
                                                        >
                                                            {option}
                                                        </Button>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={8}>
                                            <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
                                                लंबाई
                                            </MDTypography>
                                            <Grid container spacing={1}>
                                                {lengthoptions.map((option, index) => (
                                                    <Grid item key={index}>
                                                        <Button
                                                            key={index}
                                                            variant={length === option ? 'contained' : 'outlined'}
                                                            onClick={() => handleLengthChange(option)}
                                                        >
                                                            {option}
                                                        </Button>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>

                                    </Grid>


                                </Grid>
                            </MDBox>
                        </MDBox>
                    </Card>
                </Grid>
                <Grid item lg={4} sm={12}>
                    <Card>
                        <MDBox
                            // variant="gradient"
                            // bgColor="dark"
                            borderRadius="lg"
                            // coloredShadow="dark"
                            mx={2}
                            mt={3}
                            p={3}
                            mb={1}
                            textAlign="center"
                        >
                            <Grid>
                                <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
                                    अब तक
                                </MDTypography>
                                <MDTypography>
                                    गिनती: {planks.length}
                                </MDTypography>
                                <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                                    {/* view planks as a material ui table */}
                                    {planks.map((plank, index) => (
                                        <div key={index}>
                                            {`H: ${plank.H} W: ${plank.W} L: ${plank.L}`}
                                            {/* horizontal spacing */}
                                            &nbsp;&nbsp;&nbsp;
                                            <Select
                                                value={plank.rejectionReason || ''}
                                                onChange={(event) => handleRejectReasonChange(index, event.target.value)}
                                                style={{ fontSize: '1rem', border: '1px solid red' }}  // Inline style for the Select component
                                            >
                                                <MenuItem value="size" style={{ fontSize: '1.5rem' }}>नाप</MenuItem>
                                                <MenuItem value="knots" style={{ fontSize: '1.5rem' }}>गाँठ</MenuItem>
                                                <MenuItem value="cracks" style={{ fontSize: '1.5rem' }}>दरारें</MenuItem>
                                                <MenuItem value="bugs" style={{ fontSize: '1.5rem' }}>कीड़े</MenuItem>
                                            </Select>
                                        </div>
                                    ))}
                                </MDTypography>
                                {/* reset button here to reset plank to [] */}
                                <Grid container spacing={1} justifyContent={'center'} mt={1}>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setPlanks([])}
                                        >
                                            Reset
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        {
                                            submitting ?
                                                <CircularProgress />
                                                :
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleSubmit}
                                                >
                                                    Submit
                                                </Button>
                                        }
                                    </Grid>
                                </Grid>

                            </Grid>
                        </MDBox>
                    </Card>
                </Grid>
            </Grid>
        </div >
    );
}

export default WoodEntryForm;