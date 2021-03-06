const path = require('path');
const expect = require('chai').expect;
const findAssets = require('../src/config/findAssets');
const mockFs = require('mock-fs');
const dependencies = require('./fixtures/dependencies');

describe('findAssets', () => {

  before(() => {
    mockFs({ testDir: dependencies.withAssets });
  });

  it('should return an array of all files in given folders', () => {
    const assets = findAssets('testDir', ['fonts', 'images']);

    expect(assets).to.be.an('array');
    expect(assets.length).to.equal(3);
  });

  it('should prepend assets paths with the folder path', () => {
    const assets = findAssets('testDir', ['fonts', 'images']);

    assets.forEach(assetPath => expect(assetPath).to.contain('testDir'));
  });

  it('should return an empty array if given assets are null', () => {
    expect(findAssets('testDir', null)).to.be.empty;
  });

  after(() => {
    mockFs.restore();
  });
});
