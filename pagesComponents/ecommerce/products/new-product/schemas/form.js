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

const productForm = {
  formId: "new-product-form",
  formField: {
    productName: {
      name: "productName",
      label: "Product Name",
      type: "text",
      errorMsg: "Product name is required.",
      value: "Nike Air Force 1 '07",
    },
    productWeight: {
      name: "productWeight",
      label: "Product Weight",
      type: "text",
      errorMsg: "Product Weight is required.",
      value: "Nike Air Force 1 '07",
    },
    category: {
      name: "category",
      label: "Category",
      type: "text",
      errorMsg: "Category is required.",
      value: "Nike Air Force 1 '07",
    },
    size: {
      name: "size",
      label: "Size",
      type: "text",
      errorMsg: "Size is required.",
      value: "Nike Air Force 1 '07",
    },
    password: {
      name: "password",
      label: "Password",
      type: "password",
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
      label: "Address 1",
      type: "text",
      errorMsg: "Address is required.",
    },
    address2: {
      name: "address2",
      label: "Address 2",
      type: "text",
    },
    city: {
      name: "city",
      label: "City",
      type: "text",
      errorMsg: "City is required.",
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

export default productForm;
