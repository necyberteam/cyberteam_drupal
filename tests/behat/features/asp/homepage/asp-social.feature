@asp
@api
@javascript

Feature: verify the social links on the homepage

  Scenario:verify the social links on the homepage
    Given I am not logged in
    When I am on the homepage
    Then I should see an "a[href='https://twitter.com/ACCESSforCI']" element
    Then I should see an "a[href='https://www.youtube.com/c/ACCESSforCI']" element
    Then I should see an "a[href='https://www.facebook.com/ACCESSforCI']" element

  Scenario:verify the social links on the homepage
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    Then I should see an "a[href='https://twitter.com/ACCESSforCI']" element
    Then I should see an "a[href='https://www.youtube.com/c/ACCESSforCI']" element
    Then I should see an "a[href='https://www.facebook.com/ACCESSforCI']" element
