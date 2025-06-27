import js from "@eslint/js";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import pluginVue from "eslint-plugin-vue";
import vueEslintParser from "vue-eslint-parser";
import { defineConfig } from "eslint/config";

// 导出一个数组
export default defineConfig([
  //拆分写法，将vue,js,ts文件拆开来设置
  {
    files: ["**/*.{js,ts,vue}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["**/*.ts"],
    languageOptions:{
      parser,
      parserOptions:{
        ecmaFeatures:"latest",
        sourceType:"module"
      }
    },
    plugins: { '@typescript-eslint': tseslint },
    rules: {
      ...tseslint.configs.recommended.rules,
       "@typescript-eslint/no-explicit-any": "warn"
    }
  },
  {
    files: ["**/*.vue"],
    plugins: { vue: pluginVue },
    languageOptions:{
      parser: vueEslintParser,
      parserOptions:{
        parser:parser,
        ecmaFeatures:{
          jsx:true
        }
      }
    },
    rules: {
      ...pluginVue.configs["flat/essential"].rules,
      "no-console": "off", 
      "vue/max-attributes-per-line": "off",
      

    }
  },
]);


