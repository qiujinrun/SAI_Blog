import js from "@eslint/js"
import globals from "globals"
import tseslint from "@typescript-eslint/eslint-plugin"
import parser from "@typescript-eslint/parser"
import pluginVue from "eslint-plugin-vue"
import vueEslintParser from "vue-eslint-parser"
import { defineConfig } from "eslint/config"
// import prettierRecommended from 'eslint-plugin-prettier/recommended'
import prettierPlugin from "eslint-plugin-prettier"

// 导出一个数组
export default defineConfig([
  //拆分写法，将vue,js,ts文件拆开来设置
  {
    files: ["**/*.{js,ts,vue}"],
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaFeatures: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
      semi: ["error"]
    }
  },
  {
    files: ["**/*.vue"],
    plugins: {
      vue: pluginVue,
      prettier: prettierPlugin
    },
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: parser,
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      ...pluginVue.configs["flat/essential"].rules,
      "no-console": "off",
      "vue/max-attributes-per-line": "off",
      semi: ["error"]
      //  "prettier/prettier": "warn", // 启用 prettier 作为 ESLint 规则
    }
  }
  // prettierRecommended //覆盖掉eslint的规范
])
