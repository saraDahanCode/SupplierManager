
export const register = async ({ companyName, email, password, phone, address, contactPerson } = {}) => {
    console.log('register called');
    
    try {
        const response = await fetch('http://localhost:5000/suppliers/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ companyName, email, password, contactPerson, address, phone })
        });

        const result = await response.json();

        if (!response.ok) {
            console.error(result.message);
            throw new Error(result.message);
        }

        console.log('Supplier created:', result);
        return result.data; 

    } catch (error) {
        console.error('Error in signUp:', error);
        throw error;
    }
};

export const supplierSignin = async ({ phone, password }) => {
    console.log('login called');
    try {
        const response = await fetch('http://localhost:5000/suppliers/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const result = await response.json();
        console.log('jwtToken',result.data.accessToken)
        localStorage.setItem('jwtToken',result.data.accessToken);
        return result.data;  

    } catch (error) {
        throw new Error(error.message);
    }
};
export const fetchSuppliers = async () => {
    const token = localStorage.getItem('jwtToken');
    console.log('getAllUsers called');

    try {
        const response = await fetch('http://localhost:5000/suppliers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const result = await response.json();
        console.log(result);
        return result.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
