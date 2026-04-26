#!/usr/bin/env bun
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);
const DEFAULT_TARGET = "public";

type Options = {
  changedFilesOnly: boolean;
  dryRun: boolean;
  force: boolean;
  listWebpFiles: boolean;
  quality: number;
  targets: string[];
};

type ConversionResult = {
  inputPath: string;
  outputPath: string;
  skipped: boolean;
};

function parseArgs(args: string[]): Options {
  const options: Options = {
    changedFilesOnly: false,
    dryRun: false,
    force: false,
    listWebpFiles: false,
    quality: 82,
    targets: [],
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--changed-files") {
      options.changedFilesOnly = true;
      continue;
    }

    if (arg === "--webp-files") {
      options.listWebpFiles = true;
      continue;
    }

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "--force") {
      options.force = true;
      continue;
    }

    if (arg === "--quality" || arg === "-q") {
      const value = args[index + 1];

      if (!value) {
        throw new Error(`${arg} requires a value from 1 to 100.`);
      }

      const quality = Number(value);

      if (!Number.isInteger(quality) || quality < 1 || quality > 100) {
        throw new Error("Quality must be an integer from 1 to 100.");
      }

      options.quality = quality;
      index += 1;
      continue;
    }

    options.targets.push(arg);
  }

  if (options.targets.length === 0) {
    options.targets.push(DEFAULT_TARGET);
  }

  return options;
}

async function collectImagePaths(target: string): Promise<string[]> {
  const normalizedTarget = path.resolve(target);
  const targetStat = await stat(normalizedTarget);

  if (targetStat.isFile()) {
    return IMAGE_EXTENSIONS.has(path.extname(normalizedTarget).toLowerCase())
      ? [normalizedTarget]
      : [];
  }

  if (!targetStat.isDirectory()) {
    return [];
  }

  const entries = await readdir(normalizedTarget, { withFileTypes: true });
  const nestedEntries = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(normalizedTarget, entry.name);

      if (entry.isDirectory()) {
        return collectImagePaths(entryPath);
      }

      if (entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        return [entryPath];
      }

      return [];
    }),
  );

  return nestedEntries.flat();
}

async function shouldSkipConversion(inputPath: string, outputPath: string, force: boolean) {
  if (force) {
    return false;
  }

  try {
    const [inputStat, outputStat] = await Promise.all([stat(inputPath), stat(outputPath)]);
    return outputStat.mtimeMs >= inputStat.mtimeMs;
  } catch {
    return false;
  }
}

async function convertImage(inputPath: string, options: Options): Promise<ConversionResult> {
  const outputPath = inputPath.replace(/\.(png|jpe?g)$/i, ".webp");
  const skipped = await shouldSkipConversion(inputPath, outputPath, options.force);

  if (skipped || options.dryRun) {
    return { inputPath, outputPath, skipped };
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(inputPath).webp({ quality: options.quality }).toFile(outputPath);

  return { inputPath, outputPath, skipped: false };
}

function printUsage() {
  console.error(`Usage: bun run images:webp [options] [path...]

Converts PNG/JPG/JPEG files to WebP beside the source files.
Defaults to: ${DEFAULT_TARGET}

Options:
  --changed-files    Print created/updated WebP paths to stdout, one per line
  --webp-files       Print all matching output WebP paths to stdout, one per line
  --dry-run          Show what would be converted without writing files
  --force            Reconvert even when the WebP is newer than the source
  -q, --quality N    WebP quality from 1 to 100, default 82`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const imagePaths = (
    await Promise.all(options.targets.map((target) => collectImagePaths(target)))
  )
    .flat()
    .sort();
  const results = await Promise.all(imagePaths.map((imagePath) => convertImage(imagePath, options)));
  const changedResults = results.filter((result) => !result.skipped);

  if (options.changedFilesOnly) {
    for (const result of changedResults) {
      console.log(path.relative(process.cwd(), result.outputPath));
    }

    return;
  }

  if (options.listWebpFiles) {
    for (const result of results) {
      console.log(path.relative(process.cwd(), result.outputPath));
    }

    return;
  }

  for (const result of results) {
    const inputPath = path.relative(process.cwd(), result.inputPath);
    const outputPath = path.relative(process.cwd(), result.outputPath);

    if (result.skipped) {
      console.error(`Skipped ${outputPath}; already up to date for ${inputPath}.`);
    } else if (options.dryRun) {
      console.error(`Would convert ${inputPath} -> ${outputPath}.`);
    } else {
      console.error(`Converted ${inputPath} -> ${outputPath}.`);
    }
  }

  console.error(
    `${options.dryRun ? "Would convert" : "Converted"} ${changedResults.length} of ${results.length} image(s).`,
  );
}

main().catch((error) => {
  printUsage();
  console.error("");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
