const chai = require('chai');
const expect = chai.expect;
const script = require('../solution/public/js/app.js');
const fetchMock = require('fetch-mock');
const { JSDOM } = require("jsdom");

describe("Get Fruits", () => {

  const fruitsTestData = [
    {
      "id": 1,
      "name": "Apple",
      "price": "1.1",
      "image": "images/apple.jpg",
      "unit": "lb"
    },
    {
      "id": 2,
      "name": "Banana",
      "price": "0.6",
      "image": "images/banana.jpg",
      "unit": "lb"
    }];

  before(() => {
    return JSDOM.fromFile('./solution/index.html')
      .then((dom) => {
        global.window = dom.window;
        global.document = window.document;
      });
  });

  afterEach(() => fetchMock.restore());
  // Declare the URL we want to make the request to
  const url = 'http://localhost:3000/fruits/';

  it("getFruits shall hit correct api", function (done) {
    fetchMock.get(url, fruitsTestData);
    script.getFruits()
      .then(res => {
        const lastCallArgs = fetchMock.lastCall();
        expect(lastCallArgs[0]).to.equal('http://localhost:3000/fruits/');
        done();
      })
  })

  it('there shall be only one server call in getFruits()', (done) => {
    fetchMock.get(url, fruitsTestData);
    script.getFruits()
      .then(() => {
        expect(fetchMock.done()).to.equal(true);
        done();
      })
    });
  
    it('data fetched from getFruits() to be populated in DOM ', (done) => {
      fetchMock.get(url, fruitsTestData);
      script.getFruits()
        .then(() => {
          expect(document.body.innerHTML).to.include('Apple');
          expect(document.body.innerHTML).to.include('Banana');
          done();
        })
      });
})

