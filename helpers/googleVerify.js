const { OAuth2Client } = require('google-auth-library');
const { GOOGLE_ID } = process.env
const client = new OAuth2Client(GOOGLE_ID);
console.log('GOOGLE_ID => ', GOOGLE_ID)
const googleVerify = async(token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log('payload => ', payload)
    const { name, email, picture } = payload
    return { name, email, picture }
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
}
module.exports = {
    googleVerify
}