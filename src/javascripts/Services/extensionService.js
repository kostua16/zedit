ngapp.service('extensionService', function(themeService) {
    const tabs = ['Installed Modules', 'Installed Themes'];
    let installedThemes, installedModules;

    this.getTabs = function() {
        return tabs.map(function(tab) {
            let tabVarName = tab.toCamelCase();
            return {
                label: tab,
                templateUrl: `partials/manageExtensions/${tabVarName}.html`,
                controller: `${tabVarName}Controller`
            };
        });
    };

    this.getInstalledThemes = function() {
        if (!installedThemes) {
            installedThemes = themeService.getInstalledThemes();
        }
        return installedThemes;
    };

    this.getInstalledModules = function() {
        if (!installedModules) {
            installedModules = moduleService.getInstalledModules();
        }
        return installedModules;
    };
});
