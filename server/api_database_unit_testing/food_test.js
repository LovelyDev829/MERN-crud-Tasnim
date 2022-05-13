/* eslint-disable no-undef */
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect

const baseUrl = "localhost:5000/"
chai.use(chaiHttp);

// sample test 
describe("Food Ordering API Unit Test", function(){
    var token;
    it('request a token', function(done) {
        chai.request(baseUrl)
        .post('/request-token')
        .end(function (err, res) {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property("token");
            token = res.body.token;
            done();
        });
    });
    var orderId;
    var orderBody = {
        "name":"Sandine (Milo)",
        "customer_email":"oyetoketoby80@gmail.com",
        "customer_name":"Oyetoke Toby",
        "quantity":5,
        "customer_address": "Aboru, Lagos"
    };

    it('create a new order', function(done) {
        chai.request(baseUrl)
        .post('/new_order')
        .set("authorization", "Basic "+token)
        .send(orderBody)
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("data");
            expect(res.body.message).to.equal("Order created successfully");
            expect(res.body.data.name).to.equal(orderBody.name);
            expect(res.body.data.quantity).to.equal(orderBody.quantity);
            orderId = res.body.data._id;
            done();
        });
    });
    it('get an order', function(done) {
        chai.request(baseUrl)
        .get('/orders/'+orderId)
        .set("authorization", "Basic "+token)
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("_id");
            expect(res.body._id).to.equal(orderId);
            expect(res.body.name).to.equal(orderBody.name);
            expect(res.body.quantity).to.equal(orderBody.quantity);
            done();
        });
    });
    it('get all orders', function(done) {
        chai.request(baseUrl)
        .get('/orders')
        .set("authorization", "Basic "+token)
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
            const order = res.body.find(o=>o._id==orderId)
            expect(order).to.be.an("object")
            expect(order).to.have.property("_id")
            done();
        });
    });
    var updateOrderBody = {
        "status": "cancelled"
    }
    it('update an order', function(done) {
        chai.request(baseUrl)
        .put('/orders/'+orderId)
        .set("authorization", "Basic "+token)
        .send(updateOrderBody)
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("data");
            expect(res.body.message).to.equal("Updated Succesfully");
            expect(res.body.data.status).to.equal(updateOrderBody.status);

            done();
        });
    });
    it('delete an order', function(done) {
        chai.request(baseUrl)
        .delete('/orders/'+orderId)
        .set("authorization", "Basic "+token)
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.equal("Deleted Succesfully");
            chai.request(baseUrl)
                .get('/orders/'+orderId)
                .set("authorization", "Basic "+token)
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property("message");
                    expect(res.body.message).to.equal("Order not found");
                    done();
                });
        });
    });
    it('filter orders', function(done) {
        const myToken = "0f8ae605-24b5-4ecf-b260-777a9ba490f5"
        chai.request(baseUrl)
        .get('/orders/filter?status=completed')
        .set("authorization", "Basic "+myToken)
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
            res.body.forEach((order)=>{
                expect(order.status).to.be.equal("completed")
            })

            done();
        });
    })
})