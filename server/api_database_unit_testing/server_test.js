const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect

const baseUrl = "localhost:5000/"
// to run npx mocha server_test.js --timeout 100000

chai.use(chaiHttp);
describe("Server Test", function(){
it('server is live', function(done) {
        chai.request(baseUrl)
        .get('')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.text).to.equal(JSON.stringify("Welcome to our Catering Server!"));
            done();
        });
    })
})