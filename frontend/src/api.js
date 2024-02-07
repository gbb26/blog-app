import axios from "axios";

export default async function userProfile() {

    const apiUrl = 'https://noteme-the-blog-app-backend.onrender.com/api/auth/profile';

    const bearerToken = localStorage.getItem("jwtToken");
    // Make a POST request with JSON data
    axios.get(apiUrl, {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
        },
    })
        .then(response => {
            // Handle the successful response here
            // console.log(response.data.user.userID);
            const id = response.data.user.userID;
            localStorage.setItem("userID", id)
        })
        .catch(error => {
            // Handle errors here
            console.error('Error in profile:', error);
        });

}


// helper function to convert date into human readable format

export function formatDate(inputDate) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dateObj = new Date(inputDate);
    const month = months[dateObj.getUTCMonth()];
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    let daySuffix = '';
    if (day === 1 || day === 21 || day === 31) {
        daySuffix = 'st';
    } else if (day === 2 || day === 22) {
        daySuffix = 'nd';
    } else if (day === 3 || day === 23) {
        daySuffix = 'rd';
    } else {
        daySuffix = 'th';
    }

    return `${month} ${day}${daySuffix} ${year}`;
}