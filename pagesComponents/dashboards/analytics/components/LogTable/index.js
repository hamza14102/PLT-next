import Grid from "@mui/material/Grid";
import MDBox from "/components/MDBox";
import DataTable from "/examples/Tables/DataTable";
import { getProductionLogsByProductID } from "apiHelpers/productionLogs";
import { CircularProgress } from "@mui/material";

import { useEffect, useState } from "react";

function LogTable({ product_id }) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        console.log("product_id: ", product_id);
        getProductionLogsByProductID(product_id).then((data) => {
            console.log("data: ", data);
            setLogs(data);
            setLogs(data.map((log) => {
                return {
                    product_id: log.product_id,
                    shift: log.shift,
                    date: log.date,
                    planned: log.planned,
                    quantity: log.quantity,
                    rejected: log.rejected,
                    efficiency: (log.quantity / log.planned * 100).toFixed(1) + "%",
                    logged_by: log.logged_by,
                    reason: log.reason,
                    manpower: log.manpower,
                };
            }));

            setLoading(false);
        }
        );
    }, [product_id]);


    return (
        <div
            // centered and scrollable
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                overflow: "scroll",
                height: "auto",
                width: "80%",
                boxShadow: 24,
                p: 4,
            }}
        >

            {/* {modalContent} */}
            <Grid item xs={12} md={6} lg={4}>
                <MDBox mt={3}>
                    {
                        loading ?
                            <CircularProgress
                                sx={{
                                    // display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // margin to left
                                    marginLeft: "50%",
                                    // height: "100%",
                                }}
                                size={120}
                            />
                            :
                            <DataTable
                                table={{
                                    columns: [
                                        { Header: "Product Name", accessor: "product_id" },
                                        { Header: "Shift", accessor: "shift", width: "8%" },
                                        { Header: "Date", accessor: "date", width: "8%" },
                                        { Header: "Manpower", accessor: "manpower", width: "8%" },
                                        { Header: "Planned Quantity", accessor: "planned", width: "8%" },
                                        { Header: "Quantity Achieved", accessor: "quantity", width: "8%" },
                                        { Header: "Rejected Quantity", accessor: "rejected", width: "8%" },
                                        { Header: "Plan Efficiency", accessor: "efficiency", width: "8%" },
                                        { Header: "Logged By", accessor: "logged_by" },
                                        { Header: "Failure Reason", accessor: "reason" },
                                    ],
                                    rows: logs,
                                }}
                                canSearch
                                showTotalEntries
                                pagination={{ color: "light" }}
                            />
                    }
                </MDBox>
            </Grid>
        </div>
    );
}

export default LogTable;