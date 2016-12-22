module.exports = {
  // Control the interface on which the local server listens (defaults to 'localhost')
  // (default: 'localhost')
  // bind: '0.0.0.0',

  // Control the port used for the local server
  // (default: 4567)
  // port: 7777,

  // List javascript source files. These can be files or raw URLs.
  // (default: [])
  sourceFiles: [
    'example/web/dist/happo.bundle.js',
  ],

  // List css source files. These can also be files or raw URLs.
  // (default: [])
  stylesheets: [
    // 'application.css',
  ],

  // List directories where public files are accessible (useful for e.g. font files)
  // (default: [])
  publicDirectories: [
    'example',
  ],

  // Specify the folder where snapshots are saved
  // (default: 'snapshots')
  // snapshotsFolder: 'happo-snapshots',

  // Configure the window size when taking snapshots
  // (defaults shown below)
  viewports: {
    small: {
      width: 375,
      height: 667,
    },
  },
};
