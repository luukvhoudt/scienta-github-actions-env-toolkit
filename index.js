const core = require('@actions/core');
const github = require('@actions/github');

function getRefName(ref) {
    return ref ? ref.split('/').slice(2).join('/') : null;
}

try {
    const variables = {
        GITHUB_REF_NAME: {
            input: github.event.release.tag_name,
            transform: (ref) => getRefName(ref)
        },
        GITHUB_REF_NAME_SLUG: {
            input: github.event.release.tag_name,
            transform: (ref) => getRefName(ref)
                .toLowerCase()
                .replace(/[^a-z0-9 -.]/g, ' ') // remove invalid chars. Allow a dot
                .replace(/^\s+|\s+$/g, '') // trim
                .replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-') // collapse dashes
        },
        GITHUB_SHA_SHORT: {
            input: process.env.GITHUB_SHA,
            transform: (sha) => sha ? sha.substring(0, 8) : null
        }
    };

    for (const [variableName, item] of Object.entries(variables)) {
        core.debug(`Processing variable ${variableName}`)
        const input = item.input;
        core.debug(`Input: ${input}`);
        const value = item.transform(input);
        core.debug(`Transformed: ${value}`)

        if (value) {
            core.exportVariable(variableName, value);
            core.info(`Set ${variableName}=${value}`);
        } else {
            core.warning(`Could not set environment variable ${variableName}.`);
        }
    }
} catch (error) {
    core.setFailed(error);
}
