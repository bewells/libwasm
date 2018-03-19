import chai from 'chai';
import { ImportBuilder } from '../src/core/builder';

const expect = chai.expect;

describe('Libwasm core', function() {
    it('builds an import context from the included libraries');
    it('builds an empty import context if no libraries are included');
    it('applies the given import adapter function to the included libraries');
    it('binds the ImportContext to the generated WebAssembly instance');
    it(
        'applies the given instance adapter function to the WebAssembly instance'
    );
    it('runs registered validators against the WebAssembly instance on bind');
});
