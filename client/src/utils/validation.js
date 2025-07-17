
export const  basicSupplierValidate= (values) => {

    console.log('supplierLoginValidate')

    const newErrors = {
        phone: values.phone === '' || !/^\d{10}$/.test(values.phone),
        password: values.password === '' || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(values.password)
    };

    return newErrors;
};


export const supplierRegisterValidate = (values) => {

    console.log('SupplierRegister')
    const newErrors = {
        ...basicSupplierValidate(values),
        companyName: values.companyName === '',
        address: values.address === '',
        email: values.email === '' || !/\S+@\S+\.\S+/.test(values.email)
    };

    return newErrors;
};


export const  validateOwnerLogin= (values) => {

    console.log('supplierLoginValidate')
    
    const newErrors = {
        phone: values.username === '' ,
        password: values.password === '' || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(values.password)
    };

    return newErrors;
};


export const validateProduct = (values) => {
  const newErrors = {
    productName: values.productName.trim() === '',
    price: values.price === '' || isNaN(values.price) || parseFloat(values.price) <= 0,
    minQuantity: values.minQuantity === '' || isNaN(values.minQuantity) || parseInt(values.minQuantity) < 0,
  };

  return newErrors;
};