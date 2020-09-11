package stepDefinitions;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;

import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;

public class searchResults {
    @And("the filter {string} is active")
    public void filterIsActive(String filterName) {
        $(".c-data-selection-active-filters__listitem").shouldHave(text(filterName)).shouldBe(visible);
    }

    @Then("I click on the tab {string}")
    public void iClickOnTheTab(String tabName) {
        $$(".o-tabs__tab").filterBy(text(tabName)).get(0).click();
    }

    @And("the category {string} is visible in the search results")
    public void categoryIsVisibleInTheSearchResults(String category) {
        $$("[class*=SearchHeading__StyledHeading]").filterBy(text(category)).get(0).shouldBe(visible);
    }

    @And("I filter on category {string}")
    public void filterOnCategory(String category) {
        $$("[class*=FilterBox] ul li").filterBy(text(category)).get(0).click();
    }

    @And("I open the first dataset")
    public void openTheFirstDataset() {
        $$("[data-test=DatasetCard]").get(0).click();
    }

    @And("subtitle {string} is visible")
    public void subtitleIsVisible(String subtitle) {
        $$(".o-header__subtitle").filterBy(text(subtitle)).get(0).shouldBe(visible);
    }

    @And("I open the first publicatie")
    public void openTheFirstPublicatie() {
        $$("[href*=\"/publicaties/publicatie/\"]").get(0).click();
    }

    @And("I click on Tabel weegeven")
    public void iClickOnTabelWeegeven() {
        $("[title=\"Resultaten in tabel weergeven\"]").click();
    }
}
