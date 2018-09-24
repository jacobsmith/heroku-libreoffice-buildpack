. ${BUILDPACK_TEST_RUNNER_HOME}/lib/test_utils.sh

testCompileInstallsLibreOfficeToCache() {
  compile
  assertCaptured "The installed version of LibreOffice is: LibreOffice 6.1.1.2 5d19a1bfa650b796764388cd8b33a5af1f5baa1b"
}
