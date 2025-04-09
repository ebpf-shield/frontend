// @ts-check
import { defineConfig, Framework } from "agrippa";

export default defineConfig({
  options: {
    baseDir: "./src/components",
    framework: Framework.REACT,
    typescript: true,
    createStylesFile: false,
    componentOptions: {
      declaration: "const",
      exportType: "named",
    },
    typescriptOptions: {
      propDeclaration: "interface",
    },
    styleFileOptions: {
      module: true,
    },
  },
});
