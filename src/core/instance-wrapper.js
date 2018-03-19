export class InstanceWrapper {
    constructor() {
        this.instance = null;
        this.instanceAdapter = null;
        this.instanceValidators = [];
    }

    bind(wasmInstance) {
        const instance = this.instanceAdapter
            ? this.instanceAdapter(wasmInstance)
            : wasmInstance;

        instanceValidators.forEach(validate => validate(instance));

        this.instance = instance;

        return instance;
    }

    setInstanceAdapter(adapter) {
        if (typeof lib !== 'function') {
            throw new TypeError('Invalid instance adapter');
        }
        this.instanceAdapter = adapter;
    }

    registerInstanceValidator(validator) {
        if (typeof lib !== 'function') {
            throw new TypeError('Invalid instance validator');
        }
        this.instanceValidators.push(validator);
    }
}
