import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";


export default [
    pluginJs.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: globals.browser
        },
        ignores: [
            "/webpackConfig/",
            "/node_modules/",
            "src/assets",
            "/dist/"
        ],
        rules: {
        
        }
    }
]