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

const form = {
  formId: "new-product-form",
  formField: {
    firstName: {
      name: "firstName",
      label: "Select Product",
      type: "text",
      errorMsg: "Product name is required.",
    },
    lastName: {
      name: "lastName",
      label: "Hall# / Line#",
      type: "text",
      errorMsg: "Hall# / Line# is required.",
    },
    department: {
      name: "department",
      label: "Buyer",
      type: "text",
      errorMsg: "Buyer is required.",
    },
    email: {
      name: "email",
      label: "Due Date",
      type: "date",
      errorMsg: "Due Date is required.",
      invalidMsg: "Your Due Date has to be in the future",
    },
    password: {
      name: "password",
      label: "Process",
      type: "text",
      errorMsg: "Password is required.",
      invalidMsg: "Your password should be more than 8 characters, with at least 1 upper case, and 1 number, and one special character.",
    },
    repeatPassword: {
      name: "repeatPassword",
      label: "Repeat Password",
      type: "password",
      errorMsg: "Password is required.",
      invalidMsg: "Your password doesn't match.",
    },
    address1: {
      name: "address1",
      label: "Order Quantity",
      type: "number",
      errorMsg: "Order Quantity is required.",
    },
    address2: {
      name: "address2",
      label: "Address 2",
      type: "array",
      errorMsg: "At least one User is required.",
    },
    city: {
      name: "city",
      label: "PO / OMS #",
      type: "text",
      errorMsg: "PO/OMS # is required.",
    },
    zip: {
      name: "zip",
      label: "Zip",
      type: "number",
      errorMsg: "Zip is required.",
      invalidMsg: "Zipcode is not valie (e.g. 70000).",
    },
    twitter: {
      name: "twitter",
      label: "Twitter Handle",
      type: "text",
      errorMsg: "Twitter profile is required.",
    },
    facebook: {
      name: "facebook",
      label: "Facebook Account",
      type: "text",
    },
    instagram: {
      name: "instagram",
      label: "Instagram Account",
      type: "text",
    },
    publicEmail: {
      name: "publicEmail",
      label: "Job Title",
      type: "text",
    },
    bio: {
      name: "bio",
      label: "Other Information",
    },
  },
};

export default form;
