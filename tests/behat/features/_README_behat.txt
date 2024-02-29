Many things to say about the behat feature tests.  

Here's one quick topic:  

Naming Conventions:

Feature filenames start with the thing being tested, followed by 
a dash and any sub-feature (if there is one), followed by a dash 
and whether it's auth or unauth (if needed -- if not provided, we 
can assume it contains both auth & unauth tests).

Tests can contain numbers to control the order in which they are run.

In general the filenames are all lower-case.

so, some examples:
    tags-unauth.feature
    tags-auth.feature
    tags-no-entries.feature
    tags-individual.feature
    headers-auth.feature
    headers-unauth.feature
    projects-part-1.feature
    projects-part-2.feature