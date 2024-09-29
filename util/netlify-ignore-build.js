process.exitCode =
  process.env?.BRANCH?.includes('staticman') ? 0 : -987;
