Feature: Smoketest
  Description: Open the Homepage and search for adress

  Scenario: Search for an adress not logged in
    Given I open the homepage
    And I check the headertext 'Data en informatie'
    And I check if all the elements on the homepage are visible
    When I search for address 'Dam 1'
    Then the map is showing with a marker
    And I check if the adress is 'Dam 1' on the detail panel
    And I check if all elements on the adress detail panel are visible
    And the message 'Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om vestigingen te bekijken.' is visible
    And the message 'Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om meer gegevens te zien: zakelijke rechten en aantekeningen.' is visible
    And I maximize the map
    Then the small detail resultpanel is visible
    And I check all elements on the small resultpanel
    And I open the panoramaviewer by clicking on the panorama picture
    And I close the panoramaviewer
    And I click on 'Burgwallen-Oude Zijde (00)'
    And I check if title is 'Burgwallen-Oude Zijde'
    And I open the vestigingen table
    And the message 'Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om maatschappelijke activiteiten en vestigingen te bekijken.' is visible

  Scenario: Search for adress logged in
    Given I open the homepage
    And I log in
    When I search for address 'Dam 1'
    And I click on 'Burgwallen-Oude Zijde (00)'
    And I check if title is 'Burgwallen-Oude Zijde'
    And I open the vestigingen table
    Then the header shows the text 'Vestigingen'
    Then the table view is visible
    And I click on button 'Kaart weergeven'
    Then the map is showing with a marker
    And the map is showing icon clusters
    And the table view is visible
    And the filter 'Burgwallen-Oude Zijde' is active
    Then I click on the tab 'Kadastrale objecten'
    And I click on Tabel weegeven
    Then the header shows the text 'Kadastrale objecten met zakelijk rechthebbenden'
    And I log out
    Then the message 'Medewerkers met speciale bevoegdheden kunnen inloggen om kadastrale objecten met zakelijk rechthebbenden te bekijken.' is visible

  Scenario: Open dataset and publication
    Given I open the homepage
    When I search for 'Oost'
    Then the text "Alle zoekresultaten met 'Oost'" should be visible
    And the category 'Kaartlagen' is visible in the search results
    And the category 'Kaartcollecties' is visible in the search results
    And the category 'Data' is visible in the search results
    And the category 'Datasets' is visible in the search results
    And the category 'Publicaties' is visible in the search results
    And the category 'Artikelen' is visible in the search results
    And I filter on category 'Datasets'
    Then the text "Datasets met 'Oost'" should be visible
    And I open the first dataset
    And subtitle 'Dataset' is visible
    And subtitle 'Resources' is visible
    And subtitle 'Details' is visible
    And subtitle "Thema's" is visible
    And subtitle 'Tags' is visible
    And subtitle 'Licentie' is visible
    When I search for 'Oost'
    Then the text "Datasets met 'Oost'" should be visible
    And I filter on category 'Publicaties'
    Then the text "Publicaties met 'Oost'" should be visible
    And I open the first publicatie
    Then the text "Download PDF" should be visible
    Then I click on Help
    And I go back
    Then the text "Download PDF" should be visible
    And I go back
    Then the text "Publicaties met 'Oost'" should be visible
    And I go back
    Then the text "Datasets met 'Oost'" should be visible
    And I go back
    And subtitle 'Dataset' is visible
    And subtitle 'Resources' is visible
    And I go back
    Then the text "Datasets met 'Oost'" should be visible
    And I go back
    Then the text "Alle zoekresultaten met 'Oost'" should be visible
    And I go back
    And I check if all the elements on the homepage are visible

  Scenario: Close the browser
    Given I close the browser