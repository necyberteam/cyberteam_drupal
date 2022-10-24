Tests in this directory get copied to other domains 
(as of October 2022, these are 'careers', 'gpc', 'ky', 'nect')

The tag must be @templates and on line 1 of the file.

Filename naming convention:

Behat test filenames start with the thing being tested, followed by a dash and any 
sub-feature (if there is one), followed by a dash and whether it's auth or unauth 
(if needed -- if not provided, we can assume it contains both auth & unauth tests) 

So, some examples:

headers-auth
headers-unauth
tags-individual
tags-unauth
tags-auth
tags-no-entries
