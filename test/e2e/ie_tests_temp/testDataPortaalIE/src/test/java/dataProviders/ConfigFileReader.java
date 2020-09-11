package dataProviders;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;


public class ConfigFileReader {

    private Properties properties;
    private final String propertyFilePath = "configs//Configuration.properties";


    public ConfigFileReader() {
        BufferedReader reader;
        try {
            reader = new BufferedReader(new FileReader(propertyFilePath));
            properties = new Properties();
            try {
                properties.load(reader);
                reader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            throw new RuntimeException("Configuration.properties not found at " + propertyFilePath);
        }
    }

    public String getHomepageUrl() {
        String url = properties.getProperty("homepageUrl");
        if(url != null) return url;
        else throw new RuntimeException("url not specified in the Configuration.properties file.");
    }

    public String getRemoteWebDriverUrl() {
        String remoteWebDriverUrl = properties.getProperty("remoteWebDriverUrl");
        if(remoteWebDriverUrl != null) return remoteWebDriverUrl;
        else throw new RuntimeException("remoteWebDriverUrl not specified in the Configuration.properties file.");
    }

    public String getBrowser() {
        String Browser = properties.getProperty("browser");
        if(Browser != null) return Browser;
        else throw new RuntimeException("Browser not specified in the Configuration.properties file.");
    }

    public String getHeadless() {
        String headless = properties.getProperty("headless");
        if(headless != null) return headless;
        else throw new RuntimeException("headless not specified in the Configuration.properties file.");
    }

}