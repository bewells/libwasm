import { InstanceWrapper } from './instance-wrapper';
import { nestImportsByNamespace } from './adapters';

export class ImportBuilder {
    constructor() {
        this.includedLibs = [];
        this.importAdapter = null;
        this.instanceAdapter = null;
    }

    build() {
        const wrapper = new InstanceWrapper();

        const libObjs = this.includedLibs.map(lib => lib(wrapper));

        const imports = this.importAdapter
            ? this.importAdapter(libObjs)
            : nestImportsByNamespace(libObjs);

        if (this.instanceAdapter) {
            wrapper.setInstanceAdapter(this.instanceAdapter);
        }

        return {
            wrapper,
            imports
        };
    }

    include(lib) {
        if (typeof lib !== 'function') {
            throw new TypeError('Included libraries must be functions');
        }

        this.includedLibs.push(lib);

        return this;
    }

    setImportAdapter(adapter) {
        if (typeof adapter !== 'function') {
            throw new TypeError('Invalid import adapter');
        }
        this.importAdapter = adapter;

        return this;
    }

    setInstanceAdapter(adapter) {
        if (typeof adapter !== 'function') {
            throw new TypeError('Invalid instance adapter');
        }
        this.instanceAdapter = adapter;

        return this;
    }
}
