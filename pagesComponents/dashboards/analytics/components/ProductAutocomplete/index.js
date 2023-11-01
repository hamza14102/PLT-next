import React from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { getAllProducts } from '/apiHelpers/products';

function ProductAutocomplete({ setSelectedProduct }) {
    const [products, setProducts] = React.useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getAllProducts();
            setProducts(data);
            // const users = await getUsers();
            // setListOfUsers(users.map((user) => user.name));
        }
        fetchData();
    }, []);



    return (
        <Autocomplete
            // fullWidth={true}
            onChange={(event, newValue) => {
                console.log(newValue);
                // setProductName(newValue.name);
                setSelectedProduct(newValue ? newValue.name : '');
                // setLog((log) => ({ ...log, product_id: newValue?._id }));
            }}
            defaultValue={{ 'name': 'Select Product', '_id': 'Name or OMS' }}
            disablePortal
            sx={{ width: "250%" }}
            id="combo-box-demo"
            options={products}
            getOptionLabel={(option) => `${option.name} (${option._id})`}
            renderOption={(props, option) => (
                <li {...props} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" fontWeight="light" color="white" style={{ marginRight: 'auto' }}>
                        {option.name}
                    </Typography>
                    <Typography variant="caption" fontWeight="light" color="white">
                        {option._id}
                    </Typography>
                </li>
            )}
            renderInput={(params) => <TextField {...params} label="Product Name" />}
        />
    );
}

export default ProductAutocomplete;