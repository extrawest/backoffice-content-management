// get current env
export const isDevelopmentMode = () =>
	process.env["NX_NODE_ENV"] === "development";
