const core = require('@actions/core');
const github = require('@actions/github');

function getRefName() {
	const ref = process.env.GITHUB_REF ?? github.event.release.tag_name ?? null;
	if (typeof ref !== 'string') {
		throw new Error('Branch/tag REF is missing');
	}

	return ref.split('/')
		.slice(2)
		.join('/') ?? null;
}

function getRefNameSlug() {
	return getRefName()
		.toLowerCase()
		.replace(/[^a-z0-9 -.]/g, ' ') // remove invalid chars. Allow a dot
		.replace(/^\s+|\s+$/g, '') // trim
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes
}

function getShaShort() {
	const sha = github.context.sha;
	if (typeof sha !== 'string') {
		throw new Error('Commit SHA is missing');
	}

	return sha.substring(0, 8) ?? null;
}

function setVarName(name, value) {
	core.exportVariable(name, value);
	core.info(`Set ${name}=${value}`);
}

try {
	setVarName('GITHUB_REF_NAME', getRefName());
	setVarName('GITHUB_REF_NAME_SLUG', getRefNameSlug());
	setVarName('GITHUB_SHA_SHORT', getShaShort);
} catch (error) {
	core.setFailed(error);
}
