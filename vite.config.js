import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
export default defineConfig({
    plugins: [sveltekit()],
    ssr: {
		noExternal: ['jointjs']
	},
    server: {
        fs: {
            // Allow serving files from one level up to the project root
            allow: [".."],
        },
        ssr: {
		noExternal: ['@fortawesome/free-solid-svg-icons']
	}
    },
});
//# sourceMappingURL=vite.config.js.map