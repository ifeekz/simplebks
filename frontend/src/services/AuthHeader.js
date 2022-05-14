import { Buffer } from 'buffer'
const AuthHeader = () => {
    let seller = JSON.parse(localStorage.getItem('seller'));
    if (seller && seller.seller_id && seller.seller_zip_code_prefix) {
        const token = 'Basic ' + Buffer.from(seller.seller_id + ':' + seller.seller_zip_code_prefix).toString('base64');
        return { Authorization: token };
        // return { 'x-access-token': seller.accessToken };
    } else {
        return {};
    }
}

export default AuthHeader()