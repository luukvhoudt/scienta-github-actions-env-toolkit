const core = require('@actions/core');

function getRefName(ref) {
    return ref ? ref.split('/').slice(2).join('/') : null;
}

try {
    const variables = {
        GITHUB_REF_NAME: {
            input: (env) => env.GITHUB_REF,
            transform: (ref) => getRefName(ref)
        },
        GITHUB_REF_NAME_SLUG: {
            input: (env) => env.GITHUB_REF,
            transform: (ref) => getRefName(ref)
                .toLowerCase()
                .replace(/[^a-z0-9 -.]/g, ' ') // remove invalid chars. Allow a dot
                .replace(/^\s+|\s+$/g, '') // trim
                .replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-') // collapse dashes
        },
        GITHUB_SHA_SHORT: {
            input: (env) => env.GITHUB_SHA,
            transform: (sha) => sha ? sha.substring(0, 8) : null
        }
    };

    for (const [variableName, item] of Object.entries(variables)) {
        const value = item.transform(
            item.input(process.env)
        );

        if (value) {
            core.exportVariable(variableName, value);
            core.info(`Set ${variableName}=${value}`);
        } else {
            core.warning(`Could not set environment variable ${variableName}.`);
        }
    }
} catch (error) {
    core.setFailed(error.message);
}
