export const getSupplierOrders = async () => {
    const token = localStorage.getItem('jwtToken');
    console.log('getSupplierOrder called');

    try {
        const response = await fetch('http://localhost:5000/orders/mine', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const result = await response.json();

        if (!response.ok) {
            console.error(result.message);
            throw new Error(result.message);
        }

        console.log(result);
        console.log('orders supplier', result)
        return result.data;

    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const getAllOrders = async () => {
    const token = localStorage.getItem('jwtToken');
    console.log('getAllOrders called');
    try {
        const response = await fetch('http://localhost:5000/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Failed to fetch orders');
        }

        console.log(result);
        return result.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};


export const addOrder = async ({
    products,
    totalPrice,
    supplierId,
    companyName


} = {}) => {
    const token = localStorage.getItem('jwtToken');
    console.log('addOrder called');
    
    try {
        const response = await fetch('http://localhost:5000/orders', {
            method: 'POST',
            body: JSON.stringify({
                products,
                totalPrice,
                supplierId,
                companyName
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to add order');
        }

        return result.data;
    } catch (error) {
        console.error('Error adding order:', error);
        throw error;
    }
};


export const updateOrderBySupplier = async ( id) => {
    const token = localStorage.getItem('jwtToken');
    console.log('updateOrderBySupplier called');
  
    try {
        const response = await fetch(`http://localhost:5000/orders/confirm/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update order');
        }

        console.log(result);
        return result.data;
    } catch (error) {
        console.error('Error in updating order:', error);
        throw error;
    }
}

export const updateOrderByOwner = async ( id) => {
    const token = localStorage.getItem('jwtToken');
    console.log('updateOrderByOwner called');
    

    try {
        const response = await fetch(`http://localhost:5000/orders/complete/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update order');
        }

        console.log(result);
        return result.data;
    } catch (error) {
        console.error('Error in updating order:', error);
        throw error;
    }
}


