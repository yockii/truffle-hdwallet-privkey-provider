const Ganache = require('ganache-core');
const assert = require('assert');
const WalletProvider = require('../index.js');
const privKeys = ['a0daae9b0d665c98b70a971043e417552f2b89d6b8440711fc887549b00bdf58'];

describe("HD Wallet Provider", function(done) {
  var Web3 = require('web3');
  var web3 = new Web3();
  var port = 8545;
  var server;
  var provider;

  before(done => {
    server = Ganache.server();
    server.listen(port, done);
  });

  after(done => {
    provider.engine.stop();
    setTimeout(() => {
      try {
        server.close(done)
      } catch(e) {
        // for reason of Ganache not manage well for socket
        done();
      }
    }, 1000); // :/
      
  })

  it('provides', function(done){
    provider = new WalletProvider(privKeys, `http://localhost:${port}`);
    web3.setProvider(provider);

    web3.eth.getBlockNumber((err, number) => {
      assert(number === 0);
      done();
    });
  })
});

