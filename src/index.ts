#!/usr/bin/env node
import * as core from "@actions/core";
import * as fs from "fs";
try {
  const package_path = core.getInput("path");
  const ref = process.env.GITHUB_REF;
  if (!ref) throw "Error: 'refs/tags' not found";

  const fileName = package_path || "package.json";
  const packageValues = JSON.parse(fs.readFileSync(fileName).toString());
  const v = ref.match(/^refs\/tags\/(.*?)-(.*?)$/);
  if (!v || v.length < 3) throw "Error: 'refs/tags' format error";
  const version = v[2];
  console.log("path: %s", package_path);
  console.log("version: %s", version);
  fs.writeFileSync(
    fileName,
    JSON.stringify({ ...packageValues, version }, undefined, "  ")
  );
} catch (e) {
  console.error(e);
  process.exit(-1);
}
