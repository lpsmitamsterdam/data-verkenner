package stepDefinitions;

import com.codeborne.selenide.CollectionCondition;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;

import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;

public class searchDetails {
    @And("I check if all elements on the adress detail panel are visible")
    public void theAdressPanelIsOpen() {
        $(".qa-dashboard__column--right").shouldBe(visible);
        $("img.c-panorama-thumbnail--img").shouldBe(visible);
        $$(".o-header__subtitle").filterBy(text("Adres")).get(0).shouldBe(visible);
        $$(".o-header__subtitle").filterBy(text("Ligt in")).get(0).shouldBe(visible);
        $$(".o-header__subtitle").filterBy(text("Panoramabeeld")).get(0).shouldBe(visible);
        $$(".o-header__subtitle").filterBy(text("Verblijfsobject")).get(0).shouldBe(visible);
        $$(".o-header__subtitle").filterBy(text("Panden")).get(0).shouldBe(visible);
        $$(".o-header__subtitle").filterBy(text("Vestigingen")).get(0).shouldBe(visible);
        $$(".o-header__subtitle").filterBy(text("Kadastrale objecten")).get(0).shouldBe(visible);
        $$(".o-header__subtitle").filterBy(text("Monumenten")).get(0).shouldBe(visible);
    }

    @And("I check if the adress is {string} on the detail panel")
    public void iCheckAdress(String adress) {
        $("h2.o-header__title").shouldHave(text(adress));
    }

    @And("the message {string} is visible")
    public void iCheckIfMessageIsVisible(String message) {
        $(byText(message)).shouldBe(visible);
    }

    @Then("the small detail resultpanel is visible")
    public void theMapResultpanelIsVisible() {
        $(".map-detail-result").shouldBe(visible);
    }

    @And("I check all elements on the small resultpanel")
    public void iCheckAllElemetsOnResultpanel() {
        $$(".map-detail-result__item-label").filterBy(text("Gebruiksdoel")).get(0).shouldBe(visible);
        $$(".map-detail-result__item-value ").filterBy(text("winkelfunctie")).get(0).shouldBe(visible);
        $$(".map-detail-result__item-label").filterBy(text("Soort object (feitelijk gebruik)")).get(0).shouldBe(visible);
        $$(".map-detail-result__item-value ").filterBy(text("Winkel")).get(0).shouldBe(visible);
        $$(".map-detail-result__item-label").filterBy(text("Status")).get(0).shouldBe(visible);
        $$(".map-detail-result__item-value ").filterBy(text("Verblijfsobject in gebruik")).get(0).shouldBe(visible);
        $$(".map-detail-result__item-label").filterBy(text("Type adres")).get(0).shouldBe(visible);
        $$(".map-detail-result__item-value ").filterBy(text("Hoofdadres")).get(0).shouldBe(visible);
        $$(".map-detail-result__item-label").filterBy(text("Indicatie geconstateerd")).get(0).shouldBe(visible);
        $$(".map-detail-result__item-value ").filterBy(text("Nee")).get(0).shouldBe(visible);
        $$(".map-detail-result__item-label").filterBy(text("Aanduiding in onderzoek")).get(0).shouldBe(visible);
        $$(".map-detail-result__item-value ").filterBy(text("Nee")).get(1).shouldBe(visible);
        $$(".map-detail-result__item-label").filterBy(text("Oppervlakte")).get(0).shouldBe(visible);
        $$(".map-detail-result__item-value ").filterBy(text("23.820 m²")).get(0).shouldBe(visible);
    }

    @And("I open the panoramaviewer by clicking on the panorama picture")
    public void iOpenThePanoramaviewer() {
        $(".map-detail-result__header-pano-button").click();
        $("[class*=c-panorama__marzipano]").shouldBe(visible);
    }

    @And("I close the panoramaviewer")
    public void iCloseThePanoramaviewer() {
        $(".c-panorama > .icon-button__right > .rc-icon-button").click();
    }

    @And("I check if title is {string}")
    public void iCheckTitleSubtitle(String title) {
        $("[class*=o-header__title]").shouldHave(text(title));
    }

    @And("I open the vestigingen table")
    public void iOpenTheVestigingenTable() {
        $("[class*=qa-hr] [class-name*=o-btn]").click();
    }

    @Then("the table view is visible")
    public void theTableViewIsVisible() {
        $$(".qa-table-value").shouldHave(CollectionCondition.sizeGreaterThan(75)).get(0).shouldBe(visible);
    }

}
