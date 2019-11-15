var chai = require('chai')
    , expect = chai.expect
    , should = chai.should();

const  text = () => {
  describe('Object', function() {
    describe('#have.property', function() {
      it('should return property b', function() {
        expect({a: 1}).to.not.have.property('b');
      });
    });
  });
}

export default text