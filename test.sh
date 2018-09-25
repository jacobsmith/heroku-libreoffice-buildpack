# Requires ENV vars:
# BUILDPACK_UNDER_TEST
# BUILDPACK_TEST_RUNNER_HOME

source .env && docker run -it -v "$BUILDPACK_UNDER_TEST":/app/buildpack:ro -e BUILDPACK_TEST_RUNNER_HOME="$BUILDPACK_TEST_RUNNER_HOME" heroku/buildpack-testrunner
