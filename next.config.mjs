import { createContentCollectionPlugin } from "@content-collections/next";

const withContentCollections = createContentCollectionPlugin({
  configPath: "content-collections.config.ts",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  serverExternalPackages: ["@content-collections/core", "esbuild"],
  images: {
    loader: "custom",
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  transpilePackages: ["next-image-export-optimizer"],
  env: {
    nextImageExportOptimizer_imageFolderPath: "public",
    nextImageExportOptimizer_exportFolderPath: "out",
    nextImageExportOptimizer_quality: "75",
    nextImageExportOptimizer_storePicturesInWEBP: "true",
    nextImageExportOptimizer_exportFolderName: "nextImageExportOptimizer",
    nextImageExportOptimizer_generateAndUseBlurImages: "true",
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
