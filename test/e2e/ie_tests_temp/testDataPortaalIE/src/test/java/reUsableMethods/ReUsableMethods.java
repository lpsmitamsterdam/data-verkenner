package reUsableMethods;

import com.codeborne.selenide.Configuration;
import dataProviders.ConfigFileReader;

public class ReUsableMethods {

    public static void setLUp() {
        ConfigFileReader configFileReader = new ConfigFileReader();
        Configuration.remote = (configFileReader.getRemoteWebDriverUrl());
        Configuration.headless = Boolean.parseBoolean((configFileReader.getHeadless()));
        Configuration.browser = (configFileReader.getBrowser());
    }
}
