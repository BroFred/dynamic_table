var expect = chai.expect;
describe('sorting and html generator', function() {
	it('sort item collection should be a object', function() {
		expect(sorting_status).to.be.an('object');
	});
	it('sort_by should return an array', function() {
			var key = Object.keys(dataArr[0])[0];
			expect(sort_by(key,dataArr)).to.be.instanceof(Array);
	});
	it('sort_by(DES) should sort the sort array in des order', function() {
			var key = Object.keys(dataArr[0])[0].toString();
			var temp =dataArr.slice(0);
			temp=_.sortBy(temp,key);
			temp.reverse();
			expect(sort_by(key,dataArr,true)).to.deep.equal(temp);
	});
	it('sort_by(AES) should sort the sort array in aes order', function() {
			var key = Object.keys(dataArr[0])[0].toString();
			var temp =dataArr.slice(0);
			temp=_.sortBy(temp,key);
			expect(sort_by(key,dataArr,false)).to.deep.equal(temp);
	});
	it('construct_Elem should return string', function() {
			expect(construct_Elem(dataArr[0])).to.be.a('string');
	});
});
