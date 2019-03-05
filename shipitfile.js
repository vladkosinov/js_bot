module.exports = shipit => {
  // Load shipit-deploy tasks
  require("shipit-deploy")(shipit);

  shipit.initConfig({
    default: {
      deployTo: "/var/apps/super-project",
      repositoryUrl: "https://github.com/user/super-project.git"
    },
    staging: {
      servers: "deploy@staging.super-project.com"
    }
  });
};
