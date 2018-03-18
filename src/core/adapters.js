export function nestImportsByNamespace(libs) {
    return libs.reduce(
        (libAgg, { namespace, imports }) => ({
            ...libAgg,
            [namespace]: imports
        }),
        {}
    );
}
