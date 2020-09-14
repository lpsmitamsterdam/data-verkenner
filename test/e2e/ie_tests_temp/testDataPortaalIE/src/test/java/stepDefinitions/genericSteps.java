package stepDefinitions;

import com.codeborne.selenide.Condition;
import com.codeborne.selenide.Selenide;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selectors.withText;
import static com.codeborne.selenide.Selenide.*;

public class genericSteps {

    @When("I click on button {string}")
    public void ClickOnButton(String buttonName) {
        $$("button").filterBy(Condition.text(buttonName)).get(0).click();
    }

    @Then("the header shows the text {string}")
    public void headerShowsTheText(String headerText) {
        $("[data-test=data-selection-heading]").shouldHave(Condition.text(headerText));
    }

    @Then("the text {string} should be visible")
    public void textShouldBeVisible(String text) {
        $(withText(text)).shouldBe(visible);
    }

    @And("I go back")
    public void iGoBack() {
        back();
    }

    @Given("I close the browser")
    public void closeTheBrowser() {
        Selenide.closeWebDriver();
    }

    @And("I click on {string}")
    public void iClick(String text) {
        $(byText(text)).click();
    }
}
