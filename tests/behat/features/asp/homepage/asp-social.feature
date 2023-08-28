@asp
@api
@javascript

Feature: verify the social links on the homepage

  Scenario:verify the social links on the homepage
    Given I am not logged in
    When I am on the homepage
    Then I should see an "a[href='https://twitter.com/ACCESSforCI']" element
    # clicking giving bad responses - so relying on existence of element in prev step
    #When I click the "a[href='https://twitter.com/ACCESSforCI']" element
    #And I wait 2 seconds
    #Then print current URL
    #Then I should get a "200" HTTP response

    When I am on the homepage
    Then I should see an "a[href='https://www.youtube.com/c/ACCESSforCI']" element
    # clicking giving bad responses - so relying on existence of element in prev step
    #When I click the "a[href='https://www.youtube.com/c/ACCESSforCI']" element
    #And I wait 2 seconds
    #Then I should get a "200" HTTP response

    When I am on the homepage
    When I click the "a[href='https://www.facebook.com/ACCESSforCI']" element
    And I wait 2 seconds
    Then I should get a "200" HTTP response

  Scenario:verify the social links on the homepage
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    Then I should see an "a[href='https://twitter.com/ACCESSforCI']" element
    Then I should see an "a[href='https://www.youtube.com/c/ACCESSforCI']" element
    Then I should see an "a[href='https://www.facebook.com/ACCESSforCI']" element
