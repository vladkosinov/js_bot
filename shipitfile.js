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
    return shipit.remote(
      `cd ${cwd} && yarn && forever stop js_bot && forever start --minUptime 2000 --spinSleepTime 2000 --uid js_bot --append -e /var/apps/js_bot/log/error.log -o /var/apps/js_bot/log/out.log -l /var/apps/js_bot/log/forever.log ./bot.js`
    );
  });

  shipit.on("cleaned", function() {
    console.log("Deployed !");
    shipit.start("start_server");
  });
};
