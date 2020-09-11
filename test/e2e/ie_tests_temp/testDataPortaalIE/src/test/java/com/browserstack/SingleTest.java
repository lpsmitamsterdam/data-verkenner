package com.browserstack;
import dataProviders.ConfigFileReader;
import org.openqa.selenium.By;
import org.testng.annotations.Test;
import reUsableMethods.ReUsableMethods;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.*;

public class SingleTest extends BrowserStackTest {

	@Test
	public void test() throws Exception {
		ReUsableMethods.setLUp();
		ConfigFileReader configFileReader = new ConfigFileReader();
		open(configFileReader.getHomepageUrl());
		$(byText("Data en informatie")).shouldBe(visible);
		$("#auto-suggest__input").setValue("Dam 10").pressEnter();
		$(By.xpath("//a[text()='Dam 10']")).click();
		$(".c-map").shouldBe(visible);
	}
}
