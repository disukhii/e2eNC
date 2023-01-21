
const url = 'https://www.sbzend.ssls.com'
const user = {
    name: 'Tom Ford',
    email: 'ssls.automation+666@gmail.com',
    password: '123456',
    phone: '+380 12312312',
    address: 'Diagon alley 21, Misto, Uryupinsk 612120, Ukraine',
    supportPin: 'wUzL',
    newsLetter: 'Include in mailing list'
}
const errorPopups = {
    incorrectEmailOrPassword: 'Uh oh! Email or password is incorrect',
    notEmail: 'Uh oh! Thisisn’t an email',
    notPassword: 'Uh oh! Thisisn’t a password'
}
function randomString(length, email = false) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (email) result += '@gmail.com'
    return result;
}

module.exports = { user, url, randomString, errorPopups }