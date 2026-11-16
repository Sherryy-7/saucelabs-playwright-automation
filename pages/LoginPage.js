class LoginPage{
    constructor(page) {
        this.page = page;
        this.baseURL =process.env.BASE_URL;
}
async open(){
    console.log('Base URL is: ${this.baseURL}');
    await this.page.goto(this.baseURL);
console.log('Landing Page Successfully opened');
}
}
module.exports = {LoginPage};