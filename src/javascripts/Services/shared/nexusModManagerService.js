ngapp.service('nexusModManagerService', function($rootScope, fileSearchService, profileService) {
    let service = this;

    this.getModManagerPath = function() {
        return fileSearchService.findFile(/^NexusClient\.exe$/, {
            initialQueue: [
                process.env.USERPROFILE,
                `${process.env.USERPROFILE}\\My Documents`,
                `${process.env.USERPROFILE}\\Desktop`
            ].map(path => ({ path, priority: 1 })),
            prioritize: [/nexus/i, /^nmm$/i, /mod/i, /manager/i,
                /tool/i, /gam(e|ing)/i, /program/i]
        });
    };

    this.getModsPath = function(managerPath) {
        if (!managerPath) return '';
        let game = profileService.getGame($rootScope.profile.gameMode),
            gameName = game.shortName,
            modsPath = `${managerPath}\\${gameName}\\Mods\\VirtualInstall`;
        return fh.jetpack.exists(modsPath) ? modsPath : '';
    };

    this.detect = function(settings) {
        settings.managerPath = service.getModManagerPath();
        settings.modsPath = service.getModsPath(settings.managerPath);
        return settings.managerPath !== '';
    };
});
