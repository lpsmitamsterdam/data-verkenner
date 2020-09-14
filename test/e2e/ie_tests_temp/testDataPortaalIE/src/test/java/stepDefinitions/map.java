package stepDefinitions;

import com.codeborne.selenide.CollectionCondition;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;

public class map {

    @Then("the map is showing with a marker")
    public void theMapIsShowingTheResult() {
        $(".c-map").shouldBe(visible);
        $(".leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive").shouldBe(visible);
    }

    @And("I maximize the map")
    public void iMaximizeTheMap() {
        $(".rc-icon-button").click();
    }

    @And("the map is showing icon clusters")
    public void theMapIsShowingIconClusters() {
        $$(".o-highlight-cluster").shouldHave(CollectionCondition.sizeGreaterThan(2)).get(0).shouldBe(visible);
    }
}
