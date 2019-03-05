module.exports = shipit => {
  // Load shipit-deploy tasks
  require("shipit-deploy")(shipit);

  shipit.initConfig({
    default: {
      deployTo: "/var/apps/js_bot",
      repositoryUrl: "git@github.com:vlkosinov/js_bot.git"
    },
    production: {
      servers: "deleted@before.publish"
    }
  });

  shipit.blTask("start_server", function() {
    var cwd = shipit.releasePath;
    return shipit.remote("cd " + cwd + " && npm install && npm start");
  });

  shipit.on("cleaned", function() {
    console.log("Deployed !");
    shipit.start("start_server");
  });
};
