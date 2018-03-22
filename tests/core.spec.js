import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { ImportBuilder } from '../src/core/builder';

const expect = chai.expect;
chai.use(sinonChai);

const makeLibStub = () =>
    sinon.stub().returns({
        namespace: 'test',
        imports: {
            testFunc: 'test-func'
        }
    });

describe('Libwasm core', function() {
    it('builds an import context from the included libraries', function() {
        const stubLib = makeLibStub();
        const { wrapper, imports } = new ImportBuilder()
            .include(stubLib)
            .build();

        expect(imports).to.deep.equal({
            test: {
                testFunc: 'test-func'
            }
        });
        expect(stubLib).to.have.been.calledWith(wrapper);
    });

    it('builds an empty import context if no libraries are included', function() {
        const { wrapper, imports } = new ImportBuilder().build();

        expect(imports).to.deep.equal({});
    });

    it('applies the given import adapter function to the included libraries', function() {
        const newImports = {};
        const importSpreadAdapter = libObjs => newImports;

        const stubLib = makeLibStub();
        const { wrapper, imports } = new ImportBuilder()
            .include(stubLib)
            .setImportAdapter(importSpreadAdapter)
            .build();

        expect(imports).to.equal(newImports);
    });

    it('binds the ImportContext to the generated WebAssembly instance', function() {
        const { wrapper, imports } = new ImportBuilder().build();

        const wasmInstance = {};

        wrapper.bind(wasmInstance);

        expect(wrapper.instance).to.equal(wasmInstance);
    });

    it('applies the given instance adapter function to the WebAssembly instance', function() {
        const wasmInstance = {};
        const newInstance = {};
        const instanceAdapter = wasmInstance => newInstance;

        const { wrapper, imports } = new ImportBuilder()
            .setInstanceAdapter(instanceAdapter)
            .build();

        wrapper.bind(wasmInstance);

        expect(wrapper.instance).to.equal(newInstance);
    });

    it('runs registered validators against the WebAssembly instance on bind', function() {
        const validator = sinon.stub();
        const wasmInstance = {};

        const { wrapper, imports } = new ImportBuilder().build();

        wrapper.registerInstanceValidator(validator);

        wrapper.bind(wasmInstance);

        expect(validator).to.have.been.calledWith(wasmInstance);
    });
});
