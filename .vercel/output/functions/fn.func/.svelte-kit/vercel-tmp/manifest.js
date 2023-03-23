export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","themes/prism.css","themes/prism.js"]),
	mimeTypes: {".png":"image/png",".css":"text/css",".js":"application/javascript"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.6efd842b.js","imports":["_app/immutable/entry/start.6efd842b.js","_app/immutable/chunks/index.0df259fa.js","_app/immutable/chunks/singletons.d25950f1.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.0649d9be.js","imports":["_app/immutable/entry/app.0649d9be.js","_app/immutable/chunks/index.0df259fa.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
