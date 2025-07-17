export const ownerSignin = async ({ name, password }) => {
    console.log('ownerLogin called');
   
    try {
        const response = await fetch('http://localhost:5000/owner/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password }),
        });

        const result = await response.json(); 
        if (!response.ok) {
            throw new Error(result.message || 'Unknown error');
        }

        return result.data;


    } catch (error) {
        throw new Error(error.message);
    }
};
