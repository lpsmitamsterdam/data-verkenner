package stepDefinitions;

import com.browserstack.BrowserStackTest;
import dataProviders.ConfigFileReader;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;

import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.*;

public class homePage {

    @Given("I open the homepage")
    public void openHomePage() throws Exception {
        BrowserStackTest browserStackTest = new BrowserStackTest();
        browserStackTest.setUp("local.conf.json", "ie");
        ConfigFileReader configFileReader = new ConfigFileReader();
        open(configFileReader.getHomepageUrl());
    }

    @And("I check if all the elements on the homepage are visible")
    public void checkHomepage() {
        $("[data-test=header]").shouldBe(visible);
        $("[data-test=search-form]").shouldBe(visible);
        $("[data-test=search-input]").shouldBe(visible);

        $("[data-test=highlight-block]").shouldBe(visible);

        $("[data-test=navigation-block] > [href=\"/data/?modus=kaart&legenda=true&lagen=\"]").shouldBe(visible);
        $("[data-test=navigation-block] > [href*=\"/data/panorama/\"]").shouldBe(visible);
        $("[data-test=navigation-block] > [href*=\"/publicaties/zoek\"]").shouldBe(visible);
        $("[data-test=navigation-block] > [href*=\"/datasets/zoek/\"]").shouldBe(visible);
        $("[data-test=navigation-block] > [href*=\"/artikelen/artikel/tabellen/\"]").shouldBe(visible);
        $("[data-test=navigation-block] > [href*=\"/artikelen/artikel/services/\"]").shouldBe(visible);

        $$("[data-test=special-block]").filterBy(text("Dossiers")).get(0).shouldBe(visible);
        $$("[data-test=special-block]").filterBy(text("Meer data")).get(0).shouldBe(visible);

        $("[data-test=organization-block]").shouldBe(visible);
        $("[data-test=about-block]").shouldBe(visible);
    }

    @Given("I check the headertext {string}")
    public void checkHeaderText(String text) {
        $(byText(text)).shouldBe(visible);
    }

    @When("I search for address {string}")
    public void searchFor(String adress) {
        $("#auto-suggest__input").setValue(adress).pressEnter();
        $(By.xpath("//a[text()='" + adress + "']")).click();
    }

    @When("I search for {string}")
    public void iSearchFor(String searchItem) {
        $("#auto-suggest__input").setValue(searchItem).pressEnter();
    }

    @And("I log in")
    public void iLogIn() {
        if ($("[data-test=\"header-menu-mobile\"]").exists() && $("[data-test=\"header-menu-mobile\"]").is(visible)) {
            $("[data-test=\"header-menu-mobile\"]").click();
        }
        $$(byText("Inloggen")).first().click();
        $("#email").setValue("n.druif" + (char) 64 + "amsterdam.nl");
        $("#password").setValue("evertislief");
        $$(".c-form-buttons__button").filterBy(text("Inloggen")).get(0).click();
    }

    @And("I log out")
    public void iLogOut() {
        $("[data-test=login]").hover();
        $(byText("Uitloggen")).click();
    }

    @Then("I click on Help")
    public void iClickOnHelp() {
        $$("[href*=\"/artikelen/artikel/help/").get(0).click();
    }

}
