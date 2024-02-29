Tests in this directory will be run on all domains *without* running all the tests in the templates directory.

This allows testing specific template test(s), without running all the template tests.

In general, these should not get committed to the main branch.

The initial tag for test(s) in this directory must be "@templates", as if it were in the templates directory.