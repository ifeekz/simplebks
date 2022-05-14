const AuthHeader = () => {
    let seller = JSON.parse(localStorage.getItem('seller'));
    if (seller && seller.accessToken) {
        // return { Authorization: 'Bearer ' + seller.accessToken };
        return { 'x-access-token': seller.accessToken };
    } else {
        return {};
    }
}

export default AuthHeader()