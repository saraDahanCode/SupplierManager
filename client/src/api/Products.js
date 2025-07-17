
export const getProducts = async () => {
    const token = localStorage.getItem('jwtToken');
    console.log('getAllProducts called');

    try {
        const response = await fetch('http://localhost:5000/products/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'שגיאה בקבלת המוצרים');
        }

        return result.data;

    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw error; // תמשיך לזרוק את השגיאה למעלה אם רוצים לטפל בה במקום אחר
    }
};





export const addProduct = async ({
    productName,
    minQuantity,
    price
} = {}) => {
    const token = localStorage.getItem('jwtToken');
    console.log('AddProduct called');
    console.log('addProduct',productName,minQuantity,price)
    try {
        const response = await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                productName,
                minQuantity,
                price
            })
        });

          const result = await response.json();
          console.log(result)
        if (!response.ok) {
          
            throw new Error(result.message );
        }

      
        return result.data;
    } catch (error) {
        throw new Error(error.message);
    }
};